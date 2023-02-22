import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/Chatting.css';
import Message from './Message';
import MafiaText from '../MafiaText';
import GlobalStyle from '../common/GlobalStyle';
import ChattingText from './ChattingText';
import DMText from '../DMText';

export default function Chatting() {
  const [isDM, setIsDM] = useState(false);
  const { timeStatus } = useSelector((state) => state.status);
  const { userList } = useSelector((state) => state.room);
  const { messages } = useSelector((state) => state.message);
  const changeToDM = () => setIsDM(!isDM);
  // socket.emit('reqUserList', { from_id: socket.id });

  console.log(timeStatus);

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
            <Message
              key={message.id}
              msg={message.msg}
              type={message.type}
              fromId={message.fromId}
              toId={message.toId}
            />
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
          <MafiaText />
        </Box>
      </Box>
    </>
  );
}