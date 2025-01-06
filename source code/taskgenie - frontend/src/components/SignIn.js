import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 
import '../css/Auth.css'; 
import Navbar from './Navbar'; 
import Footer from './Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setShowModal(true); // Show success modal
    } else {
      setError('Invalid email or password');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className='signin'>
      {/* <Navbar /> */}
      <br/><br/><br/><br/>
      <div className="auth-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember Me</label>
          </div>
          {error && <p>{error}</p>}

          <button type="submit" className="btn">Sign In</button>

          <div className="auth-links">
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>      
      <br/><br/>

      <Footer />

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Signin Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have successfully logged in.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignIn;
