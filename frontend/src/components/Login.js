import React, { useState } from 'react';
import { postLogin } from '../services/AuthContainerServices';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/login.css'; 
import { validateLogin } from '../common/Validation'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData.email, formData.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    postLogin(formData)
      .then(res => {
        login(res?.token, "login");
        navigate("/dashboard");
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
     
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      
      />
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
    
      />
      {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

      <button className="auth" type="submit">Login</button>
      <div className="registration-link">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </form>
  );
};

export default Login;
