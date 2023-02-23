import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../utils/socket';
import {
  setJobList,
  getUserList,
  setSocketId,
  setFinalListId,
  addKilledUser,
} from '../store/modules/room';
import { addMessage } from '../store/modules/message';
import {
  setGameStatus,
  setTimeStatus,
  setMyStatus,
} from '../store/modules/status';

const useSocket = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.room);
  const { state: roomID } = useLocation();

  useEffect(() => {
    // 채팅방 입장
    // socket.emit('join room', roomID);

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
      // killed_id 확인 죽는지 확인하는곳

      if (killed) {
        dispatch(addKilledUser(killed));
      }

      if (killed === socket.id) {
        dispatch(setMyStatus('dead'));
      }

      // dayNight - day/night/false 확인
      if (!dayNight) {
        dispatch(addMessage(msg, 'gameNotice'));
        return;
      }

      if (dayNight.includes('day')) {
        dispatch(addMessage(msg, 'gameNotice_Day'));
        dispatch(setTimeStatus(dayNight));
        return;
      }

      if (dayNight === 'night') {
        dispatch(addMessage(msg, 'gameNotice_Night'));
        dispatch(setTimeStatus(dayNight));
      }
    });

    // 낮 - 지목 결과 받음
    // 누가 누구를 지목했는지 보여주고,
    // 최종 변론 후보 산출
    socket.on('votedResult', (data) => {
      const { peopleVotedList } = data;
      // { '지목당한 사람1' : [지목한 사람1, 지목한 사람2,..], '지목당한 사람2' : [...], ...  }
      const list = Object.keys(peopleVotedList);
      const listCnt = list.map((e) => peopleVotedList[e].length);
      const result = list[listCnt.indexOf(Math.max(...listCnt))];
      dispatch(setFinalListId(result));
    });

    // 낮 - 찬반 투표 결과 전송
    // socket.emit('finalVote', {
    //   from_id: socket.id,
    //   to_id: finalist,
    //   voted: 'true/false',
    // });

    // MyChat과 다른 Chat 구별하여 수신
    socket.on('getChat', (data) => {
      if (data.from_id === socket.id) {
        dispatch(addMessage(data.msg, 'MyChatBox'));
      } else {
        dispatch(addMessage(data.msg, 'ServerChat', data.from_id));
      }
    });

    // 보낸 DM과 받은 DM 구별하여 수신
    socket.on('getDM', (data) => {
      if (data.from_id === socket.id) {
        dispatch(addMessage(data.msg, 'MyDM', undefined, data.to_id));
      } else {
        dispatch(addMessage(data.msg, 'DirectChat', data.from_id));
      }
    });
  }, [dispatch, roomID]);

  useEffect(() => {
    // gameStart시, jobList, myJob update
    socket.on('gameStart', (data) => {
      const job = data.jobList[userList.indexOf(socket.id)];
      dispatch(setGameStatus('playing'));
      dispatch(setJobList(data.jobList, job));
      dispatch(setSocketId(socket.id));
    });
  }, [userList, dispatch]);

  return {};
};

export default useSocket;
