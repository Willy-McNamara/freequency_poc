import React from "react";
import {useState,useEffect} from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import Upload from './components/Upload.jsx';
import Practice from './components/Practice.jsx';
import Navbar from './components/Navbar.jsx'
import SongList from './components/SongList.jsx';

const root = createRoot(document.getElementById("root"));

const App = () => {
  /* ======== ======== ======== STATE ======== ======== ======== */
  // State needed: array of chunk objects for current song
  let [songChunks, setSongChunks] = useState('init') // a change to this will trigger rerender
  let [view, setView] = useState('home')
  let [currentSong, setCurrentSong] = useState('init')

  /* ======== ======== ======== EFFECTS ======== ======== ======== */
  useEffect(() => {
    if (songChunks !== 'init') {
      document.getElementById(view).classList.toggle("active")
      document.getElementById('practice').classList.toggle("active")
      setView('practice')
    }
  }, [songChunks])

  /* ======== ======== ======== HANDLERS ======== ======== ======== */
  let getChunksBySongName = (songName) => { // chunkCompletionHandler
    console.log('logging songName in getChunksBySongName', songName)
    axios.get(`http://localhost:3055/chunks/${songName}`)
    .then((res) => {
      console.log('res from server in Song.jsx', res.data)
      setSongChunks(res.data)
    })
    .catch((err) => {
      console.log('err in get request Song.jsx', err)
    })
  }
  let navHandler = (clicked) => {
    document.getElementById(view).classList.toggle("active")
    document.getElementById(clicked).classList.toggle("active")
    setView(clicked)
  }

  /* ======== ======== ======== COMPONENTS TO RENDER ======== ======== ======== */
  if (view === 'home') {
    return(
        <div className="welcomeGrid">
          < Navbar navHandler={navHandler} view={view}/>
          <div className="Container welcomeContainer">
          < h1 > Welcome! </h1>
          <h4 className="welcome"> This is an app designed to help with learning music by ear. </h4>
          <h5 className="welcome"> View "chunks" of songs from your gallery by clicking the titles below, or visit 'Add Song' to chunk your own! </h5>
          < SongList getChunksBySongName={getChunksBySongName}/>
          </div>
        </div>
    )
  } else if (view === 'addSong') {
    return (
      <div>
        < Navbar navHandler={navHandler} view={view}/>
        <h2 id="title">Upload an .mp3 and git' to chunkin'</h2>
        < Upload getChunksBySongName={getChunksBySongName}/>
      </div>
    )
  } else if (view === 'practice') {
    if (songChunks === 'init') { // if user goes to practice without selecting a song, generate song list
      return(
        <div className="Container">
          < Navbar navHandler={navHandler} view={view}/>
          <h2 className="center">Select a song to git goin'!</h2>
          < SongList getChunksBySongName={getChunksBySongName}/>
        </div>
      )
    } else {
        return (
          <div id="practiceGrid">
            < Navbar navHandler={navHandler} view={view}/>
            < Practice songChunks={songChunks}/>
          </div>
        )
     }
  } else { return <h1> ERROR ! </h1>}
}

root.render(<App />);