import React from "react";
import {useState,useEffect} from "react";

/*
==== Description ====
using the songChunks array of objects, this component will rcreate the 'Chunks' components, and render one of them at a time
these chunks will grab the audio being hosted
*/

const Practice = ({songChunks}) => {
  let [index, setIndex] = useState(0)

  console.log('logging songChunks in Practice.jsx', songChunks)
  // using the songChunks array of objects, render 'Chunks'
  return (
    <div>
      <audio
      controls
      src={`http://localhost:3055/chunk/${songChunks[index].chunkPath}`}>
     </audio>
    </div>
  )
}


export default Practice