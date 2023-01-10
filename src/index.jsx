import React from "react";
import {useState,useEffect} from "react";
import { createRoot } from "react-dom/client";
import Upload from './components/Upload.jsx';
import Manage from './components/Manage.jsx';
import Navbar from './components/Navbar.jsx'

const root = createRoot(document.getElementById("root"));

const App = () => {
  let [chunkingComplete, setChunkingComplete] = useState([false])
  // State needed: array of chunk objects for current song
  let [songChunks, setSongChunks] = useState('init') // a change to this will trigger rerender
  let [view, setView] = useState('home')

  useEffect(() => {
    if (songChunks !== 'init') {
      setView('practice')
    }
  }, [songChunks])

  let chunkCompletionHandler = (blob) => {
    setChunkingComplete([true, blob])
  }

  let navHandler = (clicked) => {
    setView(clicked)
  }

  if (view === 'home') {
    return(
      <div>
        < Navbar navHandler={navHandler} view={view}/>
        <h1> HOME PAGE </h1>
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
    return (
      <div>
        < Navbar navHandler={navHandler} view={view}/>
        <h1 id="title">Manager sections</h1>
        < Manage blob={chunkingComplete[1]}/>
      </div>
    )
  } else { return <h1> ERROR ! </h1>}
}

root.render(<App />);