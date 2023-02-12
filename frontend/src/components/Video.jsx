import { Box, Checkbox, Slider, Stack, Typography } from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import JobMemo from "./JobMemo";
import Vote from "./Vote";
import Target from "./Target";

export default function Video() {
  return (
    <Box sx={{ width: "200px", p: 1 }}>
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Box sx={{ width: "150px", height: "150px", backgroundColor: "red" }}>
          <Box></Box>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <VolumeDown />
          <Slider sx={{ width: "50px", mr: 1, ml: 1 }} />
          <VolumeUp />
        </Box> */}
        <Box
          sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}
        >
          <Typography variant="h7" component="div">
            닉네임
          </Typography>
          <Checkbox />
        </Box>
        <Box sx={{ width: "200px" }}>
          <JobMemo />
          <JobMemo />
        </Box>
      </Box>
    </Box>
  );
}
