import React from "react";
import ChunkThumbnail from "./ChunkThumbnail.jsx"
import {useState,useEffect,useRef} from "react";
import axios from "axios";
import LogEntry from "./LogEntry.jsx"

/*
==== Description ====
using the songChunks array of objects, this component will rcreate the 'Chunks' components, and render one of them at a time
these chunks will grab the audio being hosted
*/

const PracticeLog = ({songName, updatePracticeLog}) => {
  let [practiceLog, setPracticeLog] = useState('N/A')
  let [accordian, setAccordian] = useState(false);
  let [entries, setEntries] = useState('init')

  useEffect(() => {
    // on render and when sessionInfo updates, grab sessionHistory from server
    axios.get(`http://localhost:3055/practiceLog/${songName}`)
    .then((res) => {
      console.log('logging res from get practiceLog', res.data)
      setPracticeLog(res.data.practiceLog)
    })
    .catch((err) => {console.log('error getting practice Log', err)})
  }, [updatePracticeLog])

  let handleClick = (e) => {
    e.preventDefault()
    setAccordian(!accordian)
  }

  useEffect(() => {
    // create logEntries
    //
    if (practiceLog !== 'N/A') {
      let entries = practiceLog.log.map((entry, index) => {
        return(< LogEntry entry={entry} key={entry.id} index={index}/>)
      }).reverse()
      setEntries(entries)
    }
  }, [practiceLog])

  // using the songChunks array of objects, render 'Chunks'
  if (practiceLog === 'N/A') {
    return(
      <div>
        no log entries
      </div>
    )
  } else {
    console.log('logging practiceLog in PracticeLog', practiceLog)
    return (
      <div className="Container accordianContainer" id="sessionInfo" onClick={handleClick}>
        <div id="floatContainer">
          <h3 className="accordianTitle">Practice Log</h3>
          <div className="arrowContainer">
            <img src="arrow.png" className="arrow"></img>
          </div>
          <h6 className="floatingInstructions">( click to expand! )</h6>
        </div>
        {accordian &&
        <div className="Container accordianContainer">
          <div className="accordianContent">
            {practiceLog.totalPracticeTime} minutes practiced across {practiceLog.log.length} sessions!
          </div>
          {entries}
        </div>}
      </div>
    )
  }
}


export default PracticeLog