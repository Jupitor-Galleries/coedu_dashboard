import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard_page/DashboardPage';
import './App.css'
import Signin from './pages/auth/signin/Signin';

const App = () => {
  return (
  <Router>
    <Routes>
    <Route path="/" element={<Signin />}  />
    </Routes>
  </Router>
  );
}

export default App;
