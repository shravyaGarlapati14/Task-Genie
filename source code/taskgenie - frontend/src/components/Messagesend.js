import React, { useState, useEffect } from 'react';
import { saveMessage, getMessages } from './indexedDB';

const Messagesend = ({ booking, userType }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const chatMessages = await getMessages(booking.transactionId);
      // Ensure chatMessages is an array before calling sort
      if (Array.isArray(chatMessages)) {
        setMessages(chatMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))); // Sort messages by timestamp
      } else {
        setMessages([]); // Set an empty array if no messages are found
      }
    };
    fetchMessages();
  }, [booking.transactionId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: userType, // 'Client' or 'Provider'
      text: newMessage,
      timestamp: new Date().toISOString(),
      transactionId: booking.transactionId,
    };

    await saveMessage(message);
    // Update the messages array with the new message
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  return (
    <div className="messages-section">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message-item ${msg.sender === userType ? 'own-message' : 'other-message'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      ></textarea>
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Messagesend;
