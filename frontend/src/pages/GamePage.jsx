import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chatting from '../components/Chatting';
import Video from '../components/Video';
import ButtonGroup from '../components/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../utils/socket';
import { useLocation } from 'react-router';
import { getJobList } from '../store/modules/room';
let jobList;
let myJob;
let finalist;

// socket 연결
socket.on('connect', () => {
  console.log('User Connected', socket.id);
});

export default function GamePage() {
  //isGame : Captain이 게임 시작 누르면 true
  const [isGame, setIsGame] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isKilled, setIsKilled] = useState(false);
  const [isFinalist, setIsFinalist] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const roomID = location.state;
  const userList = useSelector((state) => state.room.userList);

  // const dispatch = useDispatch();

  useEffect(() => {
    console.log('check roomID in GamePage: ', roomID);
    socket.emit('join room', roomID);

    // 게임 중 서버 메세지
    socket.on('gameNotice', (data) => {
      data.dayNight === 'night' ? setIsNight(true) : setIsNight(false);
      data.killed === socket.id ? setIsKilled(true) : false;
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
  }, []);

  // 낮 - 찬반 투표 결과 전송
  socket.emit('finalVote', {
    from_id: socket.id,
    to_id: finalist,
    voted: 'true/false',
  });

  useEffect(() => {
    // gameStart시, jobList, myJob update
    socket.on('gameStart', (data) => {
      setIsGame(true);
      jobList = data.jobList;
      myJob = jobList[userList.indexOf(socket.id)];
      dispatch(getJobList(data.jobList, myJob));
      console.log('game started', myJob);
    });
  }, [userList]);

  return (
    <Box sx={{ backgroundColor: '#2B1D23', p: 2 }}>
      <Box xs={12}>{isGame || <ButtonGroup />}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box mr={2}>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2}>
            <Video name="" />
          </Box>
        </Box>
        <Box>
          <Chatting roomID={roomID} />
        </Box>

        <Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2} mb={2}>
            <Video name="" />
          </Box>
          <Box ml={2}>
            <Video name="" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
