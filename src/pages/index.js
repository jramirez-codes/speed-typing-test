import React,{useState} from "react";
import Controls from "./components/controls";
import Display from "./components/display";
import Results from "./components/results";
import { motion } from "framer-motion";
import './global.css'

async function generateRandString(numbWords) {
  var newData = await fetch('https://random-word-api.herokuapp.com/word?number='+numbWords)
    .then(response => response.json())
  newData = newData.join(" ")
  return newData
}

export default function IndexPage() {
  const [mainString, setMainString] = useState("This is the test string")
  const [start, setStart] = useState(false)
  const [finish, setFinish] = useState(false)
  const [data, setData] = useState([])
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
  }

  async function handleClick(words) {
    // Generate Random string
    var strTest = await generateRandString(words)
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
      <h1>Speed Typing Test</h1>
      <Controls handleClick={handleClick} hadEnded={finish} start={startTime}/>
      {start?(
        <Display answerKey={data} handleFinish={(e)=>{handleFinish(e)}}/>
      ):(
        <></>
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
  )
}