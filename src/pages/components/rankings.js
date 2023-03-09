import React, {useState, useEffect} from "react";
import {Stack, Grid, Box} from '@mui/material'

export default function Rankings() {
  const [leaderboard, setLeaderboard] = useState([])

  async function handleReqeust() {
    // Get Data from database
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "7DuCUFadEqddM4DXwbAda3Oh2xoUM5waruqFNrO3");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      origin: '*'
    };
    var response = await fetch("https://z8dyscfy05.execute-api.us-east-2.amazonaws.com/default/speed-typing-test", requestOptions)
    var data = await response.json()

    // Sort Data
    var sortedData = await data["Items"].sort((a,b)=> a.id.N - b.id.N)
    setLeaderboard(sortedData)

    // Sort Data
    return data["Items"]
  }

  useEffect(()=>{
    handleReqeust()
  },[])

  return(
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <Box
      display="flex"
      justifyContent="center"
      style={{marginTop:'2vh'}}
      >
        <Stack direction="column" spacing={1}>
          {leaderboard.map((obj, idx)=> {
            return(
              <Stack
              direction="row"
              spacing={1}
              >
                <div className="infoDiv" style={{minWidth:"30px"}}>{"#"+(idx+1)}</div>
                <div className="infoDiv" style={{minWidth:"100px"}}>{obj.playerName.S}</div>
                <div className="infoDiv" style={{minWidth:"75px"}}>{obj.points.N}</div>
                <div className="infoDiv" style={{minWidth:"30px"}}>{obj.wpm.N}</div>
                <div className="infoDiv" style={{minWidth:"45px"}}>{obj.accuracy.N+"%"}</div>
              </Stack>
            )
          })}
        </Stack>
      </Box>
    </div>
  )
}