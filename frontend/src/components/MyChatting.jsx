import { Box, Typography } from '@mui/material';
import React from 'react';

export default function MyChatting(props) {
  // const [from_id, msg] = props;
  // console.log(from_id, msg);
  return (
    <>
      <Box
        sx={{
          float: 'right',
          width: '50%',
          p: 3,
        }}
      >
        <Box
          sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}
        >
          <Typography variant="p" component="div">
            {from_id}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#E4D9C6',
            height: '50px',
            borderRadius: '10px 10px 10px 10px',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="p" component="div">
            {msg}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
