// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';

// Define the Home and ReactPage components
const Home = () => (
  <div>
    <h1>Welcome to the Home Page!</h1>
    <p>This is a static page. You can go to the React-based page by clicking the link below:</p>
    <Link to="/react-page">Go to React-based page</Link>
  </div>
);

const ReactPage = () => (
  <div>
    <h1>Welcome to the React Page!</h1>
    <p>This is a React-based page that uses React Router.</p>
    <Link to="/">Back to Home</Link>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/react-page" element={<ReactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
