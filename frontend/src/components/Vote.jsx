import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { socket } from '../utils/socket';

export default function Vote() {
  const [job, setJob] = React.useState('');
  const myJob = useSelector((state) => state.room.myJob);

  // // 밤 - 마피아 지목 내용 전송
  // socket.emit('mafiaVoted', {
  //   from_id: socket.id,
  //   killed_id: '@@@',
  // });

  // // 낮 - 사람들 투표 결과 전송
  // socket.emit('peopleVoted', {
  //   from_id: socket.id,
  //   killed_id: '@@@',
  // });

  // // 낮 - 시간 종료 전송
  // socket.emit('timeOut', {
  //   from_id: socket.id,
  // });

  const handleChange = (event) => {
    setJob(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 15, display: 'none' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">투표</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={job}
          onChange={handleChange}
        >
          <MenuItem value={10}>닉네임</MenuItem>
          <MenuItem value={20}>닉네임</MenuItem>
          <MenuItem value={30}>닉네임</MenuItem>
          <MenuItem value={40}>닉네임</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
