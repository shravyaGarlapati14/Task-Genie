import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/profile.css';

const Profile = () => {
  const [userFullName, setUserFullName] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.firstName && user.lastName) {
        setUserFullName(`${user.firstName} ${user.lastName}`);
      } else if (user.name) {
        setUserFullName(user.name); // Fallback to a single name if full name isn't available
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="profile-section2">
      <h2>Welcome, {userFullName}</h2>
      <button
        className='profilebutton2'
        onClick={() => navigate('/update-profile')}
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
