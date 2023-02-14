import { Box, Button, TextField } from '@mui/material';
import React from 'react';

export default function ChattingText() {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
      }}
    >
      <TextField id="outlined-basic" label="" variant="outlined" />
      <Button variant="contained" sx={{ backgroundColor: '#940404' }}>
        전송
      </Button>
    </Box>
  );
}
