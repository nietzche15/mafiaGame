import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { socket } from '../utils/socket';

export default function ChattingText() {
  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);
  const handleSubmit = () => {
    socket.emit('join', value);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '900px',
      }}
    >
      <TextField
        value={value}
        id="outlined-basic"
        label=""
        variant="outlined"
        sx={{ width: '100%' }}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: '#940404' }}
        onClick={handleSubmit}
      >
        전송
      </Button>
    </Box>
  );
}
