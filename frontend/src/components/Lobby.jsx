import React, { useRef } from 'react';
import './styles/lobby.css';
import { useDispatch } from 'react-redux';
import { getRoomID } from '../store/modules/room';
import { useNavigate } from 'react-router';

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
        <div className="roomlist">방 리스트</div>
        <div className="chatlist">채팅창</div>
      </div>
      <div className="right">
        <div className="button">방 생성</div>
        <br />
        <div className="button">마이 페이지</div>
        <div>
          <input
            ref={roomInput}
            id="roomName"
            type="text"
            placeholder="Enter Room Number"
          />
          <button id="join" onClick={clickJoinBtn}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
