import React from 'react';
import ReactDOM from 'react-dom/client';



function App() {
  return <h1>Hello all from React!</h1>;
}


document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root'); 

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App/>);
  } else {
    console.error("Element with ID 'root' not found!");
  }
});