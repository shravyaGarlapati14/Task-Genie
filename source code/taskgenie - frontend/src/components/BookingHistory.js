import React, { useEffect, useState } from 'react';
import { getAllBookings, deleteBookingFromDB, updateBookingInDB } from './indexedDB'; // Assuming these functions are implemented
import Swal from 'sweetalert2';
import '../css/bookinghistory.css';
import emailjs from 'emailjs-com';  // Import EmailJS
import Messages from './Messagesend';


const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [currentChat, setCurrentChat] = useState(null); // Track current chat booking

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const storedBookings = await getAllBookings();
        setBookings(storedBookings);
        setFilteredBookings(storedBookings);
      } catch (error) {
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);


  const handleOpenChat = (booking) => {
    setCurrentChat(booking);
  };

  const handleCloseChat = () => {
    setCurrentChat(null);
  };


  // Function to send email after modifying the booking
  const sendModifiedBookingEmail = (updatedBooking) => {
    const transactionId = updatedBooking.transactionId;

    emailjs.send(
      'service_dulykwh', // Your email service ID
      'template_85i3bkr', // Your email template ID
      {
        user_name: updatedBooking.customerName,
        user_email: updatedBooking.email,
        task_name: updatedBooking.taskName,
        service_provider: updatedBooking.serviceProvider,
        task_date: updatedBooking.date,
        task_time: updatedBooking.time,
        total_price: updatedBooking.totalPrice,
        transaction_id: transactionId,
        status: 'Modified'  // To indicate the booking was modified
      }, 
      'ICCIghzrmloavUiJs'  // Your EmailJS user ID
    ).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Booking modification details have been sent to your email!',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#ffffff',
        color: '#4F8A10',
      });
    })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Could not send email. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        background: '#F8D7DA',
        color: '#721C24',
      });
    });
  };

  const sendCanceledBookingEmail = (transactionId, customerName, email) => {
    emailjs.send(
      'service_xrj2erp', // Your email service ID
      'template_a7fo1yy', // Your email template ID
      {
        user_name: customerName,
        user_email: email,
        transaction_id: transactionId,
        status: 'Cancelled',
        refund_policy: 'Your booking has been canceled. The refund process has been initiated and will be completed within 5-7 business days. If you have any questions, please contact our support team.'
      },
      'OFJpWA-RNBvR_jS2N'  // Your EmailJS user ID
    )
    .then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Booking cancellation details and refund policy have been sent to your email!',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#ffffff',
        color: '#4F8A10',
      });
    })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Could not send email. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        background: '#F8D7DA',
        color: '#721C24',
      });
    });
  };
  const handleModifyBooking = (transactionId) => {
    const bookingToModify = bookings.find(booking => booking.transactionId === transactionId);

    Swal.fire({
      title: 'Modify Booking',
      html: ` 
        <input type="text" id="taskName" class="swal2-input" placeholder="Task Name" value="${bookingToModify.taskName}" readonly>
        <input type="text" id="customerName" class="swal2-input" placeholder="Customer Name" value="${bookingToModify.customerName}">
        <input type="text" id="serviceProvider" class="swal2-input" placeholder="Service Provider" value="${bookingToModify.serviceProvider}" readonly>
        <input type="text" id="email" class="swal2-input" placeholder="Email" value="${bookingToModify.email}">
        <input type="date" id="date" class="swal2-input" value="${bookingToModify.date}">
        <input type="time" id="time" class="swal2-input" value="${bookingToModify.time}">
      `,
      preConfirm: () => {
        const customerName = document.getElementById('customerName').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (customerName && email && date && time) {
          const updatedBooking = {
            transactionId,
            taskName: bookingToModify.taskName,
            customerName,
            serviceProvider: bookingToModify.serviceProvider,
            email,
            date,
            time,
            totalPrice: bookingToModify.totalPrice,  // Assuming price remains unchanged
          };

          updateBookingInDB(updatedBooking)
            .then(() => {
              Swal.fire('Booking Updated!', '', 'success');
              sendModifiedBookingEmail(updatedBooking);
              setBookings(prev => prev.map(booking => booking.transactionId === transactionId ? updatedBooking : booking));
              setFilteredBookings(prev => prev.map(booking => booking.transactionId === transactionId ? updatedBooking : booking));
            })
            .catch(() => {
              Swal.fire('Error', 'Failed to update booking', 'error');
            });
        } else {
          Swal.showValidationMessage('Please fill out all fields');
        }
      },
      focusConfirm: false,
    });
  };

  const handleCancelBooking = (transactionId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, Keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        const canceledBooking = bookings.find(booking => booking.transactionId === transactionId);
        const updatedBooking = { ...canceledBooking, status: 'Cancelled' };
  
        updateBookingInDB(updatedBooking)
          .then(() => {
            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
            sendCanceledBookingEmail(updatedBooking.transactionId, updatedBooking.customerName, updatedBooking.email);
            setBookings(prev => prev.map(booking =>
              booking.transactionId === transactionId ? updatedBooking : booking
            ));
            setFilteredBookings(prev => prev.map(booking =>
              booking.transactionId === transactionId ? updatedBooking : booking
            ));
          })
          .catch(() => {
            Swal.fire('Error', 'Failed to cancel booking', 'error');
          });
      }
    });
  };
  
  const handleComplete = async (transactionId) => {
    const bookingToUpdate = bookings.find((b) => b.transactionId === transactionId);
    const updatedBooking = { ...bookingToUpdate, status: 'Completed' };

    try {
      await updateBookingInDB(updatedBooking);
      setBookings((prev) =>
        prev.map((booking) => (booking.transactionId === transactionId ? updatedBooking : booking))
      );
      Swal.fire('Success!', 'Booking marked as completed.', 'success');
      // sendEmail(updatedBooking, 'Completed');
    } catch {
      Swal.fire('Error', 'Failed to mark booking as completed.', 'error');
    }
  };

  const handleSubmitReview = (transactionId, reviewText, rating) => {
    const updatedBooking = bookings.find((booking) => booking.transactionId === transactionId);
    updatedBooking.review = { reviewText, rating };
  
    updateBookingInDB(updatedBooking)
      .then(() => {
        console.log('Review successfully saved in IndexedDB:', updatedBooking.review); // Log the saved review
        Swal.fire('Review Submitted!', '', 'success');
        setBookings((prev) =>
          prev.map((booking) =>
            booking.transactionId === transactionId ? updatedBooking : booking
          )
        );
  
        // Send email to the service provider
        sendReviewEmailToServiceProvider(updatedBooking);
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to submit review', 'error');
      });
  
    setRefreshTrigger((prev) => !prev); // Toggle the trigger to re-fetch reviews
  };
  
  const sendReviewEmailToServiceProvider = (updatedBooking) => {
    const { review, serviceProviderEmail } = updatedBooking;
  
    emailjs.send(
      'service_xrj2erp', // Your email service ID
      'template_31euj6e', // Your email template ID for review notifications
      {
        service_provider_email: serviceProviderEmail, // Service provider's email
        customer_name: updatedBooking.customerName,
        task_name: updatedBooking.taskName,
        review_text: review.reviewText,
        rating: review.rating,
      },
      'OFJpWA-RNBvR_jS2N'  // Your EmailJS user ID
    )
    .then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Review details have been sent to the service provider!',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#ffffff',
        color: '#4F8A10',
      });
    })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Could not send review to service provider. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        background: '#F8D7DA',
        color: '#721C24',
      });
    });
  };
  
  

  const handleEditReview = (transactionId) => {
    const booking = bookings.find((b) => b.transactionId === transactionId);
    const { review } = booking;

    Swal.fire({
      title: 'Edit Your Review',
      html: `
        <textarea id="reviewText" class="swal2-textarea" placeholder="Your Review">${review.reviewText}</textarea>
        <label for="rating">Rating: </label>
        <select id="rating" class="swal2-select">
          ${[1, 2, 3, 4, 5]
            .map((val) => `<option value="${val}" ${val === review.rating ? 'selected' : ''}>${val}</option>`)
            .join('')}
        </select>
      `,
      preConfirm: () => {
        const reviewText = document.getElementById('reviewText').value;
        const rating = parseInt(document.getElementById('rating').value);

        if (!reviewText || !rating) {
          Swal.showValidationMessage('Please provide a review text and rating.');
          return false;
        }

        return { reviewText, rating };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { reviewText, rating } = result.value;
        handleSubmitReview(transactionId, reviewText, rating);
      }
    });
  };

  const handleDeleteReview = (transactionId) => {
    Swal.fire({
      title: 'Delete Review?',
      text: 'Are you sure you want to delete your review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBooking = bookings.find((b) => b.transactionId === transactionId);
        delete updatedBooking.review;

        updateBookingInDB(updatedBooking)
          .then(() => {
            Swal.fire('Review Deleted!', '', 'success');
            setBookings((prev) =>
              prev.map((booking) =>
                booking.transactionId === transactionId ? updatedBooking : booking
              )
            );
          })
          .catch(() => {
            Swal.fire('Error', 'Failed to delete review', 'error');
          });
      }
    });
  };

  const renderReviewSection = (booking) => {
    if (booking.status === 'Completed') {
      if (booking.review) {
        return (
          <div className="review-display">
            <p><strong>Review:</strong> {booking.review.reviewText}</p>
            <p><strong>Rating:</strong> {'⭐'.repeat(booking.review.rating)}</p>
            <button className="edit-button" onClick={() => handleEditReview(booking.transactionId)}>Edit Review</button>
            <button className="delete-button" onClick={() => handleDeleteReview(booking.transactionId)}>Delete Review</button>
          </div>
        );
      } else {
        return (
          <div className="review-section">
            <textarea
              placeholder="Write your review..."
              id={`reviewText-${booking.transactionId}`}
              className="review-input"
            />
            <div className="rating">
              <label>Rating: </label>
              <select id={`rating-${booking.transactionId}`}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                const reviewText = document.getElementById(`reviewText-${booking.transactionId}`).value;
                const rating = parseInt(document.getElementById(`rating-${booking.transactionId}`).value);
                handleSubmitReview(booking.transactionId, reviewText, rating,refreshTrigger={refreshTrigger} );
              }}
            >
              Submit Review
            </button>
          </div>
        );
      }
    }
    return null;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

 
  return (
    <div className="booking-history-container">
      <h2>Your Booking History</h2>

      {error && <p className="error-message">{error}</p>}
      {filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
{filteredBookings.map((booking) => (
  <div key={booking.transactionId} className="booking-card">
    <h3>{booking.taskName}</h3>
    <p><strong>Name:</strong> {booking.customerName}</p>
    <p><strong>Service Provider:</strong> {booking.serviceProvider}</p>
    <p><strong>Date:</strong> {booking.date}</p>
    <p><strong>Time:</strong> {booking.time}</p>
    <p><strong>E-mail:</strong> {booking.email}</p>
    <p><strong>Total Price:</strong> {booking.totalPrice}</p>


    {/* {booking.status === 'Upcoming' && (
              <button onClick={() => handleOpenChat(booking)} className="chat-button">Chat</button>
            )} */}

    {booking.status === 'Cancelled' ? (
 <div className="canceled-indicator">
    <i className="cancel-icon">✖</i> Booking Canceled
</div>    
) : booking.status === 'Completed' ? (
        <div className="completed-indicator">
          <i className="complete-icon">✔</i> Booking Completed
        </div>
      ) : (
      <div className="button-group">
        <button onClick={() => handleModifyBooking(booking.transactionId)} className="modify-button">Modify</button>
        <button onClick={() => handleCancelBooking(booking.transactionId)} className="cancel-button">Cancel Booking</button>
      </div>
    )}
    {/* <RatingsComponent></RatingsComponent> */}
                  {renderReviewSection(booking) } 

  </div>
))}


        </div>
      )}
        {currentChat && (
        <div className="chat-modal">
          <div className="chat-content">
            <button onClick={handleCloseChat} className="close-chat">Close</button>
            {/* <h2>Chat with {currentChat.serviceProvider}</h2> */}
            <Messages booking={currentChat} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
