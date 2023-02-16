import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import MyChatting from './MyChatting';
import ChattingText from './ChattingText';
import SystemCahtting from './SystemCahtting';
import Timer from './Timer';
import { socket } from '../utils/socket';
import { useState } from 'react';
import NotMyChatting from './NotMyChatting';

export default function Chatting() {
  const [change, setChange] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    if (!socket.hasListeners('joinNotice')) {
      socket.on('joinNotice', function (message) {
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      if (socket.hasListeners('joinNotice')) {
        socket.off('joinNotice');
      }
      socket.disconnect();
    };
  }, []);

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
        {messages.map((msg, index) => (
          <SystemCahtting change={change} key={index}>
            {msg}
          </SystemCahtting>
        ))}
        {/* <SystemCahtting change={change} />a  */}
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
