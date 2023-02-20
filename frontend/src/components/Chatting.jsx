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
import { getJobList, getUserList } from '../store/modules/room';
import MafiaText from './MafiaText';

let jobList;
let myJob;
let finalist;

export default function Chatting(props) {
  const [isDM, setIsDM] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isMafia, setIsMafia] = useState(false);
  const [isKilled, setIsKilled] = useState(false);
  const [isFinalist, setIsFinalist] = useState(true);
  const [change, setChange] = useState(false);

  const chatBox = useRef();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.room.userList);
  // const jobList = useSelector((state) => state.room.jobList);
  // const myJob = useSelector((state) => state.room.myJob);
  // console.log('inChatting: ', myJob);

  const changeToDM = () => {
    setIsDM(!isDM);
    // socket.emit('reqUserList', { from_id: socket.id });
  };

  //채팅방 입장 시 입퇴장 알림
  useEffect(() => {
    // Realtime User Notice
    socket.on('notice', (data) => {
      const outMessgae = '님이 방을 나갔습니다.';
      if (data.msg.includes(outMessgae)) {
        const outUser = data.msg.replace(outMessgae, '');
        dispatch(
          getUserList(data.roomToUser.filter((user) => user !== outUser))
        );
      } else {
        dispatch(getUserList(data.roomToUser));
      }
      chatBox.current.insertAdjacentHTML(
        'beforeend',
        `<div class='chatNotice'>${data.msg}</div>`
      );
    });

    // 게임 중 서버 메세지
    socket.on('gameNotice', (data) => {
      // killed_id 확인
      data.killed === socket.id ? setIsKilled(true) : false;
      // dayNight - day/night/false 확인
      data.dayNight
        ? data.dayNight === 'day'
          ? (setIsNight(false),
            chatBox.current.insertAdjacentHTML(
              'beforeend',
              `<div class='gameNotice_Day'>${data.msg}</div>`
            ))
          : (setIsNight(true),
            chatBox.current.insertAdjacentHTML(
              'beforeend',
              `<div class='gameNotice_Night'>${data.msg}</div>`
            ))
        : chatBox.current.insertAdjacentHTML(
            'beforeend',
            `<div class='gameNotice'>${data.msg}</div>`
          );
    });
    // 낮 - 지목 결과 받음
    // 누가 누구를 지목했는지 보여주고,
    // 최종 변론 후보 산출
    socket.on('votedResult', (data) => {
      let peopleVotedList = data.peopleVotedList;
      // { '지목당한 사람1' : [지목한 사람1, 지목한 사람2,..], '지목당한 사람2' : [...], ...  }
      let list = Object.keys(peopleVotedList);
      let listCnt = list.map((e) => peopleVotedList[e].length);
      let result = list[listCnt.indexOf(Math.max(...listCnt))];
      finalist = result;
      finalist === socket.id ? setIsFinalist(true) : setIsFinalist(false);
    });

    // MyChat과 다른 Chat 구별하여 수신
    socket.on('getChat', (data) => {
      chatBox.current.insertAdjacentHTML(
        'beforeend',
        data.from_id === socket.id
          ? `<div class='MyChatBox'><div >ME</div><div class='MyChat'>${data.msg}</div></div>`
          : `<div class='NickName'>${data.from_id}<div><div class='ServerChat'>${data.msg}</div>`
      );
    });

    // 보낸 DM과 받은 DM 구별하여 수신
    socket.on('getDM', (data) => {
      chatBox.current.insertAdjacentHTML(
        'beforeend',
        data.from_id === socket.id
          ? `<div class='MyChatBox'><div class='MyDM'>DM to ${data.to_id} : ${data.msg}</div></div>`
          : `<div class='DirectChat'>${data.from_id} : ${data.msg}</div>`
      );
    });
  }, []);

  useEffect(() => {
    socket.on('gameStart', (data) => {
      jobList = data.jobList;
      myJob = jobList[userList.indexOf(socket.id)];
      myJob === 'mafia' ? setIsMafia(true) : setIsMafia(false);
    });
  }, [userList]);

  return (
    <Box
      sx={{
        width: '900px',
        backgroundColor: '#8B7F70',
        borderRadius: '10px',
        height: 976,
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
      </Box>

      <Box sx={{ position: 'absolute', bottom: 0 }}>
        {isNight || (
          <Button onClick={changeToDM}>{isDM ? 'quitDM' : 'sendDM'}</Button>
        )}
        {!isNight && !isDM && <ChattingText />}
        {!isNight && isDM && <DMText userList={userList} />}
        {isNight && isMafia && <MafiaText />}
      </Box>
    </Box>
  );
}
