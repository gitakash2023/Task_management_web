import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import PdfIcon from '@mui/icons-material/PictureAsPdf'; // Icon for PDF
import ClearIcon from '@mui/icons-material/Clear'; // Icon for clearing the input

// Styled component using MUI's styled utility
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: '#00bcd4', // Focused label color
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#00bcd4', // Focused underline color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#bdbdbd', // Default border color
    },
    '&:hover fieldset': {
      borderColor: '#00bcd4', // Hover border color
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00bcd4', // Focused border color
    },
  },
  '& .MuiInputBase-input': {
    color: '#424242', // Input text color
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px 14px', // Adjust padding
  },
  '& .MuiInputLabel-root': {
    color: '#757575', // Label color
  },
}));

const FileInput = styled('input')({
  display: 'none',
});

const CustomInputField = ({ label, variant, type, placeholder, icon, onChange, value, onClear, ...props }) => {
  const renderInputAdornment = () => {
    if (icon) {
      return (
        <InputAdornment position="start">
          {icon}
        </InputAdornment>
      );
    }
    return null;
  };

  const renderEndAdornment = () => {
    if (type !== 'file' && value) {
      return (
        <InputAdornment position="end">
          <IconButton onClick={onClear} edge="end">
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      );
    }
    return null;
  };

  if (type === 'file') {
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="file-upload">{label}</InputLabel>
        <IconButton component="label">
          {props.accept.includes('image') ? <ImageIcon /> : <PdfIcon />}
          <FileInput
            id="file-upload"
            type="file"
            accept={props.accept || '*/*'}
            onChange={onChange}
          />
        </IconButton>
      </FormControl>
    );
  }

  return (
    <CustomTextField
      label={label}
      variant={variant || 'outlined'}
      type={type || 'text'}
      placeholder={placeholder}
      fullWidth
      InputProps={{
        startAdornment: renderInputAdornment(),
        endAdornment: renderEndAdornment(),
      }}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomInputField;
