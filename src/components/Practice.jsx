import React from "react";

/*
==== Description ====
This component will house the song (and it's chunks) currently being worked on!
*/

const Practice = ({songChunks}) => {

  console.log('logging songChunks in Practice.jsx', songChunks)
  return (
    <div>
      <audio
      controls
      src="http://localhost:3055/upload/chunkNumberOne">
     </audio>
    </div>
  )
}


export default Practice