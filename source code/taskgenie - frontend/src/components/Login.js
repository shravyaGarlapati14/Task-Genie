import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../css/Auth.css';
import '../css/login.css';
import Footer from './Footer';
import { validateLogin } from './indexedDB'; // Import the validateLogin function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const isValid = await validateLogin(email, password);
  
      if (isValid) {
        // Store user data in localStorage after successful login
        const user = { email, isServiceProvider: true, name: email.split('@')[0] }; // Example user data
        localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
  
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/homepage'); // Navigate to the homepage
        });
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid email or password. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred during login. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="auth-container">
        <h2>Service Provider Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
          <p className="auth-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
      <br></br>
      <Footer />
    </div>
  );
};

export default Login;
