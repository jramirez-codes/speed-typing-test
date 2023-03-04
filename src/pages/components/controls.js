import React from "react";
import { Stack, Box } from "@mui/material";

export default function Controls(props) {
  function handleButton() {
    props.handleClick()
  }

  return(
    <Box
      display="flex"
      justifyContent="center"
      >
    <Stack direction="row" spacing={1} style={{textAlign:'center'}}>
      {/* <div>
        <h2>Time</h2>
      </div> */}
      <button onClick={()=>{handleButton()}}>Begin</button>
    </Stack>
  </Box>
  )
}