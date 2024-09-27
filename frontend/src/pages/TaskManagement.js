import React from 'react';
import "../assets/taskmanagement.css"
import Pagination from '../components/Pagination';
import Sidenav from '../components/Sidenav';
import { useAuth } from '../components/AuthContext';
function TaskManagement() {
  const {user} = useAuth()
  console.log(user,"user");
  return (
    <div className = "section">
      <Sidenav/>
      <Pagination userId = {user.id}></Pagination>
    </div>
  );
}

export default TaskManagement;
