import React from 'react';
import { Link } from 'react-router-dom';
import '../css/PopularServices.css'; 
import s6 from '../Assets/handyman services/Drywall_Repair.webp';
import s30 from '../Assets/Moving services/packing-and-unpacking.jpg';
import s1 from '../Assets/furniture_assembly.webp';
import s51 from '../Assets/Painting and Decorating Services/Interior Painting.jpg';
import s44 from '../Assets/Furniture services/Rearranging Furniture.jpg';
import s3 from '../Assets/handyman services/Electrical_Help.webp';

const PopularServices = () => {
  const services = [
    { id: 6, title: "Drywall Repair", price: 85, imgSrc: s6 },
    { id: 44, title: "Rearranging Furniture", price: "$50", imgSrc: s44 },
    { id: 1, title: "Furniture Assembly", price: 49, imgSrc: s1 },
    { id: 51, title: "Interior Painting", price: "$300", imgSrc: s51 },
    { id: 3, title: "Electrical Help", price: 67, imgSrc: s3 },
    { id: 30, title: "Packing and Unpacking", price: "$150", imgSrc: s30 },

  ];

  return (
    <div className="popular-services-section">
      <h2 className="facts section-title">Popular Services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <Link key={service.id} to={`/services/${service.id}`}>
            <div className="service-card">
              <img src={service.imgSrc} alt={service.title} className="service-image" />
              <div className="service-info">
                <h3 className='facts'>{service.title}</h3>
                {/* <p>Service starting at {service.price}</p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/servicesall" className="more-services-btn">More Services</Link>
    </div>
  );
};

export default PopularServices;
