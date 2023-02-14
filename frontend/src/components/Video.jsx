import React from "react";
import { Box, Checkbox, Typography } from "@mui/material";
// import VolumeDown from "@mui/icons-material/VolumeDown";
// import VolumeUp from "@mui/icons-material/VolumeUp";
import JobMemo from "./JobMemo";
import Vote from "./Vote";
// import Vote from "./Vote";
// import Target from "./Target";

export default function Video() {
  return (
    <Box p={1}>
      <Box>
        <Box
          sx={{ width: "200px", height: "200px", backgroundColor: "#E4D9C6" }}
        />
        <Box
          sx={{
            mt: 1,
            width: "200px",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            backgroundColor: "#D9D9D9",
          }}
        >
          <Typography variant="h7" component="div">
            닉네임
          </Typography>
          <Checkbox disabled sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
        </Box>
        <Box sx={{ width: "200px", backgroundColor: "#D9D9D9", mt: 1 }}>
          <JobMemo />
        </Box>
        <Box sx={{ width: "200px", backgroundColor: "#D9D9D9", mt: 1 }}>
          <Vote />
        </Box>
      </Box>
    </Box>
  );
}
