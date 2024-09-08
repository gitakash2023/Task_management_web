import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchComponent = ({ searchQuery, onSearch }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      value={searchQuery}
      onChange={onSearch}
      sx={{
        marginBottom: '16px',
        width: '300px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          borderColor: '#ccc',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          '&:hover': {
            borderColor: '#aaa',
          },
          '&.Mui-focused': {
            borderColor: '#3f51b5',
            boxShadow: '0 0 0 2px rgba(63, 81, 181, 0.2)',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#3f51b5',
        },
        '& .MuiOutlinedInput-input': {
          padding: '10px 14px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: '2px',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchComponent;
