import React, { useRef } from 'react';
import './styles/lobby.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRoomID } from '../store/modules/room';
import { Box, Button, TextField } from '@mui/material';
import GameRoom from './GameRoom';

export default function Lobby() {
  const roomInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let roomID;

  const clickJoinBtn = () => {
    console.log('roomInput.current.value: ', roomInput.current.value);
    /* eslint-disable */
    roomInput.current.value === ''
      ? alert('Please enter a room name')
      : ((roomID = roomInput.current.value),
        dispatch(getRoomID({ roomID: roomID })),
        navigate('/gamepage', { state: roomID, replace: true }));
  };

  return (
    <div className="lobby">
      <div className="left">
        <div className="room">
          <div className='roomstate'>
            <Button variant="contained" color="secondary" sx={{ mr: 2, mb:2 }}>
              전체
            </Button>
            <Button variant="contained" color="secondary" sx={{ mr: 2,mb:2}}>
              공개
            </Button>
            <Button variant="contained" color="secondary" sx={{ mr: 2,mb:2 }}>
              비밀
            </Button>
          </div>
          
          {/* <div className='gameroom'>
            <div className='gamelist'>
              <span className='gamenumber'>1</span>
              <span className='gametitle'>용산 마피아</span>
              <span className='gamestate'><img style={{width:'19px',position:'relative',top:'3px'}} src='./images/lock.png'/></span>
              <span className='gameNoP'>1/7</span>
            </div>
          </div> */}
          <GameRoom/>          
          
          <div className="right">
            <Button variant="contained" color="primary" sx={{ m: 0, '* .Mui_disabled': { background: '#E38989'} }}>
              방 생성
            </Button>
            <br />
            <br />
            <Button variant="contained" color="primary" sx={{ m: 0, '* .Mui_disabled': { background: '#E38989' } }}>
              <Link to="/mypage" style={{ textDecoration: "none", color:'white' }}>마이 페이지</Link>
            </Button>
            <div>
              <input ref={roomInput} id="roomName" type="text" placeholder="Enter Room Number"/>
              <button id="join" onClick={clickJoinBtn}>
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="chatlist">채팅창</div>
      </div>
    </div>
  );
}
