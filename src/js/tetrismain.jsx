import React from "react";
import ReactDOM from "react-dom/client";
import TetriesGame from "../tetris/tetriesgame.jsx"; // ✅ Ensure correct path
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TetriesGame />  {/* ✅ Render the Tetris Game */}
  </React.StrictMode>
);
