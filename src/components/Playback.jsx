import React from 'react'
import {useState,useEffect,useRef} from 'react'
import ChunkForm from './ChunkForm.jsx'

/*
Plan:
*/

const Playback = ({mp3, submitChunks}) => {
  let titleRef = useRef('')

  if (!mp3) {return}
  return (
    <div className="Container" >
      <h3> You've selected {mp3.name}</h3>
      <h5> Use the player to determine the time stamps of your chunks! </h5>

     <div>
      ChunkForm
      < ChunkForm submitChunks={submitChunks}/>
     </div>
     <label>
          Title:
          <input type="text" ref={titleRef} />
      </label>
      <label>
          Title:
          <input type="text" ref={titleRef} />
      </label>
    </div>
  )
}


export default Playback

/*
leaving htis here for

<audio
        controls
        src={URL.createObjectURL(mp3)}>
            <a href={URL.createObjectURL(mp3)}>
                Download audio
            </a>
     </audio>
*/

