import { Box, Button, TextField } from "@mui/material";
import React from "react";
import My from "./My";
import People from "./People";
import Text from "./Text";

export default function Chatting() {
  return (
    <Box sx={{ width: "800px", height: "80vh", backgroundColor: "blue" }}>
      <People />
      <My />
      <Text />
    </Box>
  );
}
