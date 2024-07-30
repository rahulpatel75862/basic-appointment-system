import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token); // Store the token in local storage
        alert('Login successful');
        navigate('/'); // Redirect to home page or dashboard
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>New user? <a href="/register">Sign up here</a></p>
    </div>
  );
};

export default Login;
