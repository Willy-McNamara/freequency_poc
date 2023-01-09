import React from "react";
import { createRoot } from "react-dom/client";
import Upload from './components/Upload.jsx';
const root = createRoot(document.getElementById("root"));

const App = () => {
  return (
    <div>
      <h1>Freequency App</h1>
      < Upload />
    </div>
  )
}

root.render(<App />);