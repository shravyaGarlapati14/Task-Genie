import React, { useState, useEffect } from 'react';
import Messagesend from './Messagesend';
import { getMessages } from './indexedDB'; // Import the getMessages function

const ProviderChat = ({ bookings }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleOpenChat = async (booking) => {
    setCurrentChat(booking);

    // Fetch messages for the selected booking
    const chatMessages = await getMessages(booking.transactionId);
    if (Array.isArray(chatMessages)) {
      setMessages(chatMessages); // Update the messages state for the selected booking
    }
  };

  const handleCloseChat = () => {
    setCurrentChat(null);
    setMessages([]); // Clear messages when closing the chat
  };

  return (
    <div className="provider-chat">
      <h2>Provider Chat</h2>
      {/* Check if bookings is an array before attempting to map */}
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.transactionId} className="booking-item">
            <p><strong>Task:</strong> {booking.taskName}</p>
            <button onClick={() => handleOpenChat(booking)}>Open Chat</button>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}

      {currentChat && (
        <div className="chat-modal">
          <button onClick={handleCloseChat}>Close</button>
          <Messagesend booking={currentChat} userType="Provider" messages={messages} />
        </div>
      )}
    </div>
  );
};

export default ProviderChat;
