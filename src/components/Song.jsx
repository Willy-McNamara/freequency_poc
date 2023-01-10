import React from "react";

/*
==== Description ====
This component will house the song (and it's chunks) currently being worked on!
*/

const Song = ({song}) => {

  return (
    <div>
      {song.songName}
      {song.dateAdded}
    </div>
  )
}


export default Song