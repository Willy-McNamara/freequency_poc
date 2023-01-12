import React from "react";
import {useState, useEffect} from "react";
import axios from "axios"
import Song from "./Song.jsx"
import ViewRecording from "./ViewRecording.jsx"

/*
==== Description ====
This component will show the songs available to a user!
*/

const RecordingsList = ({songName}) => {
  let [list, setList] = useState('init')
  console.log('RecordingsList render')

  useEffect(() => {
    // on render (and when songChunks.chunkParent doesnt exist in list), make an axios call to get the list of current recordings from the server/db
    if (list === 'init') {
      console.log('USE EFFECT TRIGGERED')
      axios.get(`http://localhost:3055/recordingsBySongName/${songName}`)
      .then((res) => {
        console.log('res.data from server for recording names request', res.data)
        let keyIndex = -1;
        let recordings = res.data.map((recording, index) => {
          return (< ViewRecording song={songName} key={keyIndex++} path={recording.title}/>)
        })
        setList(recordings.reverse())
      })
      .catch((err) => {
        console.log('err with get songs call', err)
      })
    }
    // else if (!list[songChunks.chunkParent]) {
    //   // add the newest song
    //   axios.get('http://localhost:3055/songs')
    //   .then((res) => {
    //     // console.log('res.data from server for songs request', res.data)
    //     let newSong = res.data[list.lenght]
    //     setList([< Song song={newSong} key={list.length}/>, ...list])
    //   })
    //   .catch((err) => {
    //     console.log('err with get songs call', err)
    //   })
    // }
  }, [])

  // console.log('logging list in SongList.jsx', list)
  if (list === "init") {
    return
  } else {
    return (
      <div className="Container" id="recordingGallery">
          {list}
      </div>
    )
  }
}

export default RecordingsList