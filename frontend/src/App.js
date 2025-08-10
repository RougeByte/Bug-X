import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Welcome from './pages/Welcome';
import Home from './pages/Home'; // 1. Import the new Home page component
import PrivateRoute from './components/routing/PrivateRoute';

import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';

import AuthState from './context/auth/AuthState';
import BugState from './context/bug/BugState';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <BugState>
        <AlertState>
        <Router>
          <>
            <Navbar />
            <div className="container">
              <Alerts />
              <Routes>
                {/* 
                  2. The PUBLIC welcome page is now at the '/welcome' route.
                  This is for new or logged-out users.
                */}
                <Route path="/welcome" element={<Welcome />} />
                
                {/* Public routes for registration and login */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* 
                  3. The ROOT route '/' is now PROTECTED. 
                  It will render the new 'Home' component ONLY for logged-in users.
                  Logged-out users trying to access this will be redirected.
                */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />

                {/* 
                  4. The DASHBOARD route is also PROTECTED.
                  It remains the place to add/view bug reports.
                */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </>
        </Router>
        </AlertState>
      </BugState>
    </AuthState>
  );
};

export default App;