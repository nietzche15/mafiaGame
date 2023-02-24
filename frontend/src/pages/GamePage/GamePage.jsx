import { Box, Checkbox, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from '../../components/common/GlobalStyle';
import { socket } from '../../utils/socket';
import useSocket from '../../hooks/useSocket';
import ButtonGroup from '../../components/gamepage/ButtonGroup';
import Chatting from '../../components/gamepage/Chatting';
import JobMemo from '../../components/gamepage/JobMemo';
import Vote from '../../components/gamepage/Vote';
import Peer from 'simple-peer';
import styled from 'styled-components';
import ImgContainer from '../../components/gamepage/ImgContainer';
import Video from '../../components/gamepage/Video';
export default function GamePage() {
  useSocket();
  // const userList = useSelector((state) => state.room.userList);
  const { gameStatus } = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const { timeStatus } = useSelector((state) => state.status);
  const { roomID, mySocketId, myJob, userList, killedUserList } = useSelector(
    (state) => state.room
  );
  console.log('userList in gamepg: ', userList);
  useEffect(() => {
    socket.on('room full', () => {
      navigate('/lobby');
      alert('This rooom is not available');
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Video />
      <Box>
        <Chatting />
      </Box>
    </>
  );
}
