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
      <Box>
        <Box>
          <Timer />
        </Box>
        <Box>
          <SystemCahtting />
        </Box>

        <MyChatting />
        <Box>
          <ChattingText />
        </Box>
      </Box>
    </Box>
  );
}
