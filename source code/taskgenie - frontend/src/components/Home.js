import React, { useState, useEffect, useRef } from 'react';
import Carousel from './Carousel';
import Facts from './Facts';
import Features from './Features';
import PopularProjects from './PopularProjects';
import PopularServices from './PopularServices';
import Footer from './Footer';
import { getAllBookings } from './indexedDB';
import { getAllAds, deleteAdFromDB } from './indexedDB';
import './Navbar.css';
import '../css/Homeads.css';
// import '../css/reviews.css';

const Home = () => {
  const [ads, setAds] = useState([]);
  const [realReviews, setRealReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const reviewsContainerRef = useRef(null);

  const sampleReviews = [
    {
      client: 'MOHITH',
      rating: 5,
      text: "Absolutely stunning work! The walls look vibrant and flawless.",
      task: 'Interior Painting',
      date: '2024-10-10',
    },

    {
      client: 'Vamsi Reddy',
      rating: 5,
      text: "Exceptional craftsmanship! Every detail was handled with precision and care. The furniture they built has completely transformed our space. Top-notch service!",
      task: 'Carpentry Work',
      date: '2024-09-06',
    },
    {
      client: 'P.M.R',
      rating: 4,
      text: "Great service! The electrician quickly resolved our issue and ensured everything was safe and functional",
      task: 'Electrical Help',
      date: '2024-11-12',
    },
    {
      client: 'mrp369',
      rating: 4,
      text: "The garden looks fresh and lively after their work. The team added some beautiful design elements, but a few finishing touches could be improved. Overall, a solid experience!",
      task: 'Landscaping',
      date: '2024-12-10',
    },
  ];


  const sampleAds = [
    {
      id: 1,
      title: 'Premium Lawn Care',
      description: 'Professional lawn care services to keep your garden looking lush!',
      serviceType: 'Landscaping',
      image: 'https://cdn.squaresigns.com/images/templates/thumb/medium/1.5x1-premium-lawn-care.png',
      // expiration: '2024-12-31T23:59:59',
      paid: true,
    },
    {
      id: 2,
      title: 'House Painting Service',
      description: 'Give your home a fresh new look with our expert painting services.',
      serviceType: 'Painting',
      image: 'https://www.deccanclap.com/uploads/services/best-home-painting-and-waterproofing-services-in-ghaziabad.png',
      // expiration: '2024-12-25T23:59:59',
      paid: false,
    },
    {
      id: 3,
      title: 'Electrical Troubleshooting',
      description: 'Get your electrical issues fixed fast and efficiently by our expert electricians.',
      serviceType: 'Electrical',
      image: 'https://www.canoelectric.com/images/banners-commercial-services-electrical-troubleshooting.jpg',
      // expiration: '2024-12-20T23:59:59',
      paid: true,
    },
  ];

  const handleNext = () => {
    reviewsContainerRef.current.scrollBy({
      left: 320, // Width of one card + margin
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    reviewsContainerRef.current.scrollBy({
      left: -320, // Width of one card + margin
      behavior: "smooth",
    });
  };

  
  useEffect(() => {
    // Fetch and display ads
    const fetchAndFilterAds = async () => {
      const allAds = await getAllAds();
      const currentDate = new Date();
      const validAds = allAds.filter((ad) => new Date(ad.expiration) > currentDate);
      setAds(validAds);
      validAds.forEach(scheduleAdRemoval);
    };

    // Fetch and display reviews
    const fetchReviews = async () => {
      try {
        const bookings = await getAllBookings();
        const allReviews = bookings.filter(
          (booking) => booking.review && booking.review.rating
        );

        // Calculate average rating
        const totalRating = allReviews.reduce((sum, review) => sum + review.review.rating, 0);
        const avgRating = allReviews.length > 0 ? (totalRating / allReviews.length).toFixed(1) : 0;
        setAverageRating(avgRating);

        // Add dynamic reviews
        setRealReviews(
          allReviews.map((booking) => ({
            client: booking.customerName,
            rating: booking.review.rating,
            text: booking.review.reviewText,
            task: booking.taskName,
            date: booking.date,
          }))
        );
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchAndFilterAds();
    fetchReviews();
  }, []);

  const scheduleAdRemoval = (ad) => {
    const timeUntilExpiration = new Date(ad.expiration) - new Date();
    if (timeUntilExpiration > 0) {
      setTimeout(() => {
        deleteAdFromDB(ad.id).then(() => {
          setAds((prev) => prev.filter((item) => item.id !== ad.id));
        });
      }, timeUntilExpiration);
    }
  };

  // Combine sample reviews with real reviews
  const combinedReviews = [...sampleReviews, ...realReviews];
  const combinedAds = [...sampleAds, ...ads];

  return (
    <div className="home-container">
      <Carousel />
      <Facts />
      <Features />
      <hr />
      <PopularProjects />
      <hr />
      <PopularServices />
      <hr />
      <div className="adshsection">
        <h2 className="adhfd">Featured Ads</h2>
        {combinedAds.length > 0 ? (
          <div className="ad-carousel">
            {combinedAds.map((ad) => (
              <div key={ad.id} className="adhcard">
                {ad.image && <img className="adhimg" src={ad.image} alt={ad.title} />}
                <h4 className="adhtitle">{ad.title}</h4>
                <p className="adhdesc">{ad.description}</p>
                <p className="adhtype">
                  <strong>Type:</strong> {ad.serviceType}
                </p>
                <p className="adhexpires">
                  {/* <strong>Expires:</strong> {new Date(ad.expiration).toLocaleString()} */}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-ads-message">No ads to display</p>
        )}
      </div>
      <div className="reviews-section">
      <h2 className="reviews-head">What Our Customers Say</h2>
      <div className="reviews-carousel-container">
        {/* Backward button */}
        <button className="arrow-button left-arrow" onClick={handlePrev}>
          ◀
        </button>

        {/* Reviews carousel */}
        <div className="reviews-carousel" ref={reviewsContainerRef}>
          {combinedReviews.map((review, index) => (
            <div key={index} className="review-card">
              <h3 className="review-client">{review.client}</h3>
              <p className="review-text">"{review.text}"</p>
              <p className="review-meta">
                <strong>Task:</strong> {review.task} | <strong>Date:</strong>{" "}
                {review.date}
              </p>
              <p className="review-rating">{'⭐'.repeat(review.rating)}</p>
            </div>
          ))}
        </div>

        {/* Forward button */}
        <button className="arrow-button right-arrow" onClick={handleNext}>
          ▶
        </button>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default Home;
