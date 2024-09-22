import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Books from '../components/Books';
import Navbar from '../components/Navbar'

function App() {
  return (
    <Router>

      <Navbar />

      <div className="p-4">
        
        <Routes>
          <Route path="/" element={<Books />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
