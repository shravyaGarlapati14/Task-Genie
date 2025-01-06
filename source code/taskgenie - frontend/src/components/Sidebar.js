import React from 'react';
import '../css/Sidebar.css'; // Add custom styles here

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar1">
      <div className="sidebar1-header">
        <h3>Account</h3>
      </div>
      <ul className="sidebar1-menu">
        <li onClick={() => setActiveSection('myProfile')} className="sidebar1-item">
          My Profile
        </li>
        <li onClick={() => setActiveSection('bookingHistory')} className="sidebar1-item">
          Booking History
        </li>
        <li onClick={() => setActiveSection('paymentHistory')} className="sidebar1-item">
          Payment History
        </li>
        <li onClick={() => setActiveSection('accountModification')} className="sidebar1-item">
          Account Modification
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
