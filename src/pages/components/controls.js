import React, {useState} from "react";
import { Stack, Box } from "@mui/material";

export default function Controls(props) {
  const [words, setWords] = useState(5)

  function handleButton() {
    if(words !== "") {
      props.handleClick(words)
    }
    else {
      alert("Number of word must be a integer")
      setWords(5)
    }
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
      <label htmlFor="numbWords">Number of Words</label>
      <input value={words} type="number" id="numbWords" onChange={(e)=>{setWords(e.target.value)}}/>
      <button onClick={()=>{handleButton()}}>Begin</button>
      <div>
      </div>
    </Stack>
  </Box>
  )
}