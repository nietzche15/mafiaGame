import { Grid, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Chatting from '../components/Chatting';
import Video from '../components/Video';
import ButtonGroup from '../components/ButtonGroup';
import { socket } from '../utils/socket';

export default function GamePage() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('joinName', function (users) {
      console.log(users);
      setUsers((prev) => [...prev, users]);
    });
    socket.on('joinNotice', function (message) {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
    socket.emit('joinRoom', 'test');
  }, []);

  useEffect(() => {
    socket.connect();
    if (!socket.hasListeners('disconnect')) {
      socket.on('disconnect', function (message) {
        console.log(message);
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      socket.disconnect();
      if (socket.hasListeners('disconnect')) {
        socket.off('disconnect');
      }
    };
  }, []);
  return (
    <Box sx={{ backgroundColor: '#2B1D23', p: 2 }}>
      <Box xs={12}>
        <ButtonGroup />
      </Box>
      <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box mr={2}>
          <Box ml={2} mb={2}>
            {users.map((user, index) => (
              <Video name={user} key={index} />
            ))}
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
