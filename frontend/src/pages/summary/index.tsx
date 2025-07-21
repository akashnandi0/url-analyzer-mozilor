import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Button, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
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
        <Box
          sx={{
            mb: 2,
            px: 3,
            py: 2,
            borderRadius: "14px",
            background:
              "linear-gradient(90deg,rgb(248, 248, 248) 0%,rgb(220, 250, 230) 60%,rgb(205, 250, 220) 100%)",
            boxShadow: "0 4px 16px 0 rgba(92,153,80,0.18)",
            color: "#234d20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.18rem",
            fontWeight: "600",
            letterSpacing: "1px",
            border: "2px solid #5c9950",
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0 8px 32px 0 rgba(92,153,80,0.28)",
              background:
                "linear-gradient(90deg,rgb(210, 252, 201) 100%,rgb(255, 255, 255) 60%,rgb(248, 248, 248) 0%)",
            },
          }}
        >
          <span
            style={{
              color: "#5c9950",
              fontWeight: "bold",
              marginRight: "10px",
              fontSize: "1.2rem",
              letterSpacing: "2px",
              textShadow: "0 2px 8px rgba(92,153,80,0.12)",
            }}
          >
            URL:
          </span>
          <span style={{ wordBreak: "break-all", color: "#234d20" }}>
            {url}
          </span>
        </Box>
        <Box
          sx={{
            m: 2,
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {words && (
            <>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg,rgb(255, 255, 255) 0%, #b7e4c7 100%)",
                  boxShadow: "0 2px 8px rgba(92,153,80,0.10)",
                  minWidth: 420,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    color: "#5c9950",
                    letterSpacing: "1px",
                  }}
                >
                  Word Frequency Pie Chart
                </Typography>
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
              </Box>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg,rgb(250, 250, 250) 0%, #b7e4c7 100%)",
                  boxShadow: "0 2px 8px rgba(92,153,80,0.10)",
                  minWidth: 420,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    color: "#5c9950",
                    letterSpacing: "1px",
                  }}
                >
                  Word Frequency Bar Graph
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      data: words.map((w) => w.label),
                      label: "Word",
                    },
                  ]}
                  series={[
                    {
                      data: words.map((w) => w.value),
                      label: "Frequency",
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </Box>
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
              backgroundColor: "#5c9950",
              color: "white",
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
