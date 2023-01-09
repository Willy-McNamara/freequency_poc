import React from 'react'
import {useState,useEffect,useRef} from 'react'
import FormData from './FormData.jsx'

/*
Plan:
*/

const ChunkForm = ({submitChunks}) => {
  // need to put this handler first so I can reference it when creating state
  let createChunkObj = (chunkData) => {
    // adds the form data to a growing array of chunk objects
    setChunkObjs([...chunkObjs, chunkData])
  }

  let [chunks, setChunks] = useState([< FormData createChunkObj={createChunkObj} key={1}/>])
  let [chunkObjs, setChunkObjs] = useState([])

  let addChunk = () => {
    setChunks([...chunks, < FormData createChunkObj={createChunkObj} key={chunks.length + 1}/>])
  }

  let removeChunk = () => {
    // set a limit
    if (chunks.length === 1) {return}
    // filter out the last element added (using filter to avoid mutating state directly!)
    let newChunks = chunks.filter((element, index) => (index !== (chunks.length - 1)))
    setChunks(newChunks)
  }

  let handleSubmitChunks = (e) => {
    e.preventDefault()
    console.log('handle submit triggered')
    submitChunks(chunkObjs)
  }

  return (
    <div className="Container" >
      {chunks}
      <button type="button" onClick={addChunk}>Add a new chunk</button>
      <button type="button" onClick={removeChunk}>Remove most recent chunk</button>
      <button type="button" onClick={handleSubmitChunks}> Done Chunkin' </button>
    </div>
  )
}


export default ChunkForm

/*
<h5> Choose your chunks </h5>
     <label>
          Title:
          <input type="text" ref={titleRef} />
      </label>
      <label>
          Title:
          <input type="text" ref={titleRef} />
      </label>

console.log('logging inside filter, here is index and chunks.length :', index, chunks.length)
      let filterLast = (index !== (chunks.length - 1))
      console.log('logging filterLast', filterLast)

*/