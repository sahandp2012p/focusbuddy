// src/pages/Signup.tsx
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Helper to decode JWT payload
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded?.username) {
        setLoggedInUser(decoded.username);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setSuccess(true);

      // Decode username and store it
      const decoded = parseJwt(data.token);
      if (decoded?.username) {
        setLoggedInUser(decoded.username);
      }

      // Redirect after short delay
      setTimeout(() => {
        navigate("/tasks");
      }, 1000);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" fontWeight={600}>
          Signup for FocusBuddy
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">🎉 Account created!</Alert>}

        {loggedInUser ? (
          <>
            <Alert severity="info">
              Already logged in as <strong>{loggedInUser}</strong>
            </Alert>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Username"
              type="text"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
