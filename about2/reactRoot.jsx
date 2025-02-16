import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactComponent from './react';  // Assuming this is your main React component
import NewPage from './newpage';      // Assuming this is your new page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReactComponent />} />
        <Route path="/newpage.jsx" element={<NewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
