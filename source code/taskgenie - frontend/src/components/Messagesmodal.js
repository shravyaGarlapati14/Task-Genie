import React, { useState, useEffect } from 'react';
import { saveMessage, getMessagesByBooking } from './indexedDB'; // Database functions

const MessagesModal = ({ booking, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const storedMessages = await getMessagesByBooking(booking.transactionId);
      setMessages(storedMessages || []);
    };
    fetchMessages();
  }, [booking.transactionId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'Customer',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    await saveMessage(booking.transactionId, message);
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">×</button>
        <h3>Chat with {booking.serviceProvider}</h3>
        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === 'Customer' ? 'customer' : 'provider'}`}>
              <span><strong>{msg.sender}:</strong> {msg.text}</span>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesModal;
