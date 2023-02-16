import { Grid, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Chatting from '../components/Chatting';
import Video from '../components/Video';
import ButtonGroup from '../components/ButtonGroup';
import { socket } from '../utils/socket';

export default function GamePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box sx={{ backgroundColor: '#2B1D23', p: 2 }}>
      <Box xs={12}>
        <ButtonGroup />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box mr={2}>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2}>
            <Video name="" />
          </Box>
        </Box>
        <Box>
          <Chatting />
        </Box>
        <Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2}>
            <Video name="" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
