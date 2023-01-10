import React from 'react'
import {useState,useEffect,useRef} from 'react'

/*
Plan:
*/

const FormData = ({createChunkObj}) => {
  let chunkName = useRef('')
  let chunkNotes = useRef('')
  let chunkStart = useRef(0)
  let chunkEnd = useRef(0)

  let handleSubmit = (e) => {
    // creates an object to store
    e.preventDefault()
    console.log('logging createChunkObj in handleSubmit FormData: ', createChunkObj)
    createChunkObj({
      chunkName: chunkName.current.value,
      chunkNotes: chunkNotes.current.value,
      chunkStart: chunkStart.current.value,
      chunkEnd: chunkEnd.current.value
    })
  }

  return (
    <div className="Container" >
      <label>
          Name this chunk:
          <input type="text" ref={chunkName} />
      </label>
      <label>
          Add any notes you'd like about this chunk:
          <input type="text" ref={chunkNotes} />
      </label>
      <label>
          Starting time (in seconds):
          <input type="text" ref={chunkStart} />
      </label>
      <label>
          Ending time (in seconds):
          <input type="text" ref={chunkEnd} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit this chunk</button>
    </div>
  )
}


export default FormData