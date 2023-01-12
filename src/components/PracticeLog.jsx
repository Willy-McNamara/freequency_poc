import React from "react";
import ChunkThumbnail from "./ChunkThumbnail.jsx"
import {useState,useEffect,useRef} from "react";
import axios from "axios";
import LogEntry from "./LogEntry.jsx"
import styled from 'styled-components';
import {AccordianBody, ProgressMeter} from './styled.js';
import RecordingsList from './RecordingsList.jsx'

/*
==== Description ====
using the songChunks array of objects, this component will rcreate the 'Chunks' components, and render one of them at a time
these chunks will grab the audio being hosted
*/

const PracticeLog = ({songName, updatePracticeLog}) => {
  let [practiceLog, setPracticeLog] = useState('N/A')
  let [accordian, setAccordian] = useState(false);
  let [entries, setEntries] = useState('init')
  let [nestedAccordian, setNestedAccordian] = useState(false)

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

  let handleNestedClick = (e) => {
    e.preventDefault()
    setNestedAccordian(!nestedAccordian)
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
      <div className="Container accordianContainer" id="sessionInfo">
        <div id="floatContainer" onClick={handleClick}>
          <h3 className="accordianTitle">Practice Log</h3>
          <div className="arrowContainer">
            <img src="arrow.png" className="arrow"></img>
          </div>
          <h6 className="floatingInstructions">( click to expand! )</h6>
        </div>
        < AccordianBody accordian={accordian}>
            <ProgressMeter accordian={accordian}>
              {practiceLog.totalPracticeTime} minutes practiced across {practiceLog.log.length} sessions!
            </ProgressMeter>
            <div className="scrollableDiv">
              {entries}
            </div>
            <h4 onClick={handleNestedClick}>View Recordings</h4>
            <AccordianBody accordian={nestedAccordian}>
             {nestedAccordian && < RecordingsList songName={songName}/>}
            </AccordianBody>
        </AccordianBody>
      </div>
    )
  }
}


export default PracticeLog

// const AccordianBody = styled.div`
//   position: relative;
//   opacity: ${props => props.accordian === true ? "100%" : "0"};
//   max-height: ${props => props.accordian === true ? "40vh" : "0"};
//   overflow: ${props => props.accordian === true ? "auto" : "hidden"};
//   display: flex;
//   flex-direction: column;
//   align-content: center;
//   justify-content: flex-start;
//   transition: max-height 500ms ease-in-out, opacity 700ms ease-in-out, overflow 500ms;
//   align-items: center;
// `

// const ProgressMeter = styled.div`
//   margin-top: 25px;
//   opacity: ${props => props.accordian === true ? "100%" : "0"};
//   transition-property: opacity;
//   transition-duration: 1200ms;
//   transition-timing-function: ease-in;
// `

/*
{accordian &&
        <div className="Container accordianContainer">
*/