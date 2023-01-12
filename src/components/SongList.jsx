import React from "react";
import {useState, useEffect} from "react";
import axios from "axios"
import Song from "./Song.jsx"

/*
==== Description ====
This component will show the songs available to a user!
*/

const SongList = ({songChunks, getChunksBySongName}) => {
  let [list, setList] = useState('init')

  useEffect(() => {
    // on render (and when songChunks.chunkParent doesnt exist in list), make an axios call to get the list of current songs from the server/db
    if (list === 'init') {
      axios.get('http://localhost:3055/songs')
      .then((res) => {
        // console.log('res.data from server for songs request', res.data)
        let keyIndex = -1;
        let songs = res.data.map((song, index) => {
          return (< Song song={song} key={keyIndex++} getChunksBySongName={getChunksBySongName}/>)
        })
        setList(songs)
      })
      .catch((err) => {
        console.log('err with get songs call', err)
      })
    } else if (!list[songChunks.chunkParent]) {
      // add the newest song
      axios.get('http://localhost:3055/songs')
      .then((res) => {
        // console.log('res.data from server for songs request', res.data)
        let newSong = res.data[list.lenght]
        setList([...list, < Song song={newSong} key={list.length}/>])
      })
      .catch((err) => {
        console.log('err with get songs call', err)
      })
    }
  }, [])

  // console.log('logging list in SongList.jsx', list)
  if (list === "init") {
    return (
      <div>
        No songs added yet!
      </div>
    )
  } else {
    return (
      <div className="Container" id="songGallery">
        <img className="galleryImage" src="galleryv3.png"></img>
        {list}
      </div>
    )
  }
}


export default SongList