import React from "react";
import ChunkThumbnail from "./ChunkThumbnail.jsx"
import {useState,useEffect} from "react";

/*
==== Description ====
using the songChunks array of objects, this component will rcreate the 'Chunks' components, and render one of them at a time
these chunks will grab the audio being hosted
*/

const Practice = ({songChunks}) => {
  let [index, setIndex] = useState(0)

  let chunkSelectHandler = (i) => {
    setIndex(i)
  }

  let chunkThumbnails = songChunks.map((chunk, index) => {
    return(
      < ChunkThumbnail chunk={chunk} chunkSelectHandler={chunkSelectHandler} i={index}/>
    )
  })

  console.log('logging songChunks in Practice.jsx', songChunks)
  // using the songChunks array of objects, render 'Chunks'
  return (
    <div className="Container">
      <h2>{songChunks[index].chunkParent}</h2>
      <h3>{songChunks[index].chunkName}</h3>
      <h5>{songChunks[index].chunkNotes}</h5>
      <audio
      controls
      loop
      src={`http://localhost:3055/chunk/${songChunks[index].chunkPath}`}
      className="audioPlayer">
     </audio>
     <div>
        OTHER CHUNKS:
        {chunkThumbnails}
     </div>
    </div>
  )
}


export default Practice