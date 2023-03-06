import React, {useState, useEffect} from "react";
import { Grid, Box } from "@mui/material";

export default function TypeToggle(props) {
  const colorCode = {
    set: '#52af77',
    unset: 'rgba(191, 191, 191, 0.1)'
  }
  const [currStyle, setCurrStyle] = useState([colorCode.unset, colorCode.set])

  // Inital color of the toggle
  // useEffect(()=>{
  //   if(props.genType === "sentances") {
  //     setCurrStyle([colorCode.unset, colorCode.set])
  //   }
  //   else {
  //     setCurrStyle([colorCode.set, colorCode.unset])
  //   }
  // },[])

  function handleClick(genType) {
    console.log("toggle clicked ", genType)
    props.setGenType(genType)
    if(genType === "RS") {
      setCurrStyle([colorCode.unset, colorCode.set])
    }
    else {
      setCurrStyle([colorCode.set, colorCode.unset])
    }
  }

  return(
    <Box
      display="flex"
      justifyContent="center"
      style={{marginTop:'1vh', width:300}}
      >
      <Grid container direction="row" spacing={1} style={{textAlign:'center', maxWidth:"80%"}}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <div className="toggleDiv" onClick={()=>{handleClick("RW")}} style={{backgroundColor:currStyle[0]}}>Random Words</div>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <div className="toggleDiv" onClick={()=>{handleClick("RS")}} style={{backgroundColor:currStyle[1]}}>Real Sentances</div>
        </Grid>
      </Grid>
  </Box>
  )
}
