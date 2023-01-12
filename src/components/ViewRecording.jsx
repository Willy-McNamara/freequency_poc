import React from "react";

/*
==== Description ====
This component will display a recording audio
*/

const ViewRecording = ({song, path}) => {
  console.log('rendering a recroding view')

  let clickHandler = (e) => {
    e.preventDefault()
    getChunksBySongName(e.target.id)
  }

  return (
    <div>
      <h5>{song}</h5>
      <audio
        controls
        loop
        src={`http://localhost:3055/playRecording/${path}`}
        className="audioPlayer"></audio>
    </div>
  )
}


export default ViewRecording