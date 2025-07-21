import react, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { loginUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUserId } from "../../utils/storage";

const Login: react.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.status == 200) {
        setToken(response.data.data.access_token);
        setUserId(response.data.data.access_token);
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 5,
          borderRadius: 4,
          minWidth: 350,
          maxWidth: 400,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          background: "rgba(255,255,255,0.85)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#5c9950",
              letterSpacing: "2px",
              mb: 1,
              textShadow: "0 2px 4px rgba(92,153,80,0.2)",
            }}
          >
            Login
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#888", mb: 2 }}>
            Welcome back! Please login to your account.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              borderRadius: "15px",
              background: "#f7fafc",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              borderRadius: "15px",
              background: "#f7fafc",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(90deg, #5c9950 60%, #8fd19e 100%)",
              color: "#fff",
              borderRadius: "15px",
              boxShadow: "0 2px 8px rgba(92,153,80,0.15)",
              py: 1.5,
              fontSize: "1.1rem",
              transition: "background 0.3s",
              "&:hover": {
                background: "linear-gradient(90deg, #4b7c3a 60%, #7bbf8b 100%)",
              },
            }}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "18px", color: "#555" }}
        >
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#5c9950",
              fontWeight: "bold",
            }}
          >
            Don't have an account? Register here.
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};
export default Login;
