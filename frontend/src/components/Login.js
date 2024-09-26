import React,{useState} from 'react';
import { postLogin } from '../services/AuthContainerServices';
const Login = ({ formData, handleChange }) => {
    const [error, setError] = useState(null); // State for error messages
    const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
      e.preventDefault();
      postLogin(formData).then(res => {
          console.log(res);
      }).catch(err => console.log(err,"err"))
    // Handle login logic
    console.log('Logging in with:', { email: formData.email, password: formData.password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
