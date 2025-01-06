import React, { useState, useEffect } from 'react';
import { getAllBookings } from './indexedDB';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../css/Earnings.css';
import Footer from './Footer.js';

const Earnings = () => {
  const [bookings, setBookings] = useState([]);
  const [totalBookingEarnings, setTotalBookingEarnings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [averageEarnings, setAverageEarnings] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await getAllBookings();
        const completedBookings = allBookings.filter((booking) => booking.status === 'Completed');
        setBookings(completedBookings);

        // Calculate total earnings
        const providerEarnings = completedBookings.reduce((total, booking) => {
          const totalPrice = parseFloat(booking.totalPrice.replace(/[^0-9.]/g, '')) || 0;
          return total + totalPrice * 0.75;
        }, 0);

        setTotalBookingEarnings(providerEarnings);
        setTotalBookings(completedBookings.length);
        setAverageEarnings(providerEarnings / (completedBookings.length || 1));

        // Prepare chart data
        const groupedByDate = completedBookings.reduce((acc, booking) => {
          const date = new Date(booking.date).toLocaleDateString();
          const earning = parseFloat(booking.totalPrice.replace(/[^0-9.]/g, '')) * 0.75 || 0;
          acc[date] = (acc[date] || 0) + earning;
          return acc;
        }, {});

        const labels = Object.keys(groupedByDate);
        const data = Object.values(groupedByDate);

        setChartData({ labels, data });
        renderChart(labels, data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const renderChart = (labels, data) => {
    const ctx = document.getElementById('earningsChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Earnings ($)',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
      },
    });
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Earnings Analytics Report', 10, 10);

    // Summary
    doc.setFontSize(12);
    doc.text(`Total Bookings Earnings: $${totalBookingEarnings.toFixed(2)}`, 10, 20);
    doc.text(`Total Bookings Completed: ${totalBookings}`, 10, 30);
    doc.text(`Average Earnings Per Booking: $${averageEarnings.toFixed(2)}`, 10, 40);

    // Detailed Table
    const tableData = bookings.map((booking) => [
      booking.taskName || "Unknown Task",
      `$${booking.totalPrice}`,
      `$${(parseFloat(booking.totalPrice.replace(/[^0-9.]/g, '')) * 0.75 || 0).toFixed(2)}`,
      new Date(booking.date).toLocaleDateString() || "Unknown Date",
    ]);

    doc.autoTable({
      startY: 50,
      head: [['Task Name', 'Total Price', 'Earnings (Provider)', 'Date']],
      body: tableData,
    });

    doc.save('earnings_report.pdf');
  };

  return (
    <div className="earnings-section">
      <h2 className="erh2">Earnings Analytics Report</h2>

      <div className="earnings-summary">
 
        <div className="earnings-card ec1">
          <h3 className="erh3">Total Bookings Completed</h3>
          <p className="erp">{totalBookings}</p>
        </div>
        <div className="earnings-card ec1">
          <h3 className="erh3">Total Bookings Earnings</h3>
          <p className="erp">${totalBookingEarnings.toFixed(2)}</p>
        </div>
        <div className="earnings-card ec1">
          <h3 className="erh3">Average Earnings Per Booking</h3>
          <p className="erp">${averageEarnings.toFixed(2)}</p>
        </div>
      </div>

      <h3 className="chart-title">Earnings Over Time</h3>
      <canvas id="earningsChart" className="chart"></canvas>

      <button className="export-btn" onClick={exportPDF}>
        Export as PDF
      </button>
<hr></hr>
      <h3 className="ercb">Completed Bookings</h3>
      <ul className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li className="tid" key={booking.transactionId}>
              <strong>{booking.taskName || "Unknown Task"}</strong> - $
              {(parseFloat(booking.totalPrice.replace(/[^0-9.]/g, '')) * 0.75 || 0).toFixed(2)} (Completed on{' '}
              {new Date(booking.date).toLocaleDateString()})
            </li>
          ))
        ) : (
          <li className="nope">No completed bookings available</li>
        )}
      </ul>
      <Footer />

    </div>
    
  );
};

export default Earnings;
