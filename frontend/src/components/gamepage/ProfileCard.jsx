import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Checkbox, Typography } from '@mui/material';
import { socket } from '../../utils/socket';
import JobMemo from './JobMemo';
import Vote from './Vote';

// import Vote from "./Vote";
// import Target from "./Target";

export default function ProfileCard({ userId, peerList, stream }) {
  const { timeStatus } = useSelector((state) => state.status);
  const { mySocketId, myJob, killedUserList } = useSelector(
    (state) => state.room
  );

  const onClickKill = () => {
    if (myJob === 'mafia' && timeStatus === 'night') {
      socket.emit('mafiaVoted', { killed_id: userId, from_id: mySocketId });
    }
  };

  const video = useMemo(() => {
    if (mySocketId === userId) {
      return stream;
    }
    return peerList.find((peer) => peer.userId === userId)?.peer;
  }, [userId, peerList, stream, mySocketId]);

  console.log(video);

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
            {userId}
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
          <JobMemo name={userId} />
        </Box>
        <Box
          sx={{
            width: '200px',
            backgroundColor: '#D9D9D9',
            mt: 1,
            borderRadius: '10px',
          }}
        >
          {userId === mySocketId ? <Vote /> : null}
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
        {killedUserList.includes(userId) ? (
          <Box
            sx={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              backgroundColor: '#171717',
              borderRadius: '10px',
            }}
          >
            <img
              src="./images/killimg.png"
              alt="killimg"
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                backgroundColor: '#171717',
                borderRadius: '10px',
              }}
            />
          </Box>
        ) : null}
        {video ? (
          <video src={video} style={{ width: '200px', height: '200px' }} />
        ) : (
          <img
            src="./images/mafiaImg.png"
            alt="mafiaImg"
            style={{ width: '200px', height: '200px' }}
          />
        )}
      </Box>
    </Box>
  );
}
