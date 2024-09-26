import React from 'react';
import { postregister } from '../services/AuthContainerServices';
const Register = ({ formData, handleChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic
    postregister(formData).then(res => {
      console.log(res);
  }).catch(err => console.log(err,"err"))
    console.log('Registering with:', { email: formData.email, password: formData.password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
