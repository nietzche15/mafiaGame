import { Box, Typography } from '@mui/material';
import React from 'react';

export default function SystemCahtting({ change, children }) {
  console.log(change.isUp ? '10초증가' : '10초감소');
  return (
    <Box p={1}>
      <Typography
        variant="p"
        component="div"
        color="#FFFFFF"
        time={change.isUp ? '10초증가' : '10초감소'}
      >
        {children}
      </Typography>
    </Box>
  );
}
