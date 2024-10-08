import React, { useState } from 'react';
import { postregister } from '../services/AuthContainerServices';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateRegistration } from '../common/Validation'; 

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
    const validationErrors = validateRegistration(formData.email, formData.password, formData.confirmPassword);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    postregister(formData)
      .then((res) => {
        login(res?.token, "register");
        navigate("/dashboard");
        toast.success("Registered successfully");
      })
      .catch((err) => console.log(err, "err"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      
      />
      {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
      
      <button className="auth" type="submit">Register</button>
      <div className="registration-link">
        <p>Have an account? <Link to="/login">Login here</Link></p>
      </div>
    </form>
  );
};

export default Register;
