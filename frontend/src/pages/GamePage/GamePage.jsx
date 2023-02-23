import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from '../../components/common/GlobalStyle';
import { socket } from '../../utils/socket';
import useSocket from '../../hooks/useSocket';
import ButtonGroup from '../../components/gamepage/ButtonGroup';
import Chatting from '../../components/gamepage/Chatting';
import Video from '../../components/gamepage/Video';

export default function GamePage() {
  useSocket();
  const userList = useSelector((state) => state.room.userList);
  const { gameStatus } = useSelector((state) => state.status);

  return (
    <>
      <GlobalStyle />
      <Box sx={{ backgroundColor: '#2B1D23', p: 2 }}>
        <Box xs={12}>{gameStatus !== 'playing' && <ButtonGroup />}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box mr={2}>
            {userList.map((user, index) => {
              if (index > 3) return null;
              return (
                <Box ml={2} mb={2} key={index}>
                  <Video name={user} />
                </Box>
              );
            })}
          </Box>
          <Box>
            <Chatting />
          </Box>
          <Box>
            <Box mr={2}>
              {userList.map((user, index) => {
                if (index <= 3) {
                  return null;
                }
                return (
                  <Box ml={2} mb={2} key={index}>
                    <Video name={user} />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
