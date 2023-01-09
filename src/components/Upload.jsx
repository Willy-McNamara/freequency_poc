import React from 'react'
import axios from 'axios'
/*
Plan:
*/

const Upload = () => {

  let handleUpload = (event) => {
    console.log('file to be appended', event.target.files[0], 'testing typeof', typeof event.target.files[0])
    //setAudioFile(event.target.value)
    var formData = new FormData();
    formData.append("mp3", event.target.files[0], event.target.files[0].name);
    axios.post('http://localhost:3055/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((res) => {
      console.log('response from server on upload post', res)
    })
    .catch((err) => {
      console.log('error on upload, here is err: ', err)
    })
  }

  return (
    <div id="uploadContainer" className="Container" >
    <label htmlFor="upload" className="center">Upload your .mp3 here!</label>
    <input id="new.mp3" className="center" type="file" name="mp3" accept=".mp3" onChange={handleUpload}/>
  </div>
  )
}

export default Upload