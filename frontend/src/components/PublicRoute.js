import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

function PublicRoute({children}) {
    const { token } = useAuth();
    console.log(token,"isAuthenticated");
      return !token ? children : <Navigate to="/dashboard" replace />;
}

export default PublicRoute;
