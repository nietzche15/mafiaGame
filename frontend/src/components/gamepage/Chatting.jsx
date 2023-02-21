import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import DMText from '../DMText';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../utils/socket';
import '../styles/Chatting.css';
import { getJobList, getUserList } from '../../store/modules/room';
import Message from './Message';
import MafiaText from '../MafiaText';
import GlobalStyle from '../common/GlobalStyle';
import SystemCahtting from './SystemCahtting';
import ChattingText from './ChattingText';

let jobList;
let myJob;
let finalist;

export default function Chatting(props) {
  const [isDM, setIsDM] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isKilled, setIsKilled] = useState(false);
  const [isFinalist, setIsFinalist] = useState(true);
  const [change, setChange] = useState(false);

  const { userList, jobList, myJob, userId } = useSelector(
    (state) => state.room
  );

  const { messages } = useSelector((state) => state.message);
  console.log('inChatting: ', myJob);

  const changeToDM = () => {
    setIsDM(!isDM);
    // socket.emit('reqUserList', { from_id: socket.id });
  };

  useEffect(() => {
    socket.on('gameStart', (data) => {
      jobList = data.jobList;
      myJob = jobList[userList.indexOf(socket.id)];
    });
  }, [userList]);

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

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SystemCahtting change={change}> </SystemCahtting>
        </Box>
        <Box>
          <div ref={chatBox} id="chatBox"></div>
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
          {isNight || (
            <Button
              onClick={changeToDM}
              sx={{ fontFamily: 'MaplestoryOTFBold' }}
            >
              {isDM ? 'quitDM' : 'sendDM'}
            </Button>
          )}
          {!isNight && !isDM && <ChattingText />}
          {!isNight && isDM && <DMText userList={userList} />}
          {isNight && myJob === 'mafia' && <MafiaText />}
        </Box>
      </Box>
    </>
  );
}
