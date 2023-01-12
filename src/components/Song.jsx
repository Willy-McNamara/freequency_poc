import React from "react";

/*
==== Description ====
This component will house the song (and it's chunks) currently being worked on!
*/

const Song = ({song, getChunksBySongName}) => {

  let clickHandler = (e) => {
    e.preventDefault()
    getChunksBySongName(e.target.id)
  }

  return (
    <div className="song">
      <h3 id={song.songName} className="songName" onClick={clickHandler}>{song.songName}</h3>
      <h6>Added on {song.dateAdded}</h6>
    </div>
  )
}


export default Song