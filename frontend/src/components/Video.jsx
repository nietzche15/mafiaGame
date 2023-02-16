import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
// import VolumeDown from "@mui/icons-material/VolumeDown";
// import VolumeUp from "@mui/icons-material/VolumeUp";
import JobMemo from './JobMemo';
import Vote from './Vote';
// import Vote from "./Vote";
// import Target from "./Target";

export default function Video(props) {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#8B7F70',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        width: 465,
      }}
    >
      <Box>
        <Box
          sx={{
            mt: 1,
            width: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D9D9D9',
            borderRadius: '10px',
            mr: 2,
          }}
        >
          <Typography variant="h7" component="div">
            {props.name}
          </Typography>
          <Checkbox disabled sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
        </Box>
        <Box
          sx={{
            width: '200px',
            backgroundColor: '#D9D9D9',
            mt: 1,
            borderRadius: '10px',
          }}
        >
          <JobMemo />
        </Box>
        <Box
          sx={{
            width: '200px',
            backgroundColor: '#D9D9D9',
            mt: 1,
            borderRadius: '10px',
          }}
        >
          <JobMemo />
        </Box>
        <Box
          sx={{
            width: '200px',
            backgroundColor: '#D9D9D9',
            mt: 1,
            borderRadius: '10px',
          }}
        >
          <Vote />
        </Box>
      </Box>

      <Box
        sx={{
          width: '200px',
          height: '200px',
          backgroundColor: '#E4D9C6',
          borderRadius: '10px',
        }}
      >
        <img
          src="./images/mafiaImg.png"
          alt="mafiaImg"
          style={{ width: '200px', height: '200px' }}
        />
      </Box>
    </Box>
  );
}
