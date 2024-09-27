import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
console.log(token,"isAuthenticated");
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
