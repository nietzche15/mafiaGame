import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Target() {
  const [job, setJob] = React.useState("");

  const handleChange = (event) => {
    setJob(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">타겟</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={job}
          onChange={handleChange}
        >
          <MenuItem value={10}>닉네임</MenuItem>
          <MenuItem value={20}>닉네임</MenuItem>
          <MenuItem value={30}>닉네임</MenuItem>
          <MenuItem value={40}>닉네임</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
