import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from './components/HomePage';
import Dashboard from './components/DashBoard';
import Discovery from './components/DiscoverPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/discover" element={<Discovery/>} />
      </Routes>
    </Router>
    //<HomePage />
  );
}

export default App;
