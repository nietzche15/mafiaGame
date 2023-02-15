import { Box, Typography } from "@mui/material";
import React from "react";

export default function My() {
  return (
    <>
      {/* 상대 채팅 */}
      <Box
        sx={{
          width: "50%",
          p: 3,
        }}
      >
        <Box
          sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}
        >
          <Typography variant="p" component="div">
            닉네임
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#E4D9C6",
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

      {/* 내 채팅 */}
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
          <Typography variant="p" component="div">
            닉네임
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#E4D9C6",
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
    </>
  );
}
