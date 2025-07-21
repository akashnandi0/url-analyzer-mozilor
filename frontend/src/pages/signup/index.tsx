import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import { registerUser } from "../../services/authService";
const Signup: react.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleSubmit = async (e: react.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 8 || password.length > 15) {
      setError("Password must be between 8 and 15 characters long");
      return;
    }
    setError("");
    try {
      const result = await registerUser({ email, password });
      console.log("Registration response:", result);
      if (result.status == 201) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        navigate("/login");
      } else {
        setError(`"Registration failed. Please try again"`);
      }
    } catch (err) {
      console.log("Registration error:", err);
      setError(
        "Registration failed. Please use different mail or Please try again.: ",
      );
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
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ fontWeight: "bold" }}
        >
          Register
        </Button>
      </form>
      <Typography
        variant="body2"
        sx={{ textAlign: "center", marginTop: "10px" }}
      >
        <Link to="/login" style={{ textDecoration: "none" }}>
          Already have an account? Login here.
        </Link>
      </Typography>
    </Container>
  );
};
export default Signup;
