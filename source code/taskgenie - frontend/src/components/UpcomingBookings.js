import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getAllBookings, updateBookingInDB } from './indexedDB';
import '../css/bookingmanger.css';

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Upcoming'); // Default tab is 'Upcoming'
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const storedBookings = await getAllBookings();
        setBookings(storedBookings);
      } catch (error) {
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const updateBookingStatus = async (transactionId, newStatus) => {
    const bookingToUpdate = bookings.find((b) => b.transactionId === transactionId);

    if (!bookingToUpdate) return;

    const updatedBooking = { ...bookingToUpdate, status: newStatus };

    try {
      await updateBookingInDB(updatedBooking);
      Swal.fire('Success!', `Booking marked as ${newStatus}.`, 'success');
      const updatedBookings = bookings.map((b) =>
        b.transactionId === transactionId ? updatedBooking : b
      );
      setBookings(updatedBookings);
    } catch {
      Swal.fire('Error', 'Failed to update booking.', 'error');
    }
  };

  const handleCancel = (transactionId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateBookingStatus(transactionId, 'Cancelled');
      }
    });
  };

  const handleComplete = (transactionId) => {
    Swal.fire({
      title: 'Mark as completed?',
      text: 'Do you want to mark this booking as completed?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, complete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        updateBookingStatus(transactionId, 'Completed');
      }
    });
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setShowAll(false);
  };

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  // Categorize bookings
  const upcomingBookings = bookings.filter((b) => b.status === 'Upcoming');
  const completedBookings = bookings.filter((b) => b.status === 'Completed');
  const cancelledBookings = bookings.filter((b) => b.status === 'Cancelled');

  const renderBookingCard = (booking) => (
    <div key={booking.transactionId} className="bookingcard">
      <p><strong>Task:</strong> {booking.taskName}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Time:</strong> {booking.time}</p>
      <p><strong>Total Price:</strong> {booking.totalPrice}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      {selectedTab === 'Upcoming' && (
        <div className="button-group">
          <button className='cancelbutton' onClick={() => handleCancel(booking.transactionId)}>Cancel</button>
          <button className='completedbutton' onClick={() => handleComplete(booking.transactionId)}>Mark Completed</button>
        </div>
      )}
    </div>
  );

  const renderBookings = (bookingList, status) => (
    bookingList.length === 0 ? (
      <p>No {status.toLowerCase()} bookings available.</p>
    ) : (
<div className="booking-grid">
      {bookingList.map((booking) => renderBookingCard(booking))}
    </div>    )
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="booking-manager">
      <div className="header-container">
        <h2 className='bhead'>Your Bookings</h2>
        <div className="toggle-container">
          <label className="toggle-label">
            Show All
            <input type="checkbox" checked={showAll} onChange={handleToggle} />
          </label>
        </div>
      </div>
      <div className="tabs-container">
        <div
          className={`tab ${selectedTab === 'Upcoming' ? 'active' : ''}`}
          onClick={() => handleTabClick('Upcoming')}
        >
          Upcoming
        </div>
        <div
          className={`tab ${selectedTab === 'Completed' ? 'active' : ''}`}
          onClick={() => handleTabClick('Completed')}
        >
          Completed
        </div>
        <div
          className={`tab ${selectedTab === 'Cancelled' ? 'active' : ''}`}
          onClick={() => handleTabClick('Cancelled')}
        >
          Cancelled
        </div>
      </div>
      <div className="booking-sections">
        {showAll ? (
          <>
            <section className="booking-section">
              <h3>Upcoming Bookings</h3>
              {renderBookings(upcomingBookings, 'Upcoming')}
            </section>
            <section className="booking-section">
              <h3>Completed Bookings</h3>
              {renderBookings(completedBookings, 'Completed')}
            </section>
            <section className="booking-section">
              <h3>Cancelled Bookings</h3>
              {renderBookings(cancelledBookings, 'Cancelled')}
            </section>
          </>
        ) : (
          <>
            {selectedTab === 'Upcoming' && (
              <section className="booking-section">
                <h3>Upcoming Bookings</h3>
                {renderBookings(upcomingBookings, 'Upcoming')}
              </section>
            )}
            {selectedTab === 'Completed' && (
              <section className="booking-section">
                <h3>Completed Bookings</h3>
                {renderBookings(completedBookings, 'Completed')}
              </section>
            )}
            {selectedTab === 'Cancelled' && (
              <section className="booking-section">
                <h3>Cancelled Bookings</h3>
                {renderBookings(cancelledBookings, 'Cancelled')}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingManager;
