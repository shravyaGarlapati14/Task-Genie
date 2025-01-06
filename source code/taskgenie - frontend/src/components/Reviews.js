import React, { useEffect, useState } from 'react';
import { getAllBookings } from './indexedDB'; // Assuming the getAllBookings function is available
import '../css/reviews.css'; 

const Reviews = ({ sampleReviews = [], isHomePage = false, refreshTrigger }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const bookings = await getAllBookings();
        console.log('Fetched bookings:', bookings);
        
        const allReviews = bookings.filter(
          (booking) => booking.review && booking.review.rating
        );
        console.log('Filtered reviews:', allReviews);

        // Calculate the average rating
        const totalRating = allReviews.reduce((sum, booking) => sum + booking.review.rating, 0);
        const avgRating = allReviews.length > 0 ? (totalRating / allReviews.length).toFixed(1) : 0;
        setAverageRating(avgRating);

        // Map over the reviews and extract the necessary fields
        setReviews(
          allReviews.map((booking) => ({
            client: booking.customerName,
            rating: booking.review.rating,
            text: booking.review.reviewText,
            task: booking.taskName,
            date: booking.date,
          }))
        );
      } catch (error) {
        console.error('Error fetching reviews', error);
        setReviews(sampleReviews); // Fallback to sample reviews
      }
    };

    console.log('Fetching reviews with refreshTrigger:', refreshTrigger);
    fetchReviews();
  }, [refreshTrigger, sampleReviews]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayedReviews = showMore ? reviews : reviews.slice(0, 3);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {'⭐'.repeat(fullStars)}
        {halfStar && '⭐️'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="reviews-section">
      <h2 className='reviewheading '>Client Reviews</h2>
      
      <div className="main-rating">
        <h3 className="or" >Overall Rating: <span className="rating-text">({averageRating}/5) </span> </h3>
        <div className="rating-stars">
          {renderStars(averageRating)}
        </div>
      </div>

      {reviews.length > 0 ? (
        <>
          <ul className="review-list">
            {displayedReviews.map((review, index) => (
              <li key={index} className="review-item">
                <h3 className='reviewheadingclient'>{review.client}</h3>
                <p className='reviewpara'>
                  <strong className='reviewstrong'>Task:</strong> {review.task} | <strong className='reviewstrong'>Date:</strong> {review.date}
                </p>
                <p className='reviewpara'>
                  <strong className='reviewstrong'>Rating:</strong> {'⭐'.repeat(review.rating)} ({review.rating}/5)
                </p>
                <p className='reviewpara'>
                  <strong className='reviewstrong'>Review:</strong> {review.text}
                </p>
              </li>
            ))}
          </ul>
          <button className="read-more" onClick={handleShowMore}>
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        </>
      ) : (
        <p className='reviewparanot'>No reviews available.</p>
      )}
    </div>
  );
};

export default Reviews;
