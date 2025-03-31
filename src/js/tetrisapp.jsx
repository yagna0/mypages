import React from 'react';
import TetrisMain from '@/js/tetrismain.jsx'; // Using alias from vite.config.js

const App = () => {
  return (
    <div>
      <h1>Tetris Game</h1>
      <TetrisMain />
    </div>
  );
};

export default App;
