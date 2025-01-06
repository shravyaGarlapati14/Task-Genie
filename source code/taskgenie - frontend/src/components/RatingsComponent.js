import React, { useState, useEffect } from 'react';
import { addRating, updateRating, deleteRating, getAllRatings } from './indexedDB'; // Import IndexedDB methods

const RatingsComponent = ({ serviceProvider }) => {
  const [ratings, setRatings] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const allRatings = await getAllRatings();
      const providerRatings = allRatings.filter((rating) => rating.serviceProvider === serviceProvider);
      setRatings(providerRatings);
    };
    fetchRatings();
  }, [serviceProvider]);

  const handleAddRating = async () => {
    if (currentRating === 0 || reviewText.trim() === '') {
      alert('Please provide a rating and review text.');
      return;
    }

    const newRating = {
      serviceProvider,
      rating: currentRating,
      reviewText,
      date: new Date().toISOString(),
    };

    await addRating(newRating);
    setRatings((prev) => [...prev, newRating]);
    setCurrentRating(0);
    setReviewText('');
  };

  const handleUpdateRating = async () => {
    if (!editingId) return;

    const updatedRating = {
      id: editingId,
      serviceProvider,
      rating: currentRating,
      reviewText,
      date: new Date().toISOString(),
    };

    await updateRating(editingId, updatedRating);
    setRatings((prev) =>
      prev.map((rating) => (rating.id === editingId ? updatedRating : rating))
    );
    setEditingId(null);
    setCurrentRating(0);
    setReviewText('');
  };

  const handleDeleteRating = async (id) => {
    await deleteRating(id);
    setRatings((prev) => prev.filter((rating) => rating.id !== id));
  };

  const startEditing = (rating) => {
    setEditingId(rating.id);
    setCurrentRating(rating.rating);
    setReviewText(rating.reviewText);
  };

  return (
    <div>
      <h2>Rate Service Provider</h2>
      <div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review"
        />
        <div>
          <label>Rating:</label>
          <select value={currentRating} onChange={(e) => setCurrentRating(parseInt(e.target.value))}>
            <option value="0">Select</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>
        </div>
        <button onClick={editingId ? handleUpdateRating : handleAddRating}>
          {editingId ? 'Update Rating' : 'Submit Rating'}
        </button>
      </div>
      <div>
        <h3>Existing Ratings</h3>
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>
              <p>{'⭐'.repeat(rating.rating)}</p>
              <p>{rating.reviewText}</p>
              <button onClick={() => startEditing(rating)}>Edit</button>
              <button onClick={() => handleDeleteRating(rating.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RatingsComponent;
