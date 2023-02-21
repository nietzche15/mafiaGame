import { Box, Button, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';
import GlobalStyle from '../common/GlobalStyle';

export default function ChattingText() {
  // const roomID = useSelector((state) => state.room.roomID);
  const chatInput = useRef();
  // const [value, setValue] = useState('');
  // const handleChange = (event) => setValue(event.target.value);
  const handleSubmit = () => {
    console.log('chat input: ', chatInput.current.value);
    socket.emit('sendChat', {
      from_id: socket.id,
      msg: chatInput.current.value,
    });
  };
  const enterSubmit = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '800px',
      }}
    >
      <TextField
        // value={value}
        id="outlined-basic"
        label=""
        inputRef={chatInput}
        variant="outlined"
        sx={{ width: '100%', fontFamily: 'MaplestoryOTFBold', p: 2 }}
        // onChange={handleChange}
        onKeyDown={enterSubmit}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{
          height: '100%',
          alignItems: 'center',
          fontFamily: 'MaplestoryOTFBold',
          position: 'absolute',
          right: 0,
        }}
        onClick={handleSubmit}
      >
        전송
      </Button>
    </Box>
  );
}
