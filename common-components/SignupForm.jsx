"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { TextField, Button, Typography, CircularProgress, Box, Container, IconButton, InputAdornment, Alert } from '@mui/material';
import { FaUser, FaLock } from 'react-icons/fa';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import { useFormik } from 'formik'; 
import { _create } from '../utils/apiUtils'; 
import Logo from './header-components/Logo'; 
import Link from 'next/link';

const SignupForm = () => {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState(''); 

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.first_name) {
        errors.first_name = 'First Name is required';
      }
      if (!values.last_name) {
        errors.last_name = 'Last Name is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setSuccessMessage('');
      setGeneralError(''); 

      try {
        await _create('/api/auth/register', values);
        setSuccessMessage('Registration successful! ');
        setTimeout(() => {
          router.push('/auth/login'); 
        }, 2000);
      } catch (error) {
        setGeneralError(error?.response?.data?.message || 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Logo sx={{ mb: 4 }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Register
        </Typography>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* General Error Message */}
        {generalError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {generalError}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="first_name"
            name="first_name"
            label="First Name"
            variant="outlined"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
            InputProps={{
              startAdornment: <FaUser style={{ marginRight: 8 }} />,
            }}
            sx={{
              backgroundColor: '#f0f2f5',
              fontSize: '0.9rem',
              mb: 2,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="last_name"
            name="last_name"
            label="Last Name"
            variant="outlined"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
            InputProps={{
              startAdornment: <FaUser style={{ marginRight: 8 }} />,
            }}
            sx={{
              backgroundColor: '#f0f2f5',
              fontSize: '0.9rem',
              mb: 2,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: <FaUser style={{ marginRight: 8 }} />,
            }}
            sx={{
              backgroundColor: '#f0f2f5',
              fontSize: '0.9rem',
              mb: 2,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
              backgroundColor: '#f0f2f5',
              fontSize: '0.9rem',
              mb: 2,
            }}
          />
          {loading ? (
            <CircularProgress size={24} sx={{ marginTop: 2 }} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontSize: '0.9rem', marginTop: 2 }}
            >
              Register
            </Button>
          )}
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <span>Already a user? </span>
          <Link href="/auth/login">
            <span style={{ textDecoration: 'none', color: '#1976d2' }}>Login here</span>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupForm;
