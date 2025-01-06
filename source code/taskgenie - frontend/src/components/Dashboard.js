import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar Component
import MyProfile from './MyProfile';
import BookingHistory from './BookingHistory';
import PaymentHistory from './PaymentHistory';
import AccountModification from './Account';
import '../css/Dashboard.css'; // Styles for the layout
import Navbar from './Navbar'; // Import the Navbar
import Footer from './Footer';
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('myProfile'); // Default section

  const renderContent = () => {
    switch (activeSection) {
      case 'myProfile':
        return <MyProfile />;
      case 'bookingHistory':
        return <BookingHistory />;
      case 'paymentHistory':
        return <PaymentHistory />;
      case 'accountModification':
        return <AccountModification />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div>
        <Navbar /> {/* Navbar at the top */}
        <br></br><br></br><br></br>        <br></br><br></br><br></br><br></br>

    <div className="dashboard-container">
             
      <Sidebar  setActiveSection={setActiveSection} />
      <div className="content-area">
        {renderContent()}
      </div>
      </div>

      {/* <br></br><br></br> */}
      <Footer />
    </div>
  );
};

export default Dashboard;
