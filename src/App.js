import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard_page/DashboardPage';
import './App.css'
import Signin from './pages/auth/signin/Signin';
import Signup from './pages/auth/signup/Signup';
import Classes from './pages/classes/Classes';

const App = () => {
  return (
  <Router>
    <Routes>
    <Route path="/" element={<Signin />}  />
    <Route path="/register" element={<Signup />}  />
    <Route path="/signin" element={<Signin />}  />
    <Route path="/:organization/:class" element={<DashboardPage />}  />
    <Route path="/classes" element={<Classes />}  />
    </Routes>
  </Router>
  );
}

export default App;
