import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import './index.css';
import App from './App';

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root')); // Get the 'root' div and create the root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
