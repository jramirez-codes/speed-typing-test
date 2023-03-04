import React,{useState} from "react";
import Controls from "./components/controls";
import Display from "./components/display";
import Results from "./components/results";
import { motion } from "framer-motion";
import './global.css'

export default function IndexPage() {
  const [mainString, setMainString] = useState("This is the test string")
  const [start, setStart] = useState(false)
  const [finish, setFinish] = useState(false)
  const [data, setData] = useState([])
  const [startTime, setStartTime] = useState(new Date())
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  function handleFinish(acc) {
    // End Time
    var endTime = new Date()

    // Calculate words per min
    var typeTime = endTime.getTime()- startTime.getTime()
    var mins = (typeTime / 50) / 60
    var wordsPerMin = mainString.split(" ").length / mins
    console.log(typeTime / 50)

    // Setting varibles
    setWpm(Math.floor(wordsPerMin))
    setFinish(true)
    setAccuracy(acc)
  }

  function handleClick() {
    // Pick an random string
    var strTest = "This is the test string, I hope this works"
    var strArray = strTest.split("")
    
    // Configure string data
    var strData = []
    strArray.forEach(e =>{
      strData.push(e)
    })
    
    // Initalize Start
    setData(strData)
    setMainString(strTest)
    setStart(true)

    // Start Timer
    setStartTime(new Date())
  }

  return(
    <div className="mainPage">
      <h1>Speed Typing Test</h1>
      <Controls handleClick={handleClick}/>
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
        </motion.div>
      ):(
        <></>
      )}
    </div>
  )
}