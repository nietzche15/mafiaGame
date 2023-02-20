import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../utils/socket';
let jobList;

export default function MafiaText() {
  const userList = useSelector((state) => state.room.userList);
  const roomID = useSelector((state) => state.room.roomID);
  const jobList = useSelector((state) => state.room.jobList);
  const myJob = useSelector((state) => state.room.myJob);
  console.log('inMafiaTxt: ', myJob);

  let onlyMafia = userList.length <= 4; // userList.length <=4 면 mafia 한 명(true)

  const DMInput = useRef();
  const selectDM = useRef();

  // useEffect(() => {
  //   socket.on('gameStart', (data) => {
  //     jobList = data.jobList;
  //   });
  // }, []);

  const handleSubmit = () => {
    socket.emit('sendDM', {
      roomID: roomID,
      from_id: socket.id,
      to_id:
        userList.filter(
          (e, i) => e !== socket.id && jobList[i] === 'mafia'
        )[0] || socket.id,
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
      <TextField
        // value={value}
        id="outlined-basic"
        label=""
        inputRef={DMInput}
        variant="outlined"
        sx={{ width: '100%' }}
        // onChange={handleChange}
        onKeyDown={enterSubmit}
        disabled={onlyMafia ? true : false}
        placeholder={
          onlyMafia
            ? 'CHOOSE ONE TO KILL'
            : 'ONLY MAFIA can send a message during the NIGHT'
        }
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
