import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../utils/socket';
import { getUserList } from '../store/modules/room';
import { addMessage } from '../store/modules/message';

const useSocket = () => {
  const dispatch = useDispatch();
  const { userId, userList } = useSelector((state) => state.room);

  const [isDM, setIsDM] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isMafia, setIsMafia] = useState(false);
  const [isKilled, setIsKilled] = useState(false);
  const [isFinalist, setIsFinalist] = useState(true);

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
      dispatch(addMessage(data.msg, 'chatNotice'));
    });

    // 게임 중 서버 메세지
    socket.on('gameNotice', ({ msg, dayNight, killed }) => {
      // killed_id 확인
      killed === socket.id ? setIsKilled(true) : false;
      // dayNight - day/night/false 확인

      if (!dayNight) {
        dispatch(addMessage(msg, 'gameNotice'));
        return;
      }

      if (dayNight === 'day') {
        setIsNight(false);
        dispatch(addMessage(msg, 'gameNotice_Day'));
        return;
      }

      if (dayNight === 'night') {
        setIsNight(true);
        dispatch(addMessage(msg, 'gameNotice_Night'));
      }
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
      if (data.from_id === socket.id) {
        dispatch(addMessage(data.msg, 'MyChatBox'));
      } else {
        dispatch(addMessage(data.msg, 'ServerChat', data.from_id));
      }

      // chatBox.current.insertAdjacentHTML(
      //   'beforeend',
      //   data.from_id === socket.id
      //     ? `<div class='MyChatBox'><div>ME</div><div class='MyChat'>${data.msg}</div></div>`
      //     : `<div class='NickName'>${data.from_id}<div><div class='ServerChat'>${data.msg}</div>`
      // );
    });

    // 보낸 DM과 받은 DM 구별하여 수신
    socket.on('getDM', (data) => {
      if (data.from_id === socket.id) {
        dispatch(addMessage(data.msg, 'MyDM', undefined, data.to_id));
      } else {
        dispatch(addMessage(data.msg, 'DirectChat', data.from_id));
      }
      // chatBox.current.insertAdjacentHTML(
      //   'beforeend',
      //   data.from_id === socket.id
      //     ? `<div class='MyChatBox'><div class='MyDM'>DM to ${data.to_id} : ${data.msg}</div></div>`
      //     : `<div class='DirectChat'>${data.from_id} : ${data.msg}</div>`
      // );
    });
  }, []);

  return {};
};

export default useSocket;
