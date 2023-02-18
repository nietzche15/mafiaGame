import { Box, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../utils/socket';

export default function ButtonGroup() {
  const [isCaptain, setIsCaptain] = useState(false);
  const startBtn = useRef();
  const userList = useSelector((state) => state.room.userList);

  socket.on('readyComplete', () => {
    gameBtn.current.disabled = false;
  });

  useEffect(() => {
    userList.indexOf(socket.id) === 0
      ? setIsCaptain(true)
      : setIsCaptain(false);
  }, []);

  const gameStart = () => {
    console.log('isCaptain ?', isCaptain, socket.id);
    socket.emit('gameStart', {
      from_id: socket.id,
    });
  };

  const gameReady = () => {
    socket.emit('gameReady', {
      from_id: socket.id,
    });
  };

  return (
    <Box sx={{ p: 1, textAlign: 'right' }}>
      {isCaptain ? (
        <Button
          ref={startBtn}
          variant="contained"
          sx={{ m: 1, backgroundColor: '#940404' }}
          onClick={gameStart}
          disabled
        >
          'Game START'
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ m: 1, backgroundColor: '#940404' }}
          onClick={gameReady}
        >
          'READY'
        </Button>
      )}
      <Button
        variant="contained"
        sx={{ m: 1, backgroundColor: '#940404' }}
        onClick={() => {
          location.href = '/lobby';
          // navigate('/lobby', { replace: true });
        }}
      >
        나가기
      </Button>
    </Box>
  );
}
