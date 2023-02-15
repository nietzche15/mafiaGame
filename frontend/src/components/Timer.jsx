import { Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [counts, setCount] = useState(60);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        if (prev < 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    if (counts === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [counts]);

  const timeUp = () =>
    setCount((prev) => {
      if (prev > 80) {
        alert('증가불가');
        return 80;
      }
      return prev + 10;
    });
  const timeDown = () =>
    setCount((prev) => {
      if (prev < 10) {
        return 0;
      }
      return prev - 10;
    });

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ m: 1, backgroundColor: '#940404' }}
        onClick={timeUp}
      >
        +10
      </Button>
      {counts} 초 남았습니다.
      <Button
        variant="contained"
        sx={{ m: 1, backgroundColor: '#940404' }}
        onClick={timeDown}
      >
        -10
      </Button>
    </Box>
  );
}
