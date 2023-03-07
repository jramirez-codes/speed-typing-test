import React,{useState} from "react";
import Controls from "./components/controls";
import Display from "./components/display";
import Results from "./components/results";
import UserHelp from "./components/userHelp";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import senData from '../assets/sentances.json'
import './global.css'

async function generateRandString(numbWords, genType) {
  // vars
  var newData

  if(genType === "RW") {
    // Random words
    newData = await fetch('https://random-word-api.herokuapp.com/word?number='+numbWords)
      .then(response => response.json())
    newData = newData.join(" ")
  }
  else {
      // Sentances
      var senArr = senData.data.split("\n")
    
      // Get Random Sentances
      var currWords = []
      var indexSet = new Set()
      var wordArr = ""
      var randIndex = 0
      var count = 0
      while(currWords.length < numbWords) {
        randIndex = Math.floor(Math.random() * senArr.length);
        if(!indexSet.has(randIndex)) {
          // Get random sentance from arr
          wordArr = senArr[randIndex]
          wordArr = wordArr.split(" ")
          indexSet.add(randIndex)
      
          // Add to word list
          if((currWords.length + wordArr.length) <= numbWords) {
            currWords = currWords.concat(wordArr)
          }
          else {
            count = 0
            while(currWords.length < numbWords) {
              currWords.push(wordArr[count])
              count += 1
            }
          }
        } 
      }
      newData = currWords.join(" ")
  }

  return newData
}

export default function IndexPage() {
  // State variables
  const [start, setStart] = useState(false)
  const [finish, setFinish] = useState(false)
  const [results, setResults] = useState(false)

  // Inputs String / Data
  const [mainString, setMainString] = useState("This is the test string")
  const [data, setData] = useState([])

  // User results
  const [startTime, setStartTime] = useState(new Date())
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  function handleReset() {
    setStart(false)
    setFinish(false)
    setStartTime(new Date())
  }

  function handleFinish(acc) {
    // End Time
    var endTime = new Date()

    // Calculate words per min
    var typeTime = endTime.getTime() - (startTime + 100)
    var mins = (typeTime / 1000) / 60
    var wordsPerMin = mainString.split(" ").length / mins

    // Setting varibles
    setWpm(Math.floor(wordsPerMin))
    setFinish(true)
    setAccuracy(acc)
    setResults(true)
  }

  async function handleClick(words, genType) {
    // Generate Random string
    var strTest = await generateRandString(words, genType)
    var strArray = strTest.split("")
    
    // Initalize Start
    setData(strArray)
    setMainString(strArray.join(""))
    setStart(true)

    // Start Timer
    var now = new Date()
    setStartTime(now.getTime())
  }

  return(
    <div className="mainPage">
      <div className="myTitle">
        <h1 style={{marginTop:0, textAlign: 'left', marginBottom:0, marginLeft:'1vw'}}>Speed Typing Test</h1>
      </div>
      <Grid container spacing={0} style={{}}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <div className="controls">
            <Controls 
            handleClick={handleClick} 
            hadEnded={finish} 
            hasStarted={start} 
            start={startTime}
            handleReset={handleReset}/>
          </div>
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <div className="sizer">
            {start?(
            <Display answerKey={data} handleFinish={(e)=>{handleFinish(e)}}/>
            ):(
              <UserHelp/>
            )}
            {finish?(
              <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                default: {
                  duration: 0.1,
                  ease: [0, 0.71, 0.2, 1.01]
                },
                scale: {
                  type: "linear",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}
              >
                <Results wpm={wpm} accuracy={accuracy}/>
                <button style={{marginTop:'2vh'}} onClick={()=>{handleReset()}}>Reset</button>
              </motion.div>
            ):(
              <></>
            )}
          </div>
        </Grid>
      </Grid>
      {results?(
        // <Results/>
        // Should be Leader rankings
        <></>
      ):(
        <></>
      )}
    </div>
  )
}