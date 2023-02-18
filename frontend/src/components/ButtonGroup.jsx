import { Box, Button } from '@mui/material';
import React from 'react';
import { socket } from '../utils/socket';
export default function ButtonGroup() {
  const gameStart = () => {
    console.log('captain id:', socket.id);
    socket.emit('gameStart', {
      from_id: socket.id,
    });
  };
  return (
    <Box sx={{ p: 1, textAlign: 'right' }}>
      <Button
        variant="contained"
        sx={{ m: 1, backgroundColor: '#940404' }}
        onClick={gameStart}
      >
        게임 시작
      </Button>
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
