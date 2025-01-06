import React, { useEffect, useState } from 'react';
import { getAllBookings, cancelBookingInDB } from './indexedDB'; // Import cancelBookingInDB
import '../css/Payment.css';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState({ status: '' }); // Filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [showRefundModal, setShowRefundModal] = useState(false); // State to control modal visibility

  const fetchPaymentDetails = async () => {
    try {
      const bookings = await getAllBookings();
      const paymentDetails = bookings.map((booking) => {
        // Handle both 'Cancelled' and 'Canceled'
        let refundStatus = 'Not Applicable'; // Default value for non-canceled bookings
  
        if (booking.status === 'Cancelled' || booking.status === 'Canceled') {
          refundStatus = 'Processing Refund'; // Only for Cancelled or Canceled bookings
        }
  
        return {
          taskName: booking.taskName,
          customerName: booking.customerName,
          serviceProvider: booking.serviceProvider,
          date: booking.date,
          time: booking.time,
          totalPrice: booking.totalPrice,
          status: booking.status,
          transactionId: booking.transactionId,
          refundStatus: refundStatus, // Apply dynamic refundStatus
          refundReason: (booking.status === 'Cancelled' || booking.status === 'Canceled') ? 'User Request' : '',
          refundMethod: (booking.status === 'Cancelled' || booking.status === 'Canceled') ? 'Original Payment Method' : '',
        };
      });
      setPayments(paymentDetails); // Store payment details in the state
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const handleCancelBooking = async (transactionId) => {
    try {
      await cancelBookingInDB(transactionId); // Cancel the booking
      fetchPaymentDetails(); // Refetch payment details to reflect the status change
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter the payments data
  const filteredPayments = payments.filter((payment) => {
    return filter.status ? payment.status === filter.status : true;
  });

  // Pagination logic
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Show the refund policy modal
  const toggleRefundModal = () => setShowRefundModal((prev) => !prev);

  return (
    <div className="payment-history-section">
      <h2>Payment History</h2>

      {/* Filter Section with Refund Policy Icon at the end */}
      <div className="filters">
        <select name="status" onChange={handleFilterChange} value={filter.status}>
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Refund Policy Icon */}
        <div className="refund-policy-icon" onClick={toggleRefundModal}>
          <span className="icon">ℹ️</span> {/* You can replace this with any icon */}
          <span>Refund Policy</span>
        </div>
      </div>

      {/* Refund Policy Modal */}
      {showRefundModal && (
        <div className="refund-policy-modal">
          <div className="modal-content">
            <span className="close" onClick={toggleRefundModal}>×</span>
            <h3>Refund Policy</h3>
            <p>We process refunds when bookings are canceled within 24 hours. If the service provider fails to deliver the service or if there are other valid reasons, a refund will be initiated immediately.</p>
            <p>Refunds are processed back to the original payment method. Please allow up to 7 business days for the refund to reflect in your account.</p>
          </div>
        </div>
      )}

      {/* Table for Payment History */}
      {currentPayments.length === 0 ? (
        <p>No payment history available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Customer Name</th>
              <th>Service Provider</th>
              <th>Date</th>
              <th>Time</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Refund Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment) => (
              <tr key={payment.transactionId}>
                <td>{payment.taskName}</td>
                <td>{payment.customerName}</td>
                <td>{payment.serviceProvider}</td>
                <td>{payment.date}</td>
                <td>{payment.time}</td>
                <td>{payment.totalPrice}</td>
                <td>{payment.status}</td>
                <td>{payment.transactionId}</td>
                <td className={payment.refundStatus === 'Processing Refund' ? 'processing' : ''}>{payment.refundStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button className="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <button className="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPayments.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
