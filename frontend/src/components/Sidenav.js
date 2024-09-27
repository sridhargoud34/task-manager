import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../assets/sidenav.css";
import logoutImg from '../assets/logout.png';

import projectManagement from '../assets/project-management.png'
import { toast } from "react-toastify";
function Sidenav() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    toast.success("Log-out Successfull")
  };
  return (
    <div className="side-container">
      
      <div className="nav-container">
        <img className="side-img" src={projectManagement} alt="projrct-management"></img>
      <NavLink className="nav-link" to="/dashboard"> Task Management</NavLink>
      </div>
      <div className="nav-container">
      <img className="side-img" src={logoutImg} alt="logout"></img>
      <div className="nav-link" onClick={logout}>Logout</div>
      </div>
     
     
        
       
    </div>
  );
}

export default Sidenav;


