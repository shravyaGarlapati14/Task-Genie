import React, { useState,useEffect,useMemo } from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported
import "../css/AllServices.css"; // Add CSS styles here
import Navbar from './Navbar'; // Import the Navbar
import Footer from './Footer';
import { FaFilter } from 'react-icons/fa'; // Import filter icon from react-icons

import s1 from '../Assets/furniture_assembly.webp';
import s2 from '../Assets/handyman services/TV_Mounting.jpg';
import s3 from '../Assets/handyman services/Electrical_Help.webp';
import s4 from '../Assets/handyman services/Plumbing.jpeg';
import s5 from '../Assets/handyman services/Window_Repair.jpg';
import s6 from '../Assets/handyman services/Drywall_Repair.webp';
import s7 from '../Assets/handyman services/Ceiling_Fan_Installation.jpg';
import s8 from '../Assets/handyman services/Home Repairs.jpg';
import s9 from '../Assets/handyman services/Shelf Installation.jpg';
import s10 from '../Assets/handyman services/Smart Home Installation.jpeg';
import s11 from '../Assets/Cleaning Services/House Cleaning.jpg';
import s12 from '../Assets/Cleaning Services/Deep Cleaning.jpeg';
import s13 from '../Assets/Cleaning Services/Spring Cleaning.jpeg';
import s14 from '../Assets/Cleaning Services/Move-In-Move-Out Cleaning.jpg';
import s15 from '../Assets/Cleaning Services/Office Cleaning.webp';
import s16 from '../Assets/Cleaning Services/Window Cleaning.jpg';
import s17 from '../Assets/Cleaning Services/Carpet Cleaning.jpg';
import s18 from '../Assets/Cleaning Services/Post-Renovation Cleaning.jpg';
import s19 from '../Assets/Cleaning Services/Upholstery Cleaning.webp';
import s20 from '../Assets/Cleaning Services/Laundry Services.jpg';
import s21 from '../Assets/Moving services/Local Moving.jpg';
import s22 from '../Assets/Moving services/Furniture Removal.jpg';
import s23 from '../Assets/Moving services/Junk Removal.jpg';
import s24 from '../Assets/Moving services/Heavy Lifting.webp';
import s25 from '../Assets/Moving services/Storage Services.avif';
import s26 from '../Assets/Moving services/Truck Assistance.jpg';
import s27 from '../Assets/Moving services/Disposal Services.jpg';
import s28 from '../Assets/Moving services/Rearranging Furniture.jpg';
import s29 from '../Assets/Moving services/long distance moving.jpg';
import s30 from '../Assets/Moving services/packing-and-unpacking.jpg';
import s31 from '../Assets/Yard Work Services/Lawn Mowing.jpg';
import s32 from '../Assets/Yard Work Services/Leaf Removal.jpg';
import s33 from '../Assets/Yard Work Services/Snow Removal.webp';
import s34 from '../Assets/Yard Work Services/Gutter Cleaning.jpeg';
import s35 from '../Assets/Yard Work Services/Tree Trimming.jpg';
import s36 from '../Assets/Yard Work Services/Garden Maintenance.jpg';
import s37 from '../Assets/Yard Work Services/Fence Repair.jpg';
import s38 from '../Assets/Yard Work Services/Deck Staining.avif';
import s39 from '../Assets/Yard Work Services/Sprinkler Installation.jpg';
import s40 from '../Assets/Yard Work Services/Weeding.jpg';
import s41 from '../Assets/Furniture services/Furniture Assembly.webp';
import s42 from '../Assets/Furniture services/Furniture Delivery.jpg';
import s43 from '../Assets/Furniture services/Furniture Disassembly.webp';
import s44 from '../Assets/Furniture services/Rearranging Furniture.jpg';
import s45 from '../Assets/Furniture services/Custom Furniture Building.jpg';
import s46 from '../Assets/Furniture services/Furniture Repair.jpg';
import s47 from '../Assets/Furniture services/Upholstery Cleaning.jpeg';
import s48 from '../Assets/Furniture services/Outdoor Furniture Assembly.webp';
import s49 from '../Assets/Furniture services/Cabinet Installation.jpg';
import s50 from '../Assets/Furniture services/Wall Mount Installation.jpg';
import s51 from '../Assets/Painting and Decorating Services/Interior Painting.jpg';
import s52 from '../Assets/Painting and Decorating Services/Exterior Painting.webp';
import s53 from '../Assets/Painting and Decorating Services/Wallpaper Installation.jpg';
import s54 from '../Assets/Painting and Decorating Services/Decorative Wall Treatments.webp';
import s55 from '../Assets/Painting and Decorating Services/Furniture Painting.png';
import s56 from '../Assets/Painting and Decorating Services/Hanging Pictures and Mirrors.webp';
import s57 from '../Assets/Painting and Decorating Services/Mural Painting.webp';
import s58 from '../Assets/Painting and Decorating Services/Crown Molding Installation.jpg';
import s59 from '../Assets/Painting and Decorating Services/Cabinet Painting.jpg';
import s60 from '../Assets/Painting and Decorating Services/Accent Wall Design.jpg';
import s61 from '../Assets/Home Renovation Services/Bathroom Remodeling.jpg';
import s62 from '../Assets/Home Renovation Services/Kitchen Renovation.jpg';
import s63 from '../Assets/Home Renovation Services/Flooring Installation.jpg';
import s64 from '../Assets/Home Renovation Services/Roof Repair.png';
import s65 from '../Assets/Home Renovation Services/Deck Building.jpg';
import s66 from '../Assets/Home Renovation Services/Basement Waterproofing.webp';
import s67 from '../Assets/window_installation.png';
import s68 from '../Assets/Home Renovation Services/Garage Door Installation.webp';
import s69 from '../Assets/Home Renovation Services/Attic Insulation.jpg';
import s70 from '../Assets/Home Renovation Services/Siding Repair.jpg';
import s71 from '../Assets/Tech and Gadget Services/TV Mounting.png';
import s72 from '../Assets/Tech and Gadget Services/Wi-Fi Setup.webp';
import s73 from '../Assets/Tech and Gadget Services/Smart Home Setup.jpg';
import s74 from '../Assets/Tech and Gadget Services/Computer Repair.jpg';
import s75 from '../Assets/Tech and Gadget Services/Printer Installation.jpg';
import s76 from '../Assets/Tech and Gadget Services/Home Theater Installation.jpg';
import s77 from '../Assets/Tech and Gadget Services/Device Setup.jpg';
import s78 from '../Assets/Tech and Gadget Services/Data Backup.png';
import s79 from '../Assets/Tech and Gadget Services/Security Camera Installation.webp';
import s80 from '../Assets/Tech and Gadget Services/Network Troubleshooting.webp';
import s81 from '../Assets/Virtual Assistance Services/Data Entry.png';
import s82 from '../Assets/Virtual Assistance Services/Email Management.jpg';
import s83 from '../Assets/Virtual Assistance Services/Calendar Management.png';
import s84 from '../Assets/Virtual Assistance Services/Online Research.jpg';
import s85 from '../Assets/Virtual Assistance Services/Social Media Management.webp';
import s86 from '../Assets/Virtual Assistance Services/Customer Support.webp';
import s87 from '../Assets/Virtual Assistance Services/Bookkeeping.webp';
import s88 from '../Assets/Virtual Assistance Services/Content Writing.jpg';
import s89 from '../Assets/Virtual Assistance Services/Graphic Design.jpg';
import s90 from '../Assets/Virtual Assistance Services/Event Coordination.jpg';
import s91 from '../Assets/Office Services/Office Cleaning.png';
import s92 from '../Assets/Office Services/Office Furniture Assembly.png';
import s93 from '../Assets/Office Services/Office Moving.webp';
import s94 from '../Assets/Office Services/Tech Setup.jpg';
import s95 from '../Assets/Office Services/Conference Room Setup.webp';
import s96 from '../Assets/Office Services/Document Shredding.png';
import s97 from '../Assets/Office Services/Supply Delivery.webp';
import s98 from '../Assets/Office Services/Office Organization.jpg';
import s99 from '../Assets/Office Services/Mailing Services.jpg';
import s100 from '../Assets/Office Services/Office Interior Design.png';

const AllServices = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState('');

  const services = useMemo(() => ({
    all: [
      { id: 11, title: "House Cleaning", price: "$49", imgSrc: s11 },
      { id: 12, title: "Deep Cleaning", price: "$89", imgSrc: s12 },
      { id: 13, title: "Spring Cleaning", price: "$99", imgSrc: s13 },
      { id: 14, title: "Move-In/Move-Out Cleaning", price: "$119", imgSrc: s14 },
      { id: 15, title: "Office Cleaning", price: "$79", imgSrc: s15 },
      { id: 16, title: "Window Cleaning", price: "$39", imgSrc: s16 },
      { id: 17, title: "Carpet Cleaning", price: "$99", imgSrc: s17 },
      { id: 18, title: "Post-Renovation Cleaning", price: "$149", imgSrc: s18 },
      { id: 19, title: "Upholstery Cleaning", price: "$89", imgSrc: s19 },
      { id: 20, title: "Laundry Services", price: "$29", imgSrc: s20 },
      { id: 1, title: "Furniture Assembly", price: 49, imgSrc: s1 },
      { id: 2, title: "TV Mounting", price: 69, imgSrc: s2 },
      { id: 3, title: "Electrical Help", price: 67, imgSrc: s3 },
      { id: 4, title: "Plumbing", price: 59, imgSrc: s4 },
      { id: 5, title: "Window Repair", price: 75, imgSrc: s5 },
      { id: 6, title: "Drywall Repair", price: 85, imgSrc: s6 },
      { id: 7, title: "Ceiling Fan Installation", price: 99, imgSrc: s7 },
      { id: 8, title: "Home Repairs", price: 60, imgSrc: s8 },
      { id: 9, title: "Shelf Installation", price: 50, imgSrc: s9 },
      { id: 10, title: "Smart Home Installation", price: 150, imgSrc: s10 },
      
    
    ],
    handymen: [
      { id: 1, title: "Furniture Assembly", price: 49, imgSrc: s1 },
      { id: 2, title: "TV Mounting", price: 69, imgSrc: s2 },
      { id: 3, title: "Electrical Help", price: 67, imgSrc: s3 },
      { id: 4, title: "Plumbing", price: 59, imgSrc: s4 },
      { id: 5, title: "Window Repair", price: 75, imgSrc: s5 },
      { id: 6, title: "Drywall Repair", price: 85, imgSrc: s6 },
      { id: 7, title: "Ceiling Fan Installation", price: 99, imgSrc: s7 },
      { id: 8, title: "Home Repairs", price: 60, imgSrc: s8 },
      { id: 9, title: "Shelf Installation", price: 50, imgSrc: s9 },
      { id: 10, title: "Smart Home Installation", price: 150, imgSrc: s10 },
    ],
    cleaning: [
      { id: 11, title: "House Cleaning", price: "$49", imgSrc: s11 },
      { id: 12, title: "Deep Cleaning", price: "$89", imgSrc: s12 },
      { id: 13, title: "Spring Cleaning", price: "$99", imgSrc: s13 },
      { id: 14, title: "Move-In/Move-Out Cleaning", price: "$119", imgSrc: s14 },
      { id: 15, title: "Office Cleaning", price: "$79", imgSrc: s15 },
      { id: 16, title: "Window Cleaning", price: "$39", imgSrc: s16 },
      { id: 17, title: "Carpet Cleaning", price: "$99", imgSrc: s17 },
      { id: 18, title: "Post-Renovation Cleaning", price: "$149", imgSrc: s18 },
      { id: 19, title: "Upholstery Cleaning", price: "$89", imgSrc: s19 },
      { id: 20, title: "Laundry Services", price: "$29", imgSrc: s20 },
    ],
    
    moving: [
      { id: 21, title: "Local Moving", price: "$199", imgSrc: s21 },
      { id: 22, title: "Furniture Removal", price: "$199", imgSrc: s22 },
      { id: 23, title: "Junk Removal", price: "$150", imgSrc: s23 },
      { id: 24, title: "Heavy Lifting", price: "$75", imgSrc: s24 },
      { id: 25, title: "Storage Services", price: "$50", imgSrc: s25 },
      { id: 26, title: "Truck Assistance", price: "$100", imgSrc: s26 },
      { id: 27, title: "Disposal Services", price: "$80", imgSrc: s27 },
      { id: 28, title: "Rearranging Furniture", price: "$50", imgSrc: s28 },
      { id: 29, title: "Long-Distance Moving", price: "$499", imgSrc: s29 },
      { id: 30, title: "Packing and Unpacking", price: "$150", imgSrc: s30 },
    ],
    
    yardWork: [
      { id: 31, title: "Lawn Mowing", price: "$35", imgSrc: s31 },
      { id: 32, title: "Leaf Removal", price: "$50", imgSrc: s32 },
      { id: 33, title: "Snow Removal", price: "$60", imgSrc: s33 },
      { id: 34, title: "Gutter Cleaning", price: "$70", imgSrc: s34 },
      { id: 35, title: "Tree Trimming", price: "$80", imgSrc: s35 },
      { id: 36, title: "Garden Maintenance", price: "$45", imgSrc: s36 },
      { id: 37, title: "Fence Repair", price: "$150", imgSrc: s37 },
      { id: 38, title: "Deck Staining", price: "$120", imgSrc: s38 },
      { id: 39, title: "Sprinkler Installation", price: "$200", imgSrc: s39 },
      { id: 40, title: "Weeding", price: "$30", imgSrc: s40 },
    ],
    
    furniture: [
      { id: 41, title: "Furniture Assembly", price: "$49", imgSrc: s41 },
      { id: 42, title: "Furniture Delivery", price: "$70", imgSrc: s42 },
      { id: 43, title: "Furniture Disassembly", price: "$60", imgSrc: s43 },
      { id: 44, title: "Rearranging Furniture", price: "$50", imgSrc: s44 },
      { id: 45, title: "Custom Furniture Building", price: "$300", imgSrc: s45 },
      { id: 46, title: "Furniture Repair", price: "$100", imgSrc: s46 },
      { id: 47, title: "Upholstery Cleaning", price: "$89", imgSrc: s47 },
      { id: 48, title: "Outdoor Furniture Assembly", price: "$80", imgSrc: s48 },
      { id: 49, title: "Cabinet Installation", price: "$150", imgSrc: s49 },
      { id: 50, title: "Wall Mount Installation", price: "$40", imgSrc: s50 },
    ],
    
    paintingAndDecorating: [
      { id: 51, title: "Interior Painting", price: "$300", imgSrc: s51 },
      { id: 52, title: "Exterior Painting", price: "$400", imgSrc: s52 },
      { id: 53, title: "Wallpaper Installation", price: "$200", imgSrc: s53 },
      { id: 54, title: "Decorative Wall Treatments", price: "$250", imgSrc: s54 },
      { id: 55, title: "Furniture Painting", price: "$100", imgSrc: s55 },
      { id: 56, title: "Hanging Pictures and Mirrors", price: "$50", imgSrc: s56 },
      { id: 57, title: "Mural Painting", price: "$350", imgSrc: s57 },
      { id: 58, title: "Crown Molding Installation", price: "$200", imgSrc: s58 },
      { id: 59, title: "Cabinet Painting", price: "$150", imgSrc: s59 },
      { id: 60, title: "Accent Wall Design", price: "$100", imgSrc: s60 },
    ],
    
    homeRenovation: [
      { id: 61, title: "Bathroom Remodeling", price: "$500", imgSrc: s61 },
      { id: 62, title: "Kitchen Renovation", price: "$1000", imgSrc: s62 },
      { id: 63, title: "Flooring Installation", price: "$300", imgSrc: s63 },
      { id: 64, title: "Roof Repair", price: "$400", imgSrc: s64 },
      { id: 65, title: "Deck Building", price: "$600", imgSrc: s65 },
      { id: 66, title: "Basement Waterproofing", price: "$500", imgSrc: s66 },
      { id: 67, title: "Window Replacement", price: "$250", imgSrc: s67 },
      { id: 68, title: "Garage Door Installation", price: "$300", imgSrc: s68 },
      { id: 69, title: "Attic Insulation", price: "$200", imgSrc: s69 },
      { id: 70, title: "Siding Repair", price: "$350", imgSrc: s70 },
    ],
    
    techAndGadget: [
      { id: 71, title: "TV Mounting", price: "$69", imgSrc: s71 },
      { id: 72, title: "Wi-Fi Setup", price: "$100", imgSrc: s72 },
      { id: 73, title: "Smart Home Setup", price: "$150", imgSrc: s73 },
      { id: 74, title: "Computer Repair", price: "$75", imgSrc: s74 },
      { id: 75, title: "Printer Installation", price: "$50", imgSrc: s75 },
      { id: 76, title: "Home Theater Installation", price: "$200", imgSrc: s76 },
      { id: 77, title: "Device Setup", price: "$50", imgSrc: s77 },
      { id: 78, title: "Data Backup", price: "$30", imgSrc: s78 },
      { id: 79, title: "Security Camera Installation", price: "$250", imgSrc: s79 },
      { id: 80, title: "Network Troubleshooting", price: "$75", imgSrc: s80 },
    ],
    
    virtualAssistance: [
      { id: 81, title: "Data Entry", price: "$25", imgSrc: s81 },
      { id: 82, title: "Email Management", price: "$30", imgSrc: s82 },
      { id: 83, title: "Calendar Management", price: "$25", imgSrc: s83 },
      { id: 84, title: "Online Research", price: "$40", imgSrc: s84 },
      { id: 85, title: "Social Media Management", price: "$50", imgSrc: s85 },
      { id: 86, title: "Customer Support", price: "$30", imgSrc: s86 },
      { id: 87, title: "Bookkeeping", price: "$40", imgSrc: s87 },
      { id: 88, title: "Content Writing", price: "$50", imgSrc: s88 },
      { id: 89, title: "Graphic Design", price: "$75", imgSrc: s89 },
      { id: 90, title: "Event Coordination", price: "$50", imgSrc: s90 },
    ],
    
    officeServices: [
      { id: 91, title: "Office Cleaning", price: "$79", imgSrc: s91 },
      { id: 92, title: "Office Furniture Assembly", price: "$150", imgSrc: s92 },
      { id: 93, title: "Office Moving", price: "$250", imgSrc: s93 },
      { id: 94, title: "Tech Setup", price: "$100", imgSrc: s94 },
      { id: 95, title: "Conference Room Setup", price: "$150", imgSrc: s95 },
      { id: 96, title: "Document Shredding", price: "$75", imgSrc: s96 },
      { id: 97, title: "Supply Delivery", price: "$50", imgSrc: s97 },
      { id: 98, title: "Office Organization", price: "$100", imgSrc: s98 },
      { id: 99, title: "Mailing Services", price: "$30", imgSrc: s99 },
      { id: 100, title: "Office Interior Design", price: "$200", imgSrc: s100 },
    ],
    
    
  
  }), []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);



  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

 


  return (
    <div>

            <div className="header-container">   <br></br><br></br>
</div>
<br />
    <div className="all-services-container">

      <div className="sidebar">
        <h3>Filter by Service Type</h3>
        <div className="service-filter">
          <label>
            <input
              type="radio"
              value="all"
              checked={selectedCategory === "all"}
              onChange={handleCategoryChange}
            />
            All Services
          </label>
          <label>
            <input
              type="radio"
              value="handymen"
              checked={selectedCategory === "handymen"}
              onChange={handleCategoryChange}
            />
            Handymen Services
          </label>
          <label>
            <input
              type="radio"
              value="cleaning"
              checked={selectedCategory === "cleaning"}
              onChange={handleCategoryChange}
            />
            Cleaning Services
          </label>
          <label>
            <input
              type="radio"
              value="moving"
              checked={selectedCategory === "moving"}
              onChange={handleCategoryChange}
            />
            Moving Services
          </label>
          <label>
            <input
              type="radio"
              value="yardWork"
              checked={selectedCategory === "yardWork"}
              onChange={handleCategoryChange}
            />
          YardWork Services
          </label>
          <label>
            <input
              type="radio"
              value="furniture"
              checked={selectedCategory === "furniture"}
              onChange={handleCategoryChange}
            />
            Furniture Services
          </label>
          <label>
            <input
              type="radio"
              value="paintingAndDecorating"
              checked={selectedCategory === "paintingAndDecorating"}
              onChange={handleCategoryChange}
            />
            PaintingAndDecorating Services
            </label>
          <label>
            <input
              type="radio"
              value="homeRenovation"
              checked={selectedCategory === "homeRenovation"}
              onChange={handleCategoryChange}
            />
            HomeRenovation Services
          </label>
          <label>
            <input
              type="radio"
              value="techAndGadget"
              checked={selectedCategory === "techAndGadget"}
              onChange={handleCategoryChange}
            />
          TechAndGadget Services
          </label>
          <label>
            <input
              type="radio"
              value="virtualAssistance"
              checked={selectedCategory === "virtualAssistance"}
              onChange={handleCategoryChange}
            />
            VirtualAssistance Services
          </label>
          <label>
            <input
              type="radio"
              value="officeServices"
              checked={selectedCategory === "officeServices"}
              onChange={handleCategoryChange}
            />
            OfficeServices Services
          </label>
                  </div>
      </div>

      <div className="services-list">

  {services[selectedCategory].map((service) => (
    <Link key={service.id} to={`/services/${service.id}`} className=" animate projectcard">
  <img src={service.imgSrc} alt={service.title} className="projecti"  /> 
  <div className="projectinfo">

  <h4>{service.title}</h4>
  <p>Starting at {service.price}</p></div>
</Link>

  ))}
</div>

    </div>
    <br></br><br></br>
    <Footer />
    </div>

  );
};

export default AllServices;
