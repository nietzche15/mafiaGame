import { Box, Button } from "@mui/material";
import React from "react";

export default function ButtonG() {
  return (
    <Box sx={{ p: 1 }}>
      <Button variant="contained" sx={{ m: 1 }}>
        나가기
      </Button>
      <Button variant="contained" sx={{ m: 1 }}>
        게임 시작
      </Button>
    </Box>
  );
}
