import React from "react";

const Navbar = ({navHandler, view}) => {

  let clickHandler = (e) => {
    e.preventDefault()
    navHandler(e.target.id)
  }
  return (
    <div className="topnav">
      <a id="home" className="active" onClick={clickHandler}>Home</a>
      <a id="addSong" onClick={clickHandler}>Add Song</a>
      <a id="practice" onClick={clickHandler}>Practice</a>
    </div>
  )
}


export default Navbar


