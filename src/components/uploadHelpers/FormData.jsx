import React from 'react'
import {useState,useEffect,useRef} from 'react'

/*
Plan:
*/

const FormData = ({createChunkObj, removeChunk, newObjs}) => {
  let chunkName = useRef('')
  let chunkNotes = useRef('')
  let chunkStart = useRef(0)
  let chunkEnd = useRef(0)

  let handleSubmit = (e) => {
    // creates an object to store
    e.preventDefault()
    createChunkObj({
      chunkName: chunkName.current.value,
      chunkNotes: chunkNotes.current.value,
      chunkStart: chunkStart.current.value,
      chunkEnd: chunkEnd.current.value
    }, newObjs)
    document.getElementById("chunkForm1").value = ""
    document.getElementById("chunkForm2").value = ""
    document.getElementById("chunkForm3").value = ""
    document.getElementById("chunkForm4").value = ""
  }

  return (
    <div className="Container">
      <label className="formElement">
          {"Name this here chunk:  "}
          <input className="textInput" type="text" ref={chunkName} id="chunkForm1"/>
      </label>
      <label className="formElement" >
          {"Describe this here chunk:  "}
          <input className="textInput" type="text" ref={chunkNotes} id="chunkForm2"/>
      </label>
      <label className="formElement" >
          {"Starting time (in seconds):  "}
          <input className="textInput" type="text" ref={chunkStart} id="chunkForm3"/>
      </label>
      <label className="formElement" >
          {"Ending time (in seconds):  "}
          <input className="textInput" type="text" ref={chunkEnd} id="chunkForm4"/>
      </label>
      <div className="HorizontalContainer">
        <button type="button" onClick={handleSubmit}> submit this chunk </button>
        <button type="button" onClick={removeChunk}> undo chunk submit </button>
      </div>
    </div>
  )
}


export default FormData