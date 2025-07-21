import react, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { loginUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUserId } from "../../utils/storage";

const Login: react.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log("Login response:", response);
      if (response.status == 200) {
        setToken(response.data.data.access_token);
        setUserId(response.data.data.access_token);
        console.log("Login successful");
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}
      >
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2, borderRadius: "15px" }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, borderRadius: "15px" }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ fontWeight: "bold" }}
        >
          Login
        </Button>
      </form>
      <Typography
        variant="body2"
        sx={{ textAlign: "center", marginTop: "10px" }}
      >
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Don't have an account? Register here.
        </Link>
      </Typography>
    </Container>
  );
};
export default Login;
