import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function Vote({ name }) {
  const [job, setJob] = React.useState('');
  const { gameStatus, timeStatus, myStatus } = useSelector(
    (state) => state.status
  );
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

  if (gameStatus === 'wait' || timeStatus === 'night' || myStatus === 'dead')
    return null;

  return (
    <Box sx={{ minWidth: 15 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">투표</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={job}
          onChange={handleChange}
        >
          <MenuItem value={10}> {name[0]}</MenuItem>
          <MenuItem value={20}> {name[1]}</MenuItem>
          <MenuItem value={30}> {name[2]}</MenuItem>
          <MenuItem value={40}> {name[3]}</MenuItem>
          <MenuItem value={50}> {name[4]}</MenuItem>
          <MenuItem value={60}> {name[5]}</MenuItem>
          <MenuItem value={70}> {name[6]}</MenuItem>
          <MenuItem value={80}> {name[7]}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
