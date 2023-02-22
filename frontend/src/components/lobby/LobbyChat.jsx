import React, { useRef } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { socket } from '../../utils/socket';


export default function LobbyChat() {
  const chatBox2 = useRef();
  const chatInput2 = useRef();
  // socket 연결
  socket.on('connect', () => {
    console.log('User Connected', socket.id);
  });


  const handleSubmit2 = () => {
    console.log('chat input: ', chatInput2.current.value);
    socket.emit('sendChat2', {
      from_id: socket.id,
      msg: chatInput2.current.value,
    });
  };

  const enterSubmit2 = (e) => {
    if (e.key === 'Enter') handleSubmit2();
  };

  return (
    <div className='chat'>
      <div className='chatbox'>
        <div ref={chatBox2} className='chatboxtext'>
          채팅
        </div>
      </div>
      <div className='lobbyinput'>
        <TextField inputRef={chatInput2} onKeyDown={enterSubmit2} id="outlined-basic" label="" variant="outlined" size="small" sx={{ width: '590px', backgroundColor: '#D9D9D9', borderRadius: '5px' }} />
        <Button onClick={handleSubmit2} variant="contained" color="primary" sx={{ ml: '6px', height: '39px', '* .Mui_disabled': { background: '#E38989' } }}>
          전송
        </Button>
      </div>
    </div>
  )
}
