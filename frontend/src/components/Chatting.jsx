import { Box } from "@mui/material";
import React from "react";
import MyChatting from "./MyChatting";
import ChattingText from "./ChattingText";
import SystemCahtting from "./SystemCahtting";
import Timer from "./Timer";

export default function Chatting() {
  return (
    <Box
      sx={{
        width: "800px",
        height: "100vh",
        backgroundColor: "#8B7F70",
      }}
    >
      <Box>
        <Box
          sx={{
            p: 1,
          }}
        >
          <Timer />
        </Box>
        <Box>
          <SystemCahtting />
        </Box>

        <MyChatting />
        <Box sx={{ position: "absolute", bottom: -69 }}>
          <ChattingText />
        </Box>
      </Box>
    </Box>
  );
}
