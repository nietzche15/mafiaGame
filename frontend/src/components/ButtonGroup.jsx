import { Box, Button } from "@mui/material";
import React from "react";

export default function ButtonGroup() {
  return (
    <Box sx={{ p: 1, textAlign: "right" }}>
      <Button variant="contained" sx={{ m: 1, backgroundColor: "#940404" }}>
        게임 시작
      </Button>
      <Button variant="contained" sx={{ m: 1, backgroundColor: "#940404" }}>
        나가기
      </Button>
    </Box>
  );
}
