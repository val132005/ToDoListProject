
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLogged from './pages/HomeLogged';
import HomeNonLogged from './pages/HomeNonLogged';
import Login from './pages/Login'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeNonLogged />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homeLogged" element={<HomeLogged />} />

      </Routes>
    </Router>
  );
};

export default App;

