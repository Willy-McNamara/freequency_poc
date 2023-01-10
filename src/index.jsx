import React from "react";
import {useState,useEffect} from "react";
import { createRoot } from "react-dom/client";
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
  let chunkCompletionHandler = (chunkData) => {
    setSongChunks(chunkData)
  }
  let navHandler = (clicked) => {
    document.getElementById(view).classList.toggle("active")
    document.getElementById(clicked).classList.toggle("active")
    setView(clicked)
  }

  /* ======== ======== ======== COMPONENTS TO RENDER ======== ======== ======== */
  if (view === 'home') {
    return(
      <div>
        < Navbar navHandler={navHandler} view={view}/>
        <h1> HOME PAGE </h1>
        < SongList />
      </div>
    )
  } else if (view === 'addSong') {
    return (
      <div>
        < Navbar navHandler={navHandler} view={view}/>
        <h1 id="title">Freequency App</h1>
        < Upload chunkCompletionHandler={chunkCompletionHandler}/>
      </div>
    )
  } else if (view === 'practice') {
    if (songChunks === 'init') { // if user goes to practice without selecting a song, generate song list
      return(
        <div>
          < Navbar navHandler={navHandler} view={view}/>
          No song selected! Head back home and select a song
          < SongList />
        </div>
      )
    } else {
        return (
          <div>
            < Navbar navHandler={navHandler} view={view}/>
            < Practice songChunks={songChunks}/>
          </div>
        )
     }
  } else { return <h1> ERROR ! </h1>}
}

root.render(<App />);