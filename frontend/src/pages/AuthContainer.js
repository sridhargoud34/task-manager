import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthContainer = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Login formData={loginData} handleChange={handleLoginChange} />
      <Register formData={registerData} handleChange={handleRegisterChange} />
    </div>
  );
};

export default AuthContainer;
