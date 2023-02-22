import React, { useRef } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { socket } from '../../utils/socket';


export default function LobbyChat() {

  return (
    <div className='chat'>
      <div className='chatbox'>
        <div className='chatboxtext'>
          채팅
        </div>
      </div>
      <div className='lobbyinput'>
        <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ width: '590px', backgroundColor: '#D9D9D9', borderRadius: '5px' }} />
        <Button variant="contained" color="primary" sx={{ ml: '6px', height: '39px', '* .Mui_disabled': { background: '#E38989' } }}>
          전송
        </Button>
      </div>
    </div>
  )
}
