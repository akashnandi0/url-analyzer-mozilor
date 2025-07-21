import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import { analyzeUrl, summaryAnalyzer } from "../../services/urlAnalysisService";
import { getUserId } from "../../utils/storage";
import type { Summary } from "../../type";

const Home: react.FC = () => {
  const [urls, setUrls] = useState("");
  const [tableData, setTableData] = useState<Array<Summary>>([]);
  const [page, setPage] = useState(1);
  const [isDisabled, setisDisabled] = useState(false);
  const [disableAnalysis, setdisableAnalysis] = useState(false);
  const user_id = getUserId();
  const navigate = useNavigate();
  const handlePagination = async () => {
    try {
      const nextPage = page + 1;
      console.log("nextPage", nextPage);
      const response = await summaryAnalyzer({
        user_id,
        page: nextPage,
        size: 10,
      });
      if (response.status === 200) {
        setPage(nextPage);
        const newPageData = [...tableData, ...response.data.data.data];
        setTableData(newPageData);
        if (response.data.data.total_count <= newPageData.length) {
          setisDisabled(true);
        } else {
          setisDisabled(false);
        }
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };
  const handleSubmit = async (e: react.FormEvent) => {
    e.preventDefault();
    setdisableAnalysis(true);
    if (!urls) {
      alert("Please enter a URL");
      setdisableAnalysis(false);
      return;
    }
    try {
      const res = await analyzeUrl({ url: urls, user_id: user_id });
      if (res.status === 200) {
        const updatedData = [res.data.data, ...tableData];
        setTableData(updatedData);
        setPage(1);
        setdisableAnalysis(false);
      } else {
        console.error("Error analyzing URL:", res);
        alert("Failed to analyze URL. Please try again.");
        setdisableAnalysis(false);
      }
    } catch (error) {
      alert("Failed to analyze URL. Please try again.");
      console.error("Error analyzing URL:", error);
      setdisableAnalysis(false);
      return;
    }
    // Clear the input field after submission
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("useefecct", page);
        const response = await summaryAnalyzer({ user_id, page, size: 10 });
        if (response.status === 200) {
          console.log(response.data.data.data);
          setTableData(response.data.data.data);
          if (response.data.data.total_count <= page * 10) {
          setisDisabled(true);
        } else {
          setisDisabled(false);
        }
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <Container>
        <Box component="form" sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Enter URL"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            sx={{
              borderColor: "#2e2e2e",
              borderRadius: "15px",
              borderWidth: "2px",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1 }}
            onClick={handleSubmit}
            disabled={disableAnalysis}
          >
            Analyze
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Analyzed URLs
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell>Word Frequencies</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.url}</TableCell>
                  <TableCell>
                    {Object.entries(row.word_frequencies)
                      .map(([word, freq]) => `${word}: ${freq}`)
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    {new Date(row.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/summary/${row.id}`)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            onClick={handlePagination}
            sx={{
              fontWeight: "bold",
              width: "200px",
              height: "50px",
              backgroundColor: "##d4d6d9",
            }}
            disabled={isDisabled}
          >
            Load More
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};
export default Home;
