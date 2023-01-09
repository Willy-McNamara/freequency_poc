import React from 'react'
import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import Playback from './Playback.jsx'
/*
Plan:
*/

const Upload = () => {
  let [mp3, setMP3] = useState(true) // setting to true for dev to skip mp3 submit


  let handleChange = (event) => {
    setMP3(event.target.files[0])
    console.log('mp3 state set with the following: ', event.target.files[0])
  }

  let submitEvent = (event) => {
    event.preventDefault();
    console.log('form submit triggered, here is event.target: ', event.target)
    console.log('form submit triggered, here is titleRef.current.value', titleRef.current.value)
  }

  let submitChunks = (chunkData) => {
    // takes array of chunkData
    console.log('logging chunkData in submitChunks handler', chunkData)
  }

  if (!mp3) {
    return(
      <div id="uploadContainer" className="Container" >
        <label htmlFor="upload" className="center">Upload your .mp3 here!</label>
        <input id="new.mp3" className="center" type="file" name="mp3" accept=".mp3" onChange={handleChange}/>
        <input type="submit" value="Submit" />
      </div>
    )
  } else {
    return (
      <div>
        < Playback mp3={mp3} submitChunks={submitChunks}/>
      </div>
    )
  }
}


export default Upload

/*
<div id="uploadContainer" className="Container" >
      <label htmlFor="upload" className="center">Upload your .mp3 here!</label>
      <input id="new.mp3" className="center" type="file" name="mp3" accept=".mp3" onChange={handleUpload}/>
    </div>
*/


// let handleUpload = (event) => {
  //   console.log('file to be appended', event.target.files[0], 'testing typeof', typeof event.target.files[0])
  //   //setAudioFile(event.target.value)
  //   var formData = new FormData();
  //   formData.append("mp3", event.target.files[0], event.target.files[0].name);
  //   axios.post('http://localhost:3055/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
  //   .then((res) => {
  //     console.log('response from server on upload post', res)
  //   })
  //   .catch((err) => {
  //     console.log('error on upload, here is err: ', err)
  //   })
  // }


  /*
      <form onSubmit={submitEvent} id="uploadContainer" className="Container">
        <label>
          Title:
          <input type="text" ref={titleRef} />
        </label>
        <label htmlFor="upload" className="center">Upload your .mp3 here!</label>
        <input id="new.mp3" className="center" type="file" name="mp3" accept=".mp3" onChange={handleChange}/>
        <input type="submit" value="Submit" />
      </form>
  */