import React from 'react'
import {useState,useEffect,useRef} from 'react'
import FormData from './FormData.jsx'

/*
Plan:
*/

const ChunkForm = ({submitChunks, mp3name}) => {
  // need to put this handler first so I can reference it when creating state
  let createChunkObj = (chunkData) => {
    // adds the form data to a growing array of chunk objects
    chunkData.chunkParent = mp3name
    setChunkObjs([...chunkObjs, chunkData])
    setChunks([...chunks, < FormData createChunkObj={createChunkObj} removeChunk={removeChunk} key={chunks.length + 1}/>])
    setChunkIndex(chunkIndex + 1)
  }
  let [chunks, setChunks] = useState([< FormData createChunkObj={createChunkObj}removeChunk={removeChunk} key={1}/>])
  let [chunkObjs, setChunkObjs] = useState([])
  let [chunkIndex, setChunkIndex] =useState(0)

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
  console.log('chunkForm rerender, here is chunks:', chunks, 'chunkObjs:', chunkObjs, 'and chunkIndex:', chunkIndex)
  return (
    <div className="Container" >
      {chunks[chunkIndex]}
      <button type="button" onClick={handleSubmitChunks}> done chunkin' </button>
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