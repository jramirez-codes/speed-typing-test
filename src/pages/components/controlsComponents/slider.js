import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function WordsSlider(props) {
  return (
    <Box sx={{width: 225}}>
      <Slider
        defaultValue={30}
        valueLabelDisplay="auto"
        min={10}
        max={120}
        fullwidth
        color="success"
        onChange={(e)=>{props.setWords(e.target.value)}}
      />
    </Box>
  );
}