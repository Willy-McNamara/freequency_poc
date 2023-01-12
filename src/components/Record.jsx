import React from "react";
import {useEffect, useState} from 'react';
import axios from 'axios';

/*
==== Description ====
This component will record audio from the user.
*/

const Record = ({songName, recClickHandler}) => {

  // let clickHandler = (e) => {
  //   e.preventDefault()
  //   getChunksBySongName(e.target.id)
  // }

  const [recAttempt, setRecAttempt] = useState(null)
  const [recAttemptTitle , setRecAttemptTitle] = useState(null)

  var recorder, gumStream;
  useEffect(() => {
    var recordButton = document.getElementById("recordButton");
    recordButton.addEventListener("click", toggleRecording);
  }, [])

  let toggleRecording = () => {
      if (recorder && recorder.state == "recording") {
          recorder.stop();
          gumStream.getAudioTracks()[0].stop();
      } else {
          navigator.mediaDevices.getUserMedia({
              audio: true
          }).then(function(stream) {
              gumStream = stream;
              recorder = new MediaRecorder(stream);
              var dateObj = new Date();
              var month = dateObj.getUTCMonth() + 1; //months from 1-12
              var day = dateObj.getUTCDate();
              var year = dateObj.getUTCFullYear();
              let date = year + "-" + month + "-" + day
              let recTitle = songName.split('.')[0] + date + '.ogg'
              setRecAttemptTitle(recTitle)
              console.log(recTitle)
              recorder.ondataavailable = function(e) {
                  console.log('logging e.data from ondataavailable', e.data)
                  var formData = new FormData();
                  formData.append("audio_data", e.data, recTitle);
                  console.log('logging formData', formData)
                  var url = URL.createObjectURL(e.data);
                  var preview = document.createElement('audio');
                  preview.className = "recordingAttempt"
                  preview.controls = true;
                  preview.src = url;
                  document.getElementById("recordSection").appendChild(preview);
                  setRecAttempt(formData)
              };
              recorder.start();
          });
      }
  }

  let sendHandler = (e) => {
    e.preventDefault()
    //axios call to save recording
    console.log('logging recAttempt and .files', recAttempt)
    axios.post(`http://localhost:3055/recording/${songName}`, recAttempt, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((res) => {
      console.log('response from server', res)
      // send request to add to db
      return axios.post('http://localhost:3055/addRecToDB', {title: recAttemptTitle, songName: songName})
    })
    .then((res) => {
      // successfully added route to db, now hide the recording accordian
      recClickHandler()
    })
    .catch((err) => {
      console.log('error posting recording, here is error', err)
    })
  }

  let toggleMic = (e) => {
    e.preventDefault()
    document.getElementById("recordButton").classList.toggle("recOn")
  }

  return (
    <div id="recordSection" className="Container">
      <h6> ( tap the mic to stop and start recording! ) </h6>
      <img id="recordButton" src="microphone.png" onClick={toggleMic}></img>
      <button id="submitRecord" onClick={sendHandler}> send it! </button>
    </div>
  )
}


export default Record