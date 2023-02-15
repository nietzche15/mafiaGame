import { Box } from '@mui/material';
import React from 'react';
import MyChatting from './MyChatting';
import ChattingText from './ChattingText';
import SystemCahtting from './SystemCahtting';
import Timer from './Timer';

export default function Chatting() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '900px',
        backgroundColor: '#8B7F70',
        borderRadius: '10px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Timer />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SystemCahtting />
      </Box>
      <Box>
        <MyChatting />
      </Box>
      <Box sx={{ mt: 89 }}>
        <ChattingText />
      </Box>
    </Box>
  );
}
