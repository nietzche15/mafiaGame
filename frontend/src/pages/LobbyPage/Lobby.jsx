import React, { useEffect, useRef, useState } from 'react';
import '../../components/styles/lobby.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
// import Modal from '@mui/material/Modal';
import { Cookies } from 'react-cookie';
import LobbyChat from '../../components/lobby/LobbyChat';
import GameRoom from '../../components/lobby/GameRoom';
import { getRoomID } from '../../store/modules/room';
import { socket } from '../../utils/socket';

export default function Lobby() {
  const cookies = new Cookies();
  const roomInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const roomName = useRef();
  const roomPW = useRef();

  // console.log(cookies.get('id1'));
  // console.log(cookies.get('id2'));

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
  const createRoom = () => {
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleSubmit = () => {
    // console.log(socket);
    socket.emit('newRoomInfo', {
      room_name: roomName.current.value,
      room_locked: locked,
      room_PW: roomPW.current?.value || false,
      room_owner: socket.id,
    });
    setOpen(false);
  };

  const radioChange = (e) => {
    e.target.value === 'Yes' ? setLocked(true) : setLocked(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="lobby">
      <div className="left">
        <div className="room">
          <div className="roomstate">
            <Button variant="contained" color="secondary" sx={{ mr: 2, mb: 2 }}>
              전체
            </Button>
            <Button variant="contained" color="secondary" sx={{ mr: 2, mb: 2 }}>
              공개
            </Button>
            <Button variant="contained" color="secondary" sx={{ mr: 2, mb: 2 }}>
              비밀
            </Button>
          </div>

          <div className="gameroom">
            <div className="gamelist">
              <span className="gamenumber">1</span>
              <span className="gametitle">용산 마피아</span>
              <span className="gamestate">
                <img
                  style={{ width: '19px', position: 'relative', top: '3px' }}
                  src="./images/lock.png"
                />
              </span>
              <span className="gameNoP">1/7</span>
            </div>
            <GameRoom />
          </div>

          <div className="right">
            <Button
              onClick={handleOpen}
              variant="contained"
              color="primary"
              sx={{ m: 0, '* .Mui_disabled': { background: '#E38989' } }}
            >
              방 생성
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle sx={{ fontSize: '15px' }}>
                Room Information
              </DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  직접 방을 만들고 친구를 초대해보세요
                </DialogContentText> */}
                <TextField
                  inputRef={roomName}
                  autoFocus
                  required
                  label="Room Name"
                  variant="outlined"
                  size="small"
                  margin="dense"
                />
                <br />
                <FormControl sx={{ margin: '10px 0 10px 0' }}>
                  <FormLabel sx={{ fontSize: '15px' }}>Private ?</FormLabel>
                  <RadioGroup row onChange={radioChange}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      autoFocus
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                {locked && (
                  <TextField
                    inputRef={roomPW}
                    label="Password"
                    variant="outlined"
                    size="small"
                    margin="dense"
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </DialogActions>
            </Dialog>

            {/* <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}

            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 0, '* .Mui_disabled': { background: '#E38989' } }}
            >
              <Link
                to="/mypage"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                마이 페이지
              </Link>
            </Button>
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
        <div className="chatlist">
          <LobbyChat />
        </div>
      </div>
    </div>
  );
}
