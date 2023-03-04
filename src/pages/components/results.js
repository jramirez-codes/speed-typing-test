import React from "react";
import { Stack, Box, Alert } from "@mui/material";

export default function Results(props) {
  return(
    <Box
      display="flex"
      justifyContent="center"
      style={{marginTop:'2vh'}}
      >
    <Stack spacing={1} style={{textAlign:'center'}}>
      {/* <div>
        <h2>Time</h2>
      </div> */}
      <Alert severity="success">Typing test complete!</Alert>
      <Alert severity="info">Typing Speed: <b>{props.wpm} words per min</b></Alert>
      <Alert severity="info">Typing Accuracy: <b>{props.accuracy}%</b></Alert>
    </Stack>
  </Box>
  )
}