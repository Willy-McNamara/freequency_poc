import React from "react";
import {useState,useEffect,useRef} from "react";
import axios from "axios";

/*
==== Description ====
*/

const LogEntry = ({entry, index}) => {

  // generate background color based on index
  let list = `Container logEntry n${(index % 3) + 1}`

  return (
    <div className={list}>
      <h6>{entry.date}</h6>
      <h6 className="logInfo">You practiced for {entry.duration} minutes</h6>
      <h6 className="logInfo">{entry.notes}</h6>
    </div>
  )
}


export default LogEntry