import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../utils/socket';
let userList;

export default function DMText(props) {
  userList = props.userList;
  const roomID = useSelector((state) => state.room.roomID);
  const DMInput = useRef();
  const selectDM = useRef();

  socket.on('getUserList', (data) => {
    console.log('getUserList: ', userList);
    userList = data.userList;
  });

  const showUserList = () => {
    console.log('userList in dm: ', userList);
    return userList
      .filter((e) => e !== socket.id)
      .map((el, idx) => (
        <MenuItem key={idx} value={el}>
          {el}
        </MenuItem>
      ));
  };

  const handleSubmit = () => {
    // socket.emit('join', value);
    console.log('selectDM:', selectDM.current.value);
    socket.emit('sendDM', {
      roomID: roomID,
      from_id: socket.id,
      to_id: selectDM.current.value,
      msg: DMInput.current.value,
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
        width: '900px',
      }}
    >
      <Select label="DM" inputRef={selectDM}>
        {showUserList()}
      </Select>
      <TextField
        // value={value}
        id="outlined-basic"
        label=""
        inputRef={DMInput}
        variant="outlined"
        sx={{ width: '100%' }}
        // onChange={handleChange}
        onKeyDown={enterSubmit}
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
