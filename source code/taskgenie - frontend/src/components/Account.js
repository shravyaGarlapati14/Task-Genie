import React, { useState } from 'react';
import '../css/AccountModification.css'; // Add this line to import the CSS
import { useNavigate } from 'react-router-dom';

const AccountModification = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState(storedUser.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setError('');  // Clear any existing errors
    if (oldPassword !== storedUser.password) {
      setError('Old password is incorrect');
    } else if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
    } else {
      const updatedUser = { ...storedUser, password: newPassword };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/profile'); // Optional: Redirect to profile page
    }
  };

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    setError('');  // Clear any existing errors
    const updatedUser = { ...storedUser, email: email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Email updated successfully');
  };

  return (
    <div>
      {/* <Navbar /><br /><br /> */}
      <div className="account-modification-container">
        <h2>Account Modification</h2>
        <div className="form-container">
          
          <form className="account-form" onSubmit={handlePasswordUpdate}>
            <div className="input-group">
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn">{isLoading ? 'Updating...' : 'Update Password'}</button>
          </form>
          <form className="account-form" onSubmit={handleEmailUpdate}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Update Email</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default AccountModification;
