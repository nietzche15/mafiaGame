import { Box, Button } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import ChattingText from './ChattingText';
import SystemCahtting from './SystemCahtting';
import Timer from './Timer';
import { useState } from 'react';
import DMText from './DMText';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../utils/socket';
import './styles/Chatting.css';
import { getUserList } from '../store/modules/room';

export default function Chatting(props) {
  const chatBox = useRef();
  const dispatch = useDispatch();
  const userList = useSelector((state) => {
    console.log('state.room.userList : ', state.room.userList);
    return state.room.userList;
  });
  // const roomID = useSelector((state) => state.room.roomID);
  const [isDM, setIsDM] = useState(false);
  const [change, setChange] = useState(false);
  const changeToDM = () => {
    console.log('dm');
    setIsDM(!isDM);
    // socket.emit('reqUserList', { from_id: socket.id });
  };

  useEffect(() => {
    // Realtime User Notice
    socket.on('notice', (data) => {
      dispatch(getUserList(data.roomToUser));
      chatBox.current.insertAdjacentHTML(
        'beforeend',
        `<div class='chatNotice'>${data.msg}</div>`
      );
    });
    // MyChat과 다른 Chat 구별하여 수신
    socket.on('getChat', (data) => {
      chatBox.current.insertAdjacentHTML(
        'beforeend',
        data.from_id === socket.id
          ? `<div class='MyChatBox'><div class='MyChat'>${data.msg}</div></div>`
          : `<div class='ServerChat'>${data.msg}</div>`
      );
    });

    // 보낸 DM과 받은 DM 구별하여 수신
    socket.on('getDM', (data) => {
      console.log('getDM');
      console.log('data : ', data);
      chatBox.current.insertAdjacentHTML(
        'beforeend',
        data.from_id === socket.id
          ? `<div class='MyChatBox'><div class='MyDM'>DM to ${data.to_id} : ${data.msg}</div></div>`
          : `<div class='DirectChat'>${data.from_id} : ${data.msg}</div>`
      );
    });
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        width: '900px',
        backgroundColor: '#8B7F70',
        borderRadius: '10px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Timer setChange={setChange} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SystemCahtting change={change}> {props.time} </SystemCahtting>
      </Box>
      <Box>
        <div ref={chatBox} id="chatBox"></div>
      </Box>

      <Box sx={{ mt: 89 }}>
        <Button onClick={changeToDM}>{isDM ? 'quitDM' : 'sendDM'}</Button>
        {isDM || <ChattingText />}
        {isDM && <DMText userList={userList} />}
      </Box>
    </Box>
  );
}
