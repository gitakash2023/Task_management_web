import React, { useState } from 'react';
import { Avatar, IconButton, Popover, Typography } from '@mui/material';

const Account = ({ initials, email }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <IconButton sx={{ color: '#3f51b5' }}>
        <Avatar sx={{ bgcolor: '#3f51b5' }}>
          {initials}
        </Avatar>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            marginTop: 8,
            padding: 0,
            borderRadius: 8,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Typography sx={{ p: 2, color: '#3f51b5' }}>
          {email}
        </Typography>
        <Typography
          sx={{
            p: 2,
            backgroundColor: '#3f51b5',
            color: 'white',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          onClick={() => alert('Logout clicked')}
        >
          Logout
        </Typography>
      </Popover>
    </div>
  );
};

export default Account;
