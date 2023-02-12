import { Box, Button } from "@mui/material";
import React from "react";
import Chatting from "../components/Chatting";
import Test from "../components/Test";
import Video from "../components/Video";
import ButtonG from "../components/ButtonG";

export default function GamePage() {
  return (
    <Box>
      <ButtonG />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Test />
        <Test />
        <Chatting />
        <Test />
        <Test />
      </Box>
    </Box>
  );
}
