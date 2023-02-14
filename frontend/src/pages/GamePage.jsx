import { Grid, Box } from '@mui/material';
import React, { useState } from 'react';
import Chatting from '../components/Chatting';
import Video from '../components/Video';
import ButtonGroup from '../components/ButtonGroup';

export default function GamePage() {
  const [users, setUsers] = useState([]);
  return (
    <Box sx={{ backgroundColor: '#2B1D23', p: 2 }}>
      <Box item xs={12}>
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
