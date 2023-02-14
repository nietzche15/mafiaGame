import { Grid, Box } from "@mui/material";
import React from "react";
import Chatting from "../components/Chatting";
import Video from "../components/Video";
import ButtonGroup from "../components/ButtonGroup";

export default function GamePage() {
  return (
    <Grid container spacing={0} sx={{ backgroundColor: "#2B1D23" }}>
      <Grid item xs={12}>
        <ButtonGroup />
      </Grid>
      <Grid
        item
        xs={3}
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5}>
          <Video />
        </Grid>
        <Grid item xs={5}>
          <Video />
        </Grid>
        <Grid item xs={5}>
          <Video />
        </Grid>
        <Grid item xs={5}>
          <Video />
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Chatting />
      </Grid>
      <Grid
        item
        xs={3}
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5}>
          <Video />
        </Grid>
        <Grid item xs={5}>
          <Video />
        </Grid>
        <Grid item xs={5}>
          <Video />
        </Grid>
        <Grid item xs={5}>
          <Video />
        </Grid>
      </Grid>
    </Grid>
  );
}
