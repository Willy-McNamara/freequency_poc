import React from "react";
import {useState,useEffect} from "react";

/*
==== Description ====
These little thumbnails will display the various chunks available for a given song
*/

const ChunkThumbnail = ({chunk, chunkSelectHandler, i}) => {

  let handleClick = (e) => {
    e.preventDefault()
    chunkSelectHandler(Number(e.target.id))
  }

  console.log('logging chunk in ChunkThumbnail.jsx', chunk)
  // using the songChunks array of objects, render 'Chunks'
  return (
    <div onClick={handleClick} id={"" + i}>
      <img src="notes.png"></img>
      {chunk.chunkName}
    </div>
  )
}


export default ChunkThumbnail