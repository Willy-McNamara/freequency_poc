import React from 'react'
import {useState,useEffect,useRef} from 'react'

/*
Plan:
*/

const FormData = ({createChunkObj, removeChunk}) => {
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
      <label className="formElement">
          {"Name this here chunk:  "}
          <input className="textInput" type="text" ref={chunkName} />
      </label>
      <label className="formElement">
          {"Describe this here chunk:  "}
          <input className="textInput" type="text" ref={chunkNotes} />
      </label>
      <label className="formElement">
          {"Starting time (in seconds):  "}
          <input className="textInput" type="text" ref={chunkStart} />
      </label>
      <label className="formElement">
          {"Ending time (in seconds):  "}
          <input className="textInput" type="text" ref={chunkEnd} />
      </label>
      <button type="button" onClick={handleSubmit}> submit this chunk </button>
      <button type="button" onClick={removeChunk}> undo chunk submit </button>
    </div>
  )
}


export default FormData