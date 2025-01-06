// Bookings.js
import React from 'react';
// import './Bookings.css';

const Bookings = () => {
  const bookingList = [{ id: 1, date: 'Nov 10, 2024', client: 'John Doe', status: 'Confirmed' }]; // Sample data

  return (
    <div className="bookings-section">
      <h2>Upcoming Bookings</h2>
      <ul className="booking-list">
        {bookingList.map(booking => (
          <li key={booking.id} className="booking-item">
            <span>{booking.date}</span>
            <span>{booking.client}</span>
            <span>{booking.status}</span>
            <button className="booking-button">Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
