import React from 'react'
import {useState,useEffect,useRef} from 'react'
import FormData from './FormData.jsx'

/*
Plan:
*/

const ChunkForm = ({submitChunks, mp3name}) => {
  // need to put this handler first so I can reference it when creating state
  let [chunks, setChunks] = useState('init')
  let [chunkObjs, setChunkObjs] = useState('init')
  let [chunkIndex, setChunkIndex] =useState(0)

  let createChunkObj = (chunkData, newObjs) => {
    // adds the form data to a growing array of chunk objects
    chunkData.chunkParent = mp3name
    console.log('createChunkObj called, here is chunks', chunks)
    console.log('createChunkObj called, here is chunkObjs and chunkObjs', chunkObjs, 'chunkData', chunkData)
    setChunkObjs([...newObjs, chunkData])
    setChunks([< FormData createChunkObj={createChunkObj} newObjs={[...newObjs, chunkData]}removeChunk={removeChunk} key={chunks.length + 1}/>])
    setChunkIndex(chunkIndex + 1)
  }

  let removeChunk = () => {
    // set a limit
    if (chunkObjs.length === 0) {return}
    console.log('logging chunkObjs',chunkObjs)
    chunkObjs.pop()
  }

  let handleSubmitChunks = (e) => {
    e.preventDefault()
    console.log('handle submit triggered, here is chunkObjs')
    submitChunks(chunkObjs)
  }

  useEffect(() => {
     setChunks([< FormData createChunkObj={createChunkObj}removeChunk={removeChunk} newObjs={[]} key={1}/>])
  }, [])

  console.log('chunkForm rerender, here is chunks:', chunks, 'chunkObjs:', chunkObjs, 'and chunkIndex:', chunkIndex)
  // if (chunks.length === 0) {return}
  return (
    <div className="Container" >
      {chunks[0]}
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


chunkEnd
:
"65"
chunkName
:
"Intro.pt2"
chunkNotes
:
"The second part of the intro to Claire de Lune"
chunkParent
:
"ClairdeLune.mp3"
chunkStart
:
"35"
chunkEnd
:
"36"
chunkName
:
"Intro.pt1"
chunkNotes
:
"This is part one of the intro to Claire de Lune!"
chunkParent
:
"ClairdeLune.mp3"
chunkStart
:
"0"

*/