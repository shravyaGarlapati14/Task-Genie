import React, { useState } from 'react';
import Profile from './Profile';
import Bookings from './Bookings';
import UpcomingBookings from './UpcomingBookings';
import Messages from './Messages.js';
import Reviews from './Reviews';
import AdsSection from './AdsSection';
import Footer from './Footer.js';
const Homepage = () => {
  const sampleBookings = [
    { id: 1, date: 'Nov 12, 2024', client: 'John Doe', status: 'Confirmed' },
    { id: 2, date: 'Nov 15, 2024', client: 'Jane Smith', status: 'Pending' },
  ];

  const [ads, setAds] = useState([]);

  const handlePostAd = (ad) => {
    setAds([...ads, ad]); // Add the new ad to the state
    console.log('Ads:', [...ads, ad]); // Debugging: log the updated ads
  };

  return (
    <div className="homepage">
      {/* <Navbar2 /> */}
      <br />
      <Profile />
      <div className="main-content">
        {/* <Bookings /> */}
        <UpcomingBookings bookings={sampleBookings} />
        {/* <Messages /> */}
        <Reviews />
        <AdsSection ads={ads} onPostAd={handlePostAd} />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
