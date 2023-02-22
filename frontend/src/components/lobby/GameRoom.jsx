import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../utils/socket';
// import useSocket from '../../hooks/useSocket';
// import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { asyncRoomList } from '../../store/modules/roomlist';
let addedRoom = [];

export default function GameRoom() {
  const [open, setOpen] = useState(false);
  const [roomID, setRoomID] = useState('');
  const [password, setPassword] = useState('');
  const [cnt, setCnt] = useState(4);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameroomBox = useRef();
  const inputPW = useRef();
  const myRefs = useRef([]);

  useEffect(() => {
    dispatch(asyncRoomList());
  }, []);

  const roomList = useSelector((state) => {
    return state.asyncThunk.data;
  });

  const asyncLoading = useSelector((state) => {
    return state.asyncThunk.loading;
  });

  const enterRoom = (e) => {
    let roomID = e.currentTarget.getAttribute('value');
    let roomPW = e.currentTarget.getAttribute('password');
    setPassword(roomPW);
    setRoomID(roomID);
    console.log('roomID,roomPW:', roomID, roomPW);
    roomPW
      ? setOpen(true)
      : navigate('/gamepage', { state: roomID, replace: true });
  };

  const handleClose = () => {
    setOpen(false);
    setCnt(4);
  };
  const checkPassword = () => {
    setCnt(cnt - 1);
    password === inputPW.current.value
      ? (setOpen(false),
        navigate('/gamepage', { state: roomID, replace: true }),
        setPassword(''),
        setRoomID(''))
      : cnt === 5
      ? (setOpen(false), setCnt(4))
      : (inputPW.current.value = ''),
      inputPW.current.setAttribute('placeholder', `TRY AGAIN(${cnt}/5)`);
  };

  return (
    <>
      <div className="gameroomBox" ref={gameroomBox}>
        <div className="gameroom">
          <div className="gamelist">
            <span className="gamenumber">1</span>
            <span className="gametitle" value={1234} onClick={enterRoom}>
              용산 마피아
            </span>
            <span className="gamestate">
              <img
                style={{ width: '19px', position: 'relative', top: '3px' }}
                src="./images/lock.png"
              />
            </span>
            <span className="gameNoP">1/7</span>
          </div>
        </div>
        <div>
          {/* {asyncLoading && <InfinitySpin width="100" color=" cornflowerblue" />} */}
          {Object.keys(roomList).map((e, i) => {
            return (
              <div
                key={i}
                value={roomList[e].roomID}
                password={roomList[e].roomPW || ''}
                ref={(element) =>
                  (myRefs.current[roomList[e].roomName] = element)
                }
                onClick={enterRoom}
              >
                {roomList[e].roomName}
              </div>
            );
          })}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontSize: '15px' }}>Private Room</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              inputRef={inputPW}
              autoFocus
              required
              label="Password"
              variant="outlined"
              size="small"
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={checkPassword}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
