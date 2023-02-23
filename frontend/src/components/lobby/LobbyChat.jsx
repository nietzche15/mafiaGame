import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { socket } from '../../utils/socket';
import Message from '../gamepage/Message';
import { useSelector } from 'react-redux';
import GlobalStyle from '../common/GlobalStyle';
import { Cookies } from 'react-cookie';

export default function LobbyChat() {
  const cookies = new Cookies();
  const lobbyChatBox = useRef();
  const lobbyInput = useRef();
  const { messages } = useSelector((state) => state.message);
  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);

  let userEmail = cookies.get('id1');
  let userImg = cookies.get('id2');
  let userName = cookies.get('id3');

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
            <div>${userName}</div>
            <div>${data.msg}</div>
            </div>`
          )
        : lobbyChatBox.current.insertAdjacentHTML(
            'beforeend',
            `<div>${userName}</div>
          <div class='ServerChat'>${data.msg}</div>`
          );
    });
  }, []);

  const sendLobbyChat = (event) => {
    event.preventDefault();
    console.log('chat input: ', value);
    socket.emit('sendLBChat', {
      from_id: socket.id,
      user_name: userName,
      user_email: userEmail,
      msg: value,
    });
    setValue('');
  };

  // const enterLobbyChat = (e) => {
  //   if (e.key === 'Enter') sendLobbyChat();
  // };

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
            value={value}
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
            // onKeyDown={enterLobbyChat}
            onChange={handleChange}
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
