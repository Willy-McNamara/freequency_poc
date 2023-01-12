import React from "react";
import ChunkThumbnail from "./ChunkThumbnail.jsx"
import PracticeLog from "./PracticeLog.jsx"
import {useState,useEffect,useRef} from "react";
import axios from "axios";
import {AccordianBody} from './styled.js';
import Record from './Record.jsx';
import {RecordingBoothBtn} from './styled.js'

/*
==== Description ====
using the songChunks array of objects, this component will rcreate the 'Chunks' components, and render one of them at a time
these chunks will grab the audio being hosted
*/

const Practice = ({songChunks}) => {
  let [index, setIndex] = useState(0)
  let [updatePracticeLog, setUpdatePracticeLog] = useState(0)
  let [recording, setRecording] = useState(false)
  let sessionInfo = useRef('')
  let duration = useRef(0)

  let chunkSelectHandler = (i) => {
    setIndex(i)
  }

  let chunkThumbnails = songChunks.map((chunk, index) => {
    return(
      < ChunkThumbnail chunk={chunk} chunkSelectHandler={chunkSelectHandler} i={index}/>
    )
  })

  let submitSessionHandler = (e) => {
    e.preventDefault();
    console.log(sessionInfo.current.value)
    // make axios post
    axios.post('http://localhost:3055/notes', {
      songName: songChunks[0].chunkParent,
      songNotes: sessionInfo.current.value,
      duration: duration.current.value
    })
    .then((res) => {
      console.log('res from songNotes post :', res.data)
      setUpdatePracticeLog(Math.random())
    })
    .catch((err) => {
      console.log('err posting notes :', err)
    })
    document.getElementById("sessionNotes").value = ""
    document.getElementById("sessionDuration").value = ""
  }

  let recClickHandler = (e) => {
    if (e) {e.preventDefault()}
    setRecording(!recording)
  }

  // using the songChunks array of objects, render 'Chunks'
  return (
    <div id="practiceContainer">
      <div className="Container">
        <h1>{songChunks[0].chunkParent.split('.')[0]}</h1>
        <div>
          < PracticeLog songName={songChunks[0].chunkParent} updatePracticeLog={updatePracticeLog}/>
        </div>
        <h3 id="chunkTitle">{songChunks[index].chunkName}</h3>
        <h5>{songChunks[index].chunkNotes}</h5>
        <audio
        controls
        loop
        src={`http://localhost:3055/chunk/${songChunks[index].chunkPath}`}
        className="audioPlayer">
      </audio>
      <div className="Container sessionInfo">
        <h3 id="seshInfo">Session Info</h3>
        <h5>Log info about your practice session, and optionally record a take!</h5>
        <RecordingBoothBtn recording={!recording} onClick={recClickHandler}>
        {!recording === true ? "record a take" : "no wait go back"}</RecordingBoothBtn>
          < AccordianBody accordian={recording}>
            < Record songName={songChunks[0].chunkParent} recClickHandler={recClickHandler}></Record>
          </AccordianBody>
          <textarea id="sessionNotes" name="sessionNotes" rows="4" cols="50" placeholder="Here is how my practice session went..." ref={sessionInfo}></textarea>
          <input id="sessionDuration" className="textInput" type="text" ref={duration} placeholder="How many minutes did you practice?"/>
          <button onClick={submitSessionHandler}> submit session </button>
      </div>
      <div className="Container chunksContainer">
          <h4 id="otherChunks">Your other chunks from {songChunks[0].chunkParent}</h4>
          <div className="HorizontalContainer">
          {chunkThumbnails}
          </div>
      </div>
      </div>
    </div>
  )
}


export default Practice

/*
IDEA FOR RECORDING

'record a take'!
is an href , or there is a button right next to it, which triggers a modal

model background color is grey with very low opacity

in the middle there is a microphone icon you can click to begin recording

when done recording, hit a submit button which closes the modal and attaches it to the dom.
*/
