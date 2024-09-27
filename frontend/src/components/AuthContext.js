import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
const [user,setUser] = useState(userInfo)
  const login = (newToken,page) => {
    localStorage.setItem('token', newToken);
    const userDecode = jwtDecode(newToken)
    localStorage.setItem("user",JSON.stringify(userDecode))
    setToken(newToken);
    setUser(userDecode)
    toast.success( page === "register" ? "Registered successfully" : "Logged in successfully")
  };
  return (
    <AuthContext.Provider value={{ token,login,user,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
