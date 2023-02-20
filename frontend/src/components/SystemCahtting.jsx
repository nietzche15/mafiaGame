import { Box, Typography } from '@mui/material';
import React from 'react';

export default function SystemCahtting({ change, children }) {
  return (
    <Box p={1}>
      <Typography variant="p" component="div" color="#FFFFFF">
        {children}
      </Typography>
    </Box>
  );
}
