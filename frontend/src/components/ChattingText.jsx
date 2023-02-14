import { Box, Button, TextField } from "@mui/material";
import React from "react";

export default function ChattingText() {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        width: "800px",
      }}
    >
      <TextField
        sx={{ width: "800px" }}
        id="outlined-basic"
        label=""
        variant="outlined"
      />
      <Button variant="contained" sx={{ backgroundColor: "#940404" }}>
        전송
      </Button>
    </Box>
  );
}
