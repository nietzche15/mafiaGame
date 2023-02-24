import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from '../../components/common/GlobalStyle';
import { socket } from '../../utils/socket';
import useSocket from '../../hooks/useSocket';
import useStream from '../../hooks/useStream';
import Chatting from '../../components/gamepage/Chatting';
import ProfileCard from '../../components/gamepage/ProfileCard';
import ButtonGroup from '../../components/gamepage/ButtonGroup';

export default function GamePage() {
  useSocket();
  const { peerList, stream } = useStream();
  const { timeStatus, gameStatus } = useSelector((state) => state.status);
  const { roomID, mySocketId, myJob, userList, killedUserList } = useSelector(
    (state) => state.room
  );

  useEffect(() => {
    socket.on('room full', () => {
      navigate('/lobby');
      alert('This rooom is not available');
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Box sx={{ backgroundColor: '#2B1D23', p: 2 }}>
        <Box xs={12}>{gameStatus !== 'playing' && <ButtonGroup />}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box mr={2}>
            {userList.map((user, index) =>
              index <= 3 ? (
                <Box ml={2} mb={2} key={index}>
                  <ProfileCard
                    userId={user}
                    peerList={peerList}
                    stream={stream}
                  />
                </Box>
              ) : null
            )}
          </Box>
          <Box>
            <Chatting />
          </Box>
          <Box>
            <Box mr={2}>
              {userList.map((user, index) =>
                index > 3 ? (
                  <Box ml={2} mb={2} key={index}>
                    <ProfileCard
                      userId={user}
                      peerList={peerList}
                      stream={stream}
                    />
                  </Box>
                ) : null
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
