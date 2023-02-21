import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function Vote(props) {
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
    <Box sx={{ minWidth: 15 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">투표</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={job}
          onChange={handleChange}
        >
          <MenuItem value={10}> {props.name}</MenuItem>
          <MenuItem value={20}> {props.name}</MenuItem>
          <MenuItem value={30}> {props.name}</MenuItem>
          <MenuItem value={40}> {props.name}</MenuItem>
          <MenuItem value={50}> {props.name}</MenuItem>
          <MenuItem value={60}> {props.name}</MenuItem>
          <MenuItem value={70}> {props.name}</MenuItem>
          <MenuItem value={80}> {props.name}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
