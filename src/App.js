import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard_page/DashboardPage';
import './App.css'
import Signin from './pages/auth/signin/Signin';
import Signup from './pages/auth/signup/Signup';
import Classes from './pages/classes/Classes';
import Students from './pages/students/Students';
import Assignments from './pages/assignments/Assignments';
import AssignmentsTracking from './pages/assignments/AssignmentsTracking';

const App = () => {
  return (
  <Router>
    <Routes>
    <Route path="/" element={<Signin />}  />
    <Route path="/register" element={<Signup />}  />
    <Route path="/signin" element={<Signin />}  />
    <Route path="/class/:classId" element={<DashboardPage />}  />
    <Route path="/dashboard" element={<DashboardPage />}  />
    <Route path="/classes" element={<Classes />}  />
    <Route path="/students/:classId" element={<Students />}  />
    <Route path="/students/" element={<Students />}  />
    <Route path="/assignments/" element={<Assignments />}  />
    <Route path="/assignments/:id" element={<AssignmentsTracking />}  />
    </Routes>
  </Router>
  );
}

export default App;
