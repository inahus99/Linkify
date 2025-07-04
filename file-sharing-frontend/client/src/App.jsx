import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DownloadPage from './pages/DownloadPage';

// This line correctly imports the CSS file for Tailwind
import './App.css';

function App() {
  return (
    // The Router component enables page navigation
    <Router>
      {/* The Routes component holds all our different page rules */}
      <Routes>
        {/* Rule 1: If the path is exactly "/", show the HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Rule 2: If the path is "/files/some-unique-id", show the DownloadPage */}
        <Route path="/files/:uuid" element={<DownloadPage />} />
      </Routes>
    </Router>
  );
}

export default App;