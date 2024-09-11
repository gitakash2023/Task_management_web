"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Container,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { _createlogin } from "../utils/apiUtils";
import Logo from "./header-components/Logo";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [alertMessage, setAlertMessage] = useState(null); // For success and error messages
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage(null); // Clear any previous alerts
  
    try {
      const response = await _createlogin("/api/auth/login", formData);

      
  
      // Extract the values from the response
      const { token, _id, first_name, last_name, email } = response;
  
      if (typeof window !== "undefined") {
        // Save token in localStorage
        localStorage.setItem("token", token);
  
        // Save user details in localStorage as a JSON string
        localStorage.setItem(
          "user",
          JSON.stringify({ _id, first_name, last_name, email })
        );
      }
  
      // Clear any existing errors and show success message
      setErrors({});
      setAlertMessage({ type: "success", message: "Login successful!" });
  
      // Redirect to admin dashboard after 2 seconds
      setTimeout(() => router.push("/admin/admin-dashboard"), 2000);
    } catch (error) {
      // Handle error and show message
      const errMsg = error.response?.data?.errors || { general: "An error occurred. Please try again." };
      setErrors(errMsg);
      setAlertMessage({ type: "error", message: "Login failed! Check your credentials and try again." });
    } finally {
      setLoading(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Logo sx={{ mb: 4 }} />
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Login
        </Typography>

        {/* Alert for success/error messages */}
        {alertMessage && (
          <Alert severity={alertMessage.type} sx={{ mb: 2 }}>
            {alertMessage.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: <FaUser style={{ marginRight: 8 }} />,
            }}
            sx={{
              backgroundColor: "#f0f2f5",
              fontSize: "0.9rem",
              mb: 2,
            }}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: <FaLock style={{ marginRight: 8 }} />,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#f0f2f5",
              fontSize: "0.9rem",
              mb: 2,
            }}
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* Forgot Password Link */}
          <Typography variant="body2" align="right">
            <Link href="/auth/forgot-password">
              <span style={{ color: "#1976d2", cursor: "pointer" }}>
                Forgot Password?
              </span>
            </Link>
          </Typography>

          {loading ? (
            <CircularProgress size={24} sx={{ marginTop: 2 }} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontSize: "0.9rem", marginTop: 2 }}
            >
              Login
            </Button>
          )}
        </form>

        {errors.general && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errors.general}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          <span>Not a user? </span>
          <Link href="/auth/signup">
            <span style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign up here
            </span>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
