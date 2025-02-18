
import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to My React App</h1>
      <p>This is a simple React multi-page app with state management!</p>

      <h2>Available Pages:</h2>
      <ul>
        <li>
          <Link to="/new-page">React-Based Page</Link>: This page displays a list of items from a JSON array, allowing you to modify them.
        </li>
      </ul>
    </div>
  );
}

export default App;
