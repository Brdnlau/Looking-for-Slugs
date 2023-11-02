import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
  return (
    <>
    <Router>
      <HomePage />
      <Routes>
        <Route path='/' exact/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
