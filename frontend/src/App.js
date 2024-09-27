import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/Register';
import TaskManagement from './pages/TaskManagement';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import PublicRoute from './components/PublicRoute';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (

    <AuthProvider>
      <ToastContainer position="top-right"
        autoClose={3000} />
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <TaskManagement />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
