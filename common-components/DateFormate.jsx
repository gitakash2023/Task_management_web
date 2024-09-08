import React from "react";
import { TextField } from "@mui/material";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DateFormate = ({ label, name, value, onChange }) => {
  const handleChange = (e) => {
    onChange({
      target: {
        name,
        value: e.target.value,
      },
    });
  };

  return (
    <TextField
      type="date"
      name={name}
      value={formatDate(value)}
      onChange={handleChange}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default DateFormate;
