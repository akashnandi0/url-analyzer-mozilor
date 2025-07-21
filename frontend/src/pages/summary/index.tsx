import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Button } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import Layout from "../../components/Layout";
import type { WordFrequency } from "../../type";
import { getSummary } from "../../services/urlAnalysisService";
import { getUserId } from "../../utils/storage";

const Summary: react.FC = () => {
  const [words, setWords] = useState<WordFrequency[]>([]);
  const user_id = getUserId();
  const { id } = useParams<{ id: string }>();
  const [url, setUrls] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSummary(id ? parseInt(id) : 0, user_id);
        if (res.status === 200) {
          setUrls(res.data.data.url);
          const data: object = res.data.data.word_frequencies;
          const chartData = Object.entries(data).map(([word, count]) => ({
            id: word,
            value: count,
            label: word,
          }));
          setWords(chartData);
          console.log("Words:", Object.keys(data));
          console.log("Counts:", Object.values(data));
        } else {
          console.error("Error analyzing URL:", res);
        }
      } catch (error) {
        console.error("Error analyzing URL:", error);
        return;
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <Container>
        <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
          <h1>URL Summary</h1>
        </Box>
        <Box sx={{ mb: 2, color: "green" }}>
          <p>
            <strong>URL:</strong> {url}
          </p>
        </Box>
        <Box sx={{ mt: 2 }}>
          {words && (
            <>
              <PieChart
                series={[
                  {
                    data: words,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 2,
                  },
                ]}
                width={400}
                height={300}
              />
            </>
          )}
        </Box>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            onClick={() => navigate("/")}
            sx={{
              fontWeight: "bold",
              width: "200px",
              height: "50px",
              backgroundColor: "##d4d6d9",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};
export default Summary;
