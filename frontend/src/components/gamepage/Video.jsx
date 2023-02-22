import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Checkbox, Typography } from '@mui/material';
import { socket } from '../../utils/socket';
import JobMemo from './JobMemo';
import Vote from './Vote';

// import Vote from "./Vote";
// import Target from "./Target";

export default function Video({ name }) {
  const { timeStatus, myStatus } = useSelector((state) => state.status);
  const { mySocketId, myJob } = useSelector((state) => state.room);

  const onClickKill = () => {
    if (myJob === 'mafia' && timeStatus === 'night') {
      console.log(mySocketId);
      socket.emit('mafiaVoted', { killed_id: name, from_id: mySocketId });
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#8B7F70',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        width: 465,
      }}
      onClick={onClickKill}
    >
      <Box>
        <Box
          sx={{
            mt: 1,
            width: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D9D9D9',
            borderRadius: '10px',
            mr: 2,
          }}
        >
          <Typography variant="h7" component="div">
            {name}
          </Typography>
          <Checkbox disabled sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
        </Box>
        <Box
          sx={{
            width: '200px',
            backgroundColor: '#D9D9D9',
            mt: 1,
            borderRadius: '10px',
          }}
        >
          <JobMemo name={name} />
        </Box>
        <Box
          sx={{
            width: '200px',
            backgroundColor: '#D9D9D9',
            mt: 1,
            borderRadius: '10px',
          }}
        >
          <Vote />
        </Box>
      </Box>

      <Box
        sx={{
          width: '200px',
          height: '200px',
          backgroundColor: '#E4D9C6',
          borderRadius: '10px',
        }}
      >
        {myStatus === 'dead' ? (
          <img
            src="./images/killimg.png"
            alt="killImg"
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              display: 'block',
            }}
          />
        ) : null}

        <img
          src="./images/mafiaImg.png"
          alt="mafiaImg"
          style={{ width: '200px', height: '200px' }}
        />
      </Box>
    </Box>
  );
}