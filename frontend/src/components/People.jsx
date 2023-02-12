import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import React from "react";

export default function People() {
  return (
    <Box
      sx={{
        width: "50%",
        p: 3,
      }}
    >
      <Box
        sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}
      >
        <AccountCircleIcon fontSize="large" />
        <Typography variant="p" component="div">
          you
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#a76b6b",
          height: "50px",
          borderRadius: "10px 10px 10px 10px",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="p" component="div">
          ㅎㅇ
        </Typography>
      </Box>
    </Box>
  );
}
