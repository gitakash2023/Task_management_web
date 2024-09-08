import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, ListItemIcon, Snackbar, Alert } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import Logo from './header-components/Logo';
import { _create } from "../utils/apiUtils";

const Header = () => {
  const [userEmail] = useState('mediatechtemple@gmail.com');
  const userInitial = userEmail.substring(0, 1);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await _create('/users/logout', {});

      if (response) {
        setSnackbarMessage('Logout successful');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        router.push('/auth/login');
      } else {
        setSnackbarMessage('Logout failed');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred during logout');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('An error occurred:', error);
    }
    handleClose();
  };

  useEffect(() => {
    const handleHomeClick = () => {
      if (typeof window !== 'undefined') {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const userRole = userDetails?.user_role;

        switch (userRole) {
          case 1:
            router.push("/admin/admin-dashboard");
            break;
          case 2:
            router.push("/client/client-dashboard");
            break;
          case 3:
            router.push("/admin/candidates/add-candidates");
            break;
          case 4:
            router.push("/geninfo/dashboard");
            break;
          case 5:
            router.push("/educationinfo/dashboard");
            break;
          case 6:
            router.push("/addressinfo/dashboard");
            break;
          case 7:
            router.push("/cibilinfo/dashboard");
            break;
          case 8:
            router.push("/referenceinfo/dashboard");
            break;
          case 9:
            router.push("/experienceinfo/dashboard");
            break;
          default:
            setSnackbarMessage('Invalid user role.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
      }
    };

    const homeButton = document.getElementById('home-button');
    if (homeButton) {
      homeButton.addEventListener('click', handleHomeClick);
    }

    return () => {
      if (homeButton) {
        homeButton.removeEventListener('click', handleHomeClick);
      }
    };
  }, [router]);

  return (
    <AppBar position="static" style={{ backgroundColor: '#f5f5f5' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, textAlign: 'center', color: 'blue', fontSize: '1rem', cursor: 'pointer' }}
          id="home-button" // Add id for home button
        >
          Home
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
            <MenuItem disabled>{userEmail}</MenuItem>
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
