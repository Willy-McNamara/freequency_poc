import React from "react";

const Manage = ({blob}) => {

  console.log('logging blob over in Manage.jsx', blob)
  return (
    <div>
      <audio
      controls
      src="http://localhost:3055/upload/chunkNumberOne">
     </audio>
    </div>
  )
}


export default Manage