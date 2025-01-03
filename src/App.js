import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  return (
    <Router>
      <div className="flex">
        <NavBar />
        <div className="flex-1">
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;

