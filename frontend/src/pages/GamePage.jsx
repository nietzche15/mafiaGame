import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chatting from '../components/Chatting';
import Video from '../components/Video';
import ButtonGroup from '../components/ButtonGroup';
import { useSelector } from 'react-redux';
import { socket } from '../utils/socket';
import { useLocation } from 'react-router';

socket.on('connect', () => {
  console.log('User Connected', socket.id);
});
export default function GamePage() {
  const [isGame, setIsGame] = useState(false);
  const location = useLocation();
  const roomID = location.state;

  // const roomID = useSelector((state) => state.room.roomID);
  useEffect(() => {
    console.log('check roomID in GamePage: ', roomID);
    socket.emit('join room', roomID);
  }, []);

  socket.on('gameStart', () => {
    setIsGame(true);
    console.log('game started');
  });

  const [users, setUsers] = useState([]);

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
          <Chatting roomID={roomID} />
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
