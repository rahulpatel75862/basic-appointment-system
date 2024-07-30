import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Student',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        alert('Registration successful');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert('Error registering user');
      }
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input 
          type="text" 
          placeholder="Name" 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Phone" 
          value={formData.phone} 
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
          required 
        />
        <select 
          value={formData.role} 
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Institute">Institute</option>
        </select>
        <input 
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          required 
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;
