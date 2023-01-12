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

  // using the songChunks array of objects, render 'Chunks'
  return (
    <div onClick={handleClick} id={"" + i} className="otherChunk">
      <img src="notes.png"></img>
      {chunk.chunkName}
    </div>
  )
}


export default ChunkThumbnail

// This is first A section from JC's opening solo over the head. This song moves so fast, gotta take it bit by bit! Hopefully this demonstrates why I built this app :) Solo1.A1

//The intro to John Coltrane's "Giant Steps", titled for the leaps taken in the changes around the circle of 5ths.