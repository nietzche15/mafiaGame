import { Box } from '@mui/material';
import React from 'react';
import MyChatting from './MyChatting';
import ChattingText from './ChattingText';
import SystemCahtting from './SystemCahtting';
import Timer from './Timer';
import { io } from 'socket.io-client';
import { useState } from 'react';
import NotMyChatting from './NotMyChatting';

export default function Chatting(props) {
  const [change, setChange] = useState(false);
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
        <Timer setChange={setChange} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SystemCahtting change={change}> {props.time} </SystemCahtting>
      </Box>
      <Box>
        <NotMyChatting />
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
