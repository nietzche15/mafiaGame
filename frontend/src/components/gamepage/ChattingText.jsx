import { Box, Button, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';
import GlobalStyle from '../common/GlobalStyle';

export default function ChattingText() {
  const { timeStatus, myStatus } = useSelector((state) => state.status);
  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('chat input: ', value);
    socket.emit('sendChat', {
      from_id: socket.id,
      msg: value,
    });
  };

  if (timeStatus === 'night') return null;

  if (myStatus === 'dead') return null;

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '800px',
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        value={value}
        id="outlined-basic"
        label=""
        variant="outlined"
        sx={{ width: '100%', fontFamily: 'MaplestoryOTFBold', p: 2 }}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          height: '100%',
          alignItems: 'center',
          fontFamily: 'MaplestoryOTFBold',
          position: 'absolute',
          right: 0,
        }}
      >
        전송
      </Button>
    </Box>
  );
}
