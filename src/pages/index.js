import React,{useState} from "react";
import Controls from "./components/controls";
import Display from "./components/display";
import Results from "./components/results";
import './global.css'

export default function IndexPage() {
  const [mainString, setMainString] = ("This is the test string")
  const [start, setStart] = useState(false)
  const [finish, setFinish] = useState(false)
  const [data, setData] = useState([])
  const [startTime, setStartTime] = useState(new Date())
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  function handleFinish(acc) {
    setFinish(true)
    setAccuracy(acc)

    // Calculate words per min
    var typeTime = new Date() - startTime
    var mins = (typeTime / 1000) / 60
    var wordsPerMin = mainString.split(" ").length / mins
    setWpm(Math.floor(wordsPerMin))
  }

  function handleClick() {
    // Pick an random string
    var str = "This is the test string"
    var strArray = str.split("")

    // Configure string data
    var strData = []
    strArray.forEach(e =>{
      strData.push(e)
    })

    // Initalize Start
    setData(strData)
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
        <Results wpm={wpm} accuracy={accuracy}/>
      ):(
        <></>
      )}
    </div>
  )
}