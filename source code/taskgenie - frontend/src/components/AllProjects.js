import { Link } from 'react-router-dom';
import React, { useState,useEffect,useMemo } from 'react';
import Navbar from './Navbar'; // Import the Navbar
import Footer from './Footer';
import '../css/AllProjects.css'; 
import { FaFilter } from 'react-icons/fa'; // Import filter icon from react-icons
import p1 from "../Assets/furniture_assembly.webp";
import p2 from "../Assets/mount_tv.webp";
import p3 from "../Assets/help_moving.jpg";
import p4 from "../Assets/house-cleaning.jpg";
import p5 from "../Assets/plumber-working.jpg";
import p6 from "../Assets/Electrical-Repairs.jpg";
import p7 from "../Assets/gardening.jpg";
import p8 from "../Assets/carpenter_services.jpg";
import p9 from "../Assets/window_installation.png";
import p10 from "../Assets/appliance_repair.jpg";
import p11 from "../Assets/roofing_services.webp";
import p12 from "../Assets/pest_control.webp";
import p13 from "../Assets/landscaping.webp";
import p14 from "../Assets/pressure_washing.jpeg";
import p15 from "../Assets/siding_repair.jpeg";

const AllProjects = () => {
  const allProjects= useMemo(() =>  [
    { id: 1, title: "Furniture Assembly", price: 49, popularity: 5, imgSrc: p1 },
    { id: 2, title: "Mount a TV", price: 69, popularity: 4, imgSrc: p2 },
    { id: 3, title: "Help Moving", price: 67, popularity: 3, imgSrc: p3 },
    { id: 4, title: "House Cleaning", price: 59, popularity: 2, imgSrc: p4 },
    { id: 5, title: "Plumbing Repairs", price: 75, popularity: 1, imgSrc: p5 },
    { id: 6, title: "Electrical Repairs", price: 80, popularity: 6, imgSrc: p6 },
    { id: 7, title: "Gardening Services", price: 40, popularity: 3, imgSrc: p7 },
    { id: 8, title: "Carpentry Work", price: 55, popularity: 2, imgSrc: p8 },
    { id: 9, title: "Window Installation", price: 150, popularity: 5, imgSrc: p9 },
    { id: 10, title: "Appliance Repair", price: 100, popularity: 4, imgSrc: p10 },
    { id: 11, title: "Roofing Services", price: 250, popularity: 1, imgSrc: p11 },
    { id: 12, title: "Pest Control", price: 90, popularity: 3, imgSrc: p12 },
    { id: 13, title: "Landscaping", price: 60, popularity: 5, imgSrc: p13 },
    { id: 14, title: "Pressure Washing", price: 70, popularity: 2, imgSrc: p14 },
    { id: 15, title: "Siding Repair", price: 120, popularity: 6, imgSrc: p15 },
  ], []);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false); // Toggle filter visibility

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters); // Toggle filters display
  };

  // Filter projects based on search query and sort options
  const filteredProjects = allProjects
    .filter((project) => project.title.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      if (sortOption === 'asc') return a.title.localeCompare(b.title);
      if (sortOption === 'desc') return b.title.localeCompare(a.title);
      if (sortOption === 'price-asc') return a.price - b.price; // Sort by price ascending
      if (sortOption === 'price-desc') return b.price - a.price; // Sort by price descending
      if (sortOption === 'popularity') return b.popularity - a.popularity; // Sort by popularity (higher first)
      return 0; // Default order
    });

  return (
    <div className="all-projects-container">
      {/* <Navbar />  */}
      <br></br><br></br><br></br>
      <div className="header-container">   <br></br><br></br>

        {/* <h2 className='heading'>All Projects</h2> */}
        
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search for projects..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
          className="search-bar" 
        />

        {/* Filter Symbol */}
        <button className="filter-button" onClick={handleFilterClick}>
          <FaFilter /> {/* Display filter icon */}
        </button>

        {/* Sort Options - Show when filter button is clicked */}
        {showFilters && (
          <div className="filter-options">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="default">Select...</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              {/* <option value="popularity">Popularity</option> */}
            </select>
          </div>
        )}
      </div>
      <br />
      <div className="projectslist">
        {filteredProjects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="projectcard">
            <img src={project.imgSrc} alt={project.title} className="projecti" />
            <div className="projectinfo">
              <h3>{project.title}</h3>
              <p>Price: ${project.price}</p> {/* Display price with a dollar sign */}
            </div>
          </Link>
        ))}
      </div>
      <br></br><br></br>
      <Footer />
    </div>
  );
};

export default AllProjects;
