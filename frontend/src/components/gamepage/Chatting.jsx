import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../utils/socket';
import '../styles/Chatting.css';
import { setJobList } from '../../store/modules/room';
import Message from './Message';
import MafiaText from '../MafiaText';
import GlobalStyle from '../common/GlobalStyle';
import SystemCahtting from './SystemCahtting';
import ChattingText from './ChattingText';
import DMText from '../DMText';

export default function Chatting(props) {
  const [isDM, setIsDM] = useState(false);

  const dispatch = useDispatch();
  const { timeStatus } = useSelector((state) => state.status);
  const { userList, jobList, myJob } = useSelector((state) => state.room);
  const { messages } = useSelector((state) => state.message);
  const changeToDM = () => {
    setIsDM(!isDM);
    // socket.emit('reqUserList', { from_id: socket.id });
  };

  useEffect(() => {
    socket.on('gameStart', (data) => {
      dispatch(setJobList(data.jobList, jobList[userList.indexOf(socket.id)]));
    });
  }, [userList, dispatch]);

  return (
    <>
      <GlobalStyle />
      <Box
        sx={{
          width: '900px',
          backgroundColor: '#8B7F70',
          borderRadius: '10px',
          minHeight: 976,
          maxHeight: 976,
          position: 'relative',
          overflowY: 'auto',
        }}
      >
        {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Timer setChange={setChange} />
      </Box> */}

        <Box>
          {messages.map((message) => (
            <Message key={message.id} msg={message.msg} type={message.type} />
          ))}
        </Box>
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {timeStatus === 'day' && (
            <Button
              onClick={changeToDM}
              sx={{ fontFamily: 'MaplestoryOTFBold' }}
            >
              {isDM ? 'quitDM' : 'sendDM'}
            </Button>
          )}

          {isDM ? <DMText userList={userList} /> : <ChattingText />}
          {myJob === 'mafia' && <MafiaText />}
        </Box>
      </Box>
    </>
  );
}
