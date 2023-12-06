import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from '../components/Pages/Home/HomePage';
import Dashboard from '../components/Pages/Dashboard/DashBoard';
import Discovery from '../components/Pages/Discover/DiscoverPage';
import AboutPage from '../components/Pages/About/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/discover" element={<Discovery/>} />
        <Route path="/about" element={<AboutPage/>} />
      </Routes>
    </Router>
    //<HomePage />
  );
}

export default App;
