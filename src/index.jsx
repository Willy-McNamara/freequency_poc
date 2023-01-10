import React from "react";
import {useState,useEffect} from "react";
import { createRoot } from "react-dom/client";
import Upload from './components/Upload.jsx';
import Manage from './components/Manage.jsx';

const root = createRoot(document.getElementById("root"));

const App = () => {
  let [chunkingComplete, setChunkingComplete] = useState([false])

  let chunkCompletionHandler = (blob) => {
    setChunkingComplete([true, blob])
  }
  if (!chunkingComplete[0]) {
    return (
      <div>
        <h1 id="title">Freequency App</h1>
        < Upload chunkCompletionHandler={chunkCompletionHandler}/>
      </div>
    )
  } else {
    return (
      <div>
        <h1 id="title">Manager sections</h1>
        < Manage blob={chunkingComplete[1]}/>
      </div>
    )
  }
}

root.render(<App />);