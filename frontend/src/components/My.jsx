import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import React from "react";

export default function My() {
  return (
    <Box
      sx={{
        float: "right",
        width: "50%",
        p: 3,
      }}
    >
      <Box
        sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}
      >
        <AccountCircleIcon fontSize="large" />
        <Typography variant="p" component="div">
          ME
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#b88888",
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
