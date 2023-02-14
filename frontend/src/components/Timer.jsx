import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function Timer() {
  const [counts, setCount] = useState(60);
  const [timeUp, setTimeUp] = useState();
  const [timeDown, setTimeDown] = useState();

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    if (counts === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [counts]);

  return (
    <Box>
      <Button variant="contained" sx={{ m: 1, backgroundColor: "#940404" }}>
        +10
      </Button>
      {counts} 초 남았습니다.
      <Button variant="contained" sx={{ m: 1, backgroundColor: "#940404" }}>
        -10
      </Button>
    </Box>
  );
}
