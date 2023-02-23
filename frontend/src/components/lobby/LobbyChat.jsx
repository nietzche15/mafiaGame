import React, { useEffect, useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { socket } from '../../utils/socket';
import Message from '../gamepage/Message';
import { useSelector } from 'react-redux';
import GlobalStyle from '../common/GlobalStyle';

export default function LobbyChat() {
  const lobbyChatBox = useRef();
  const lobbyInput = useRef();
  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    socket.on('noticeLB', (data) => {
      lobbyChatBox.current.insertAdjacentHTML(
        'beforeend',
        `<div class='chatNotice'>${data.msg}</div>`
      );
    });

    socket.on('getLBChat', (data) => {
      data.from_id === socket.id
        ? lobbyChatBox.current.insertAdjacentHTML(
            'beforeend',
            `<div class='MyChatBox'>
            <div>${data.from_name}</div>
            <div>${data.msg}</div>
            </div>`
          )
        : lobbyChatBox.current.insertAdjacentHTML(
            'beforeend',
            `<div>${data.from_name}</div>
          <div class='ServerChat'>${data.msg}</div>`
          );
    });
  }, []);

  const sendLobbyChat = () => {
    socket.emit('sendLBChat', {
      from_id: socket.id,
      msg: lobbyInput.current.value,
    });
  };

  const enterLobbyChat = (e) => {
    if (e.key === 'Enter') sendLobbyChat();
  };

  return (
    <>
      <GlobalStyle />
      <div className="chat">
        <div className="chatbox">
          <div ref={lobbyChatBox} className="chatboxtext">
            {/* {messages.map((message) => (
            <Message
              key={message.id}
              msg={message.msg}
              type={message.type}
              fromId={message.fromId}
              toId={message.toId}
            />
          ))} */}
          </div>
        </div>
        <div className="lobbyinput">
          <TextField
            ref={lobbyInput}
            id="outlined-basic"
            label=""
            variant="outlined"
            size="small"
            sx={{
              width: '590px',
              backgroundColor: '#D9D9D9',
              borderRadius: '5px',
            }}
            onKeyDown={enterLobbyChat}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              ml: '6px',
              height: '39px',
              '* .Mui_disabled': { background: '#E38989' },
            }}
            onClick={sendLobbyChat}
          >
            전송
          </Button>
        </div>
      </div>
    </>
  );
}
