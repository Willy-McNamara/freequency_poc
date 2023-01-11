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
    <div id={song.songName} className="song" onClick={clickHandler}>
      <h4 id={song.songName} className="songName">{song.songName}</h4>
      <h6 id={song.songName}>Added on {song.dateAdded}</h6>
    </div>
  )
}


export default Song