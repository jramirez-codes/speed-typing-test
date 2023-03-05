import React, {useState, useEffect, useRef} from "react";
import { Stack, Box } from "@mui/material";

export default function Controls(props) {
  const [words, setWords] = useState(5)
  const [timer, setTimer] = useState("00:00")
  const [hasStarted, setHadStarted] = useState(false)

  // Refence is needed for setInterval
  const timerRef = useRef(timer)
  function refSetTimer(newItem) {
    timerRef.current = newItem
    setTimer(newItem)
  }
  const hasStartedRef = useRef(hasStarted)
  function refSetHadStarted(newItem) {
    hasStartedRef.current = newItem
    setHadStarted(newItem)
  }

  // Timer Used for value
  useEffect(()=>{
    if(!props.hadEnded && hasStartedRef.current) {
      const myTimer = setInterval(()=>{
        var timeCurr = new Date()
        var timeDiff = timeCurr.getTime() - (props.start + 100)
        if(timeDiff < 0) {
          timeDiff = 0
        }
        timeDiff = Math.floor(timeDiff/10)

        // Parse time into ms and sec
        var ms = (timeDiff % 100).toString()
        var sec = (Math.floor(timeDiff/100) % 100).toString()
        if(ms.length === 1) {
          ms = "0" + ms
        }
        if(sec.length === 1) {
          sec = "0" + sec
        }
        if(sec === null || ms === null) {
          sec = "00"
          ms = "00"
        }
        var timeString = sec + ":" + ms
  
        // Set Timer
        refSetTimer(timeString)
      }, 10)
  
      return () => clearInterval(myTimer)
    }
  },[props])

  function handleButton() {
    // To make sure button doesnt click when space bar is bressed
    if(!hasStartedRef.current) {
      if(words !== "") {
        props.handleClick(words)
        refSetHadStarted(true)
      }
      else {
        alert("Number of word must be a integer")
        setWords(5)
      }
      console.log("button Clicked")
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
      <div className="timer">{timer}</div>
      <div>
      </div>
    </Stack>
  </Box>
  )
}