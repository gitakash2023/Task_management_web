import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, ListItemIcon, Snackbar, Alert } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import Logo from './header-components/Logo';

const Header = () => {
  // State to store user data
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const router = useRouter();

  // Fetch user details from localStorage on component mount
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    if (userDetails) {
      setUser(userDetails); // Set user data to state
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Client-side logout: clear localStorage and redirect to login
  const handleLogout = () => {
    // Clear user details from localStorage
    localStorage.removeItem('user');

    // Show success message
    setSnackbarMessage('Logout successful');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    // Redirect to login page after short delay
    setTimeout(() => {
      router.push('/auth/login');
    }, 1500);

    handleClose();
  };

  // Function to capitalize the first letter of the first name
  const capitalizeFirstName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#f5f5f5' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, textAlign: 'center', color: 'blue', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}
          id="home-button"
        >
          {user.first_name ? `Welcome, ${capitalizeFirstName(user.first_name)}` : 'Welcome'}
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem disabled>{user.email}</MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;
