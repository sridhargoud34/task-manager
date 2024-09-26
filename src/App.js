import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './components/AuthContext';
import AuthContainer from './pages/AuthContainer';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthContainer />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
