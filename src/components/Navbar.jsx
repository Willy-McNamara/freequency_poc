import React from "react";

const Navbar = ({navHandler, view}) => {

  let clickHandler = (e) => {
    e.preventDefault()
    // untoggle the active class from current view element, and toggle it on target
    document.getElementById(view).classList.toggle("active")
    document.getElementById(e.target.id).classList.toggle("active")
    // call handler to set the new view
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


