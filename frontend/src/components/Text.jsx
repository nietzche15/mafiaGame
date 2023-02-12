import { Box, Button, TextField } from "@mui/material";
import React from "react";

export default function Text() {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        width: "800px",
        bottom: 0,
      }}
    >
      <TextField
        sx={{ width: "100%" }}
        id="outlined-basic"
        label=""
        variant="outlined"
      />
      <Button variant="contained">전송</Button>
    </Box>
  );
}
