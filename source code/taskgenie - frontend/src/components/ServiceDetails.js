import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Modal from 'react-modal';
import '../css/ServiceDetails.css'; // Add relevant styles for service detail pages
import hiw1 from '../Assets/hiw1.jpg';import hiw2 from '../Assets/hiw2.jpg';
import hiw3 from '../Assets/hiw3.jpg';
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
Modal.setAppElement('#root');

const ServiceDetails = () => {
  const { serviceId } = useParams();

  const serviceData = {
    "1": {
      title: "Furniture Assembly",
      price: "$50",
      description: "Professional assembly of all kinds of furniture, ensuring durability and safety.",
      image: s1,
    },
    "2": {
      title: "TV Mounting",
      price: "$69",
      description: "We securely mount your TV on any wall type, ensuring proper alignment and safety.",
      image: s2,
    },
    "3": {
      title: "Electrical Help",
      price: "$80",
      description: "Licensed electricians available for small repairs and installations.",
      image: s3,
    },
    "4": {
      title: "Plumbing",
      price: "$75",
      description: "From fixing leaks to installing new fixtures, our licensed plumbers handle all types of repairs.",
      image: s4,
    },
    "5": {
      title: "Window Repair",
      price: "$60",
      description: "Expert window repair services to fix broken glass or improve insulation.",
      image: s5,
    },
    "6": {
      title: "Drywall Repair",
      price: "$55",
      description: "Patching up holes or cracks in drywall with precision and care.",
      image: s6,
    },
    "7": {
      title: "Ceiling Fan Installation",
      price: "$70",
      description: "Installation of ceiling fans, including electrical wiring and secure mounting.",
      image: s7,
    },
    "8": {
      title: "Home Repairs",
      price: "$85",
      description: "General home repair services for small and large tasks around the house.",
      image: s8,
    },
    "9": {
      title: "Shelf Installation",
      price: "$40",
      description: "Secure installation of shelves, ensuring they are level and properly anchored.",
      image: s9,
    },
    "10": {
      title: "Smart Home Installation",
      price: "$100",
      description: "Set up of smart home devices including thermostats, lights, and security systems.",
      image: s10,
    },
    "11": {
    title: "House Cleaning",
    price: "$49",
    description: "Comprehensive cleaning of your home, including dusting, vacuuming, and mopping.",
    image: s11,
  },
  "12": {
    title: "Deep Cleaning",
    price: "$89",
    description: "A thorough clean that covers all corners of your home, focusing on hard-to-reach areas.",
    image: s12,
  },
  "13": {
    title: "Spring Cleaning",
    price: "$99",
    description: "Seasonal deep cleaning to freshen up your home and eliminate dust and allergens.",
    image: s13,
  },
  "14": {
    title: "Move-In/Move-Out Cleaning",
    price: "$119",
    description: "Detailed cleaning for homes before moving in or after moving out, ensuring it's spotless.",
    image: s14,
  },
  "15": {
    title: "Office Cleaning",
    price: "$79",
    description: "Regular cleaning services tailored for offices to maintain a clean work environment.",
    image: s15,
  },
  "16": {
    title: "Window Cleaning",
    price: "$39",
    description: "Cleaning of windows inside and out for a streak-free finish.",
    image: s16,
  },
  "17": {
    title: "Carpet Cleaning",
    price: "$99",
    description: "Professional carpet cleaning to remove stains, dirt, and allergens.",
    image: s17,
  },
  "18": {
    title: "Post-Renovation Cleaning",
    price: "$149",
    description: "Cleaning services to remove dust and debris after home renovations.",
    image: s18,
  },
  "19": {
    title: "Upholstery Cleaning",
    price: "$89",
    description: "Deep cleaning for furniture upholstery to remove stains and dirt.",
    image: s19,
  },
  "20": {
    title: "Laundry Services",
    price: "$29",
    description: "Washing, drying, and folding services for your laundry.",
    image: s20,
  },"21": {
  title: "Local Moving",
  price: "$199",
  description: "Efficient local moving services to help you relocate seamlessly.",
  image: s21,
},
"22": {
  title: "Furniture Removal",
  price: "$199",
  description: "Removal and disposal of old furniture quickly and responsibly.",
  image: s22,
},
"23": {
  title: "Junk Removal",
  price: "$150",
  description: "Quick junk removal services for your home or office.",
  image: s23,
},
"24": {
  title: "Heavy Lifting",
  price: "$75",
  description: "Professional heavy lifting services for your bulky items.",
  image: s24,
},
"25": {
  title: "Storage Services",
  price: "$50",
  description: "Secure storage solutions for your belongings.",
  image: s25,
},
"26": {
  title: "Truck Assistance",
  price: "$100",
  description: "Assistance with truck loading and unloading for your moves.",
  image: s26,
},
"27": {
  title: "Disposal Services",
  price: "$80",
  description: "Responsible disposal services for unwanted items.",
  image: s27,
},
"28": {
  title: "Rearranging Furniture",
  price: "$50",
  description: "Professional rearranging of your furniture for optimal space.",
  image: s28,
},
"29": {
  title: "Long-Distance Moving",
  price: "$499",
  description: "Reliable long-distance moving services for your relocation.",
  image: s29,
},
"30": {
  title: "Packing and Unpacking",
  price: "$150",
  description: "Expert packing and unpacking services to save you time and effort.",
  image: s30,
},
"31": {
  title: "Lawn Mowing",
  price: "$35",
  description: "Professional lawn mowing services for a neat appearance.",
  image: s31,
},
"32": {
  title: "Leaf Removal",
  price: "$50",
  description: "Comprehensive leaf removal to keep your yard clean.",
  image: s32,
},
"33": {
  title: "Snow Removal",
  price: "$60",
  description: "Fast snow removal services to keep your driveway clear.",
  image: s33,
},
"34": {
  title: "Gutter Cleaning",
  price: "$70",
  description: "Thorough gutter cleaning to prevent clogs and water damage.",
  image: s34,
},
"35": {
  title: "Tree Trimming",
  price: "$80",
  description: "Expert tree trimming to maintain health and appearance.",
  image: s35,
},
"36": {
  title: "Garden Maintenance",
  price: "$45",
  description: "Regular garden maintenance services to keep your plants thriving.",
  image: s36,
},
"37": {
  title: "Fence Repair",
  price: "$150",
  description: "Quality repairs for your fences to ensure safety and aesthetics.",
  image: s37,
},
"38": {
  title: "Deck Staining",
  price: "$120",
  description: "Protective deck staining to enhance durability and appearance.",
  image: s38,
},
"39": {
  title: "Sprinkler Installation",
  price: "$200",
  description: "Professional sprinkler installation for efficient watering.",
  image: s39,
},
"40": {
  title: "Weeding",
  price: "$30",
  description: "Effective weeding services to keep your garden tidy.",
  image: s40,
},
"41": {
  title: "Furniture Assembly",
  price: "$49",
  description: "Professional assembly of furniture items to save you time.",
  image: s41,
},
"42": {
  title: "Furniture Delivery",
  price: "$70",
  description: "Safe and reliable delivery of your furniture to your home.",
  image: s42,
},
"43": {
  title: "Furniture Disassembly",
  price: "$60",
  description: "Efficient disassembly of furniture for easy relocation.",
  image: s43,
},
"44": {
  title: "Rearranging Furniture",
  price: "$50",
  description: "Expert rearrangement of your furniture to optimize space.",
  image: s44,
},
"45": {
  title: "Custom Furniture Building",
  price: "$300",
  description: "Tailor-made furniture solutions to fit your specific needs.",
  image: s45,
},
"46": {
  title: "Furniture Repair",
  price: "$100",
  description: "Quality repair services for damaged furniture items.",
  image: s46,
},
"47": {
  title: "Upholstery Cleaning",
  price: "$89",
  description: "Professional cleaning services for your upholstered furniture.",
  image: s47,
},
"48": {
  title: "Outdoor Furniture Assembly",
  price: "$80",
  description: "Assembly of outdoor furniture for your patio or garden.",
  image: s48,
},
"49": {
  title: "Cabinet Installation",
  price: "$150",
  description: "Professional installation of cabinets for your home or office.",
  image: s49,
},
"50": {
  title: "Wall Mount Installation",
  price: "$40",
  description: "Safe installation of wall-mounted items like TVs and shelves.",
  image: s50,
},
"51": {
  title: "Interior Painting",
  price: "$300",
  description: "High-quality interior painting to refresh your home.",
  image: s51,
},
"52": {
  title: "Exterior Painting",
  price: "$400",
  description: "Durable exterior painting to enhance your home's curb appeal.",
  image: s52,
},
"53": {
  title: "Wallpaper Installation",
  price: "$200",
  description: "Professional wallpaper installation for a stylish finish.",
  image: s53,
},
"54": {
  title: "Decorative Wall Treatments",
  price: "$250",
  description: "Creative wall treatments to add character to your space.",
  image: s54,
},
"55": {
  title: "Furniture Painting",
  price: "$100",
  description: "Transform your furniture with a fresh coat of paint.",
  image: s55,
},
"56": {
  title: "Hanging Pictures and Mirrors",
  price: "$50",
  description: "Expert hanging services for pictures and mirrors.",
  image: s56,
},
"57": {
  title: "Mural Painting",
  price: "$350",
  description: "Custom mural painting to create a unique atmosphere.",
  image: s57,
},
"58": {
  title: "Crown Molding Installation",
  price: "$200",
  description: "Professional installation of crown molding for elegant finishes.",
  image: s58,
},
"59": {
  title: "Cabinet Painting",
  price: "$150",
  description: "Refresh your cabinets with quality paint services.",
  image: s59,
},
"60": {
  title: "Accent Wall Design",
  price: "$100",
  description: "Create stunning accent walls to enhance your decor.",
  image: s60,
},
"61": {
  title: "Bathroom Remodeling",
  price: "$500",
  description: "Transform your bathroom into a modern, luxurious space.",
  image: s61,
},
"62": {
  title: "Kitchen Renovation",
  price: "$1000",
  description: "Upgrade your kitchen with a sleek and functional design.",
  image: s62,
},
"63": {
  title: "Flooring Installation",
  price: "$300",
  description: "Professional installation of hardwood, tile, or laminate flooring.",
  image: s63,
},
"64": {
  title: "Roof Repair",
  price: "$400",
  description: "Fix leaks and damaged shingles to protect your home from the elements.",
  image: s64,
},
"65": {
  title: "Deck Building",
  price: "$600",
  description: "Build a beautiful deck to enhance your outdoor living space.",
  image: s65,
},
"66": {
  title: "Basement Waterproofing",
  price: "$500",
  description: "Keep your basement dry and protected from water damage.",
  image: s66,
},
"67": {
  title: "Window Replacement",
  price: "$250",
  description: "Improve energy efficiency and aesthetics with new windows.",
  image: s67,
},
"68": {
  title: "Garage Door Installation",
  price: "$300",
  description: "Install a new garage door for added convenience and security.",
  image: s68,
},
"69": {
  title: "Attic Insulation",
  price: "$200",
  description: "Save on energy costs with quality attic insulation services.",
  image: s69,
},
"70": {
  title: "Siding Repair",
  price: "$350",
  description: "Repair your home's siding to enhance curb appeal and protection.",
  image: s70,
},
"71": {
  title: "TV Mounting",
  price: "$69",
  description: "Expert TV mounting services for a clean and organized setup.",
  image: s71,
},
"72": {
  title: "Wi-Fi Setup",
  price: "$100",
  description: "Fast and secure Wi-Fi setup for your home or office.",
  image: s72,
},
"73": {
  title: "Smart Home Setup",
  price: "$150",
  description: "Connect and automate your home with smart devices.",
  image: s73,
},
"74": {
  title: "Computer Repair",
  price: "$75",
  description: "Fix hardware or software issues for all types of computers.",
  image: s74,
},
"75": {
  title: "Printer Installation",
  price: "$50",
  description: "Set up your printer with ease for home or office use.",
  image: s75,
},
"76": {
  title: "Home Theater Installation",
  price: "$200",
  description: "Design and install a complete home theater experience.",
  image: s76,
},
"77": {
  title: "Device Setup",
  price: "$50",
  description: "Get your new gadgets up and running quickly and efficiently.",
  image: s77,
},
"78": {
  title: "Data Backup",
  price: "$30",
  description: "Securely back up your important data to prevent loss.",
  image: s78,
},
"79": {
  title: "Security Camera Installation",
  price: "$250",
  description: "Install security cameras for peace of mind and safety.",
  image: s79,
},
"80": {
  title: "Network Troubleshooting",
  price: "$75",
  description: "Diagnose and fix network issues for seamless connectivity.",
  image: s80,
},
"81": {
  title: "Data Entry",
  price: "$25",
  description: "Accurate and fast data entry services for your business.",
  image: s81,
},
"82": {
  title: "Email Management",
  price: "$30",
  description: "Efficient management of your inbox and email communications.",
  image: s82,
},
"83": {
  title: "Calendar Management",
  price: "$25",
  description: "Keep your schedule organized and up-to-date.",
  image: s83,
},
"84": {
  title: "Online Research",
  price: "$40",
  description: "Thorough research on topics of your choice.",
  image: s84,
},
"85": {
  title: "Social Media Management",
  price: "$50",
  description: "Manage and grow your social media presence.",
  image: s85,
},
"86": {
  title: "Customer Support",
  price: "$30",
  description: "Provide excellent support to your customers.",
  image: s86,
},
"87": {
  title: "Bookkeeping",
  price: "$40",
  description: "Accurate and timely bookkeeping for your finances.",
  image: s87,
},
"88": {
  title: "Content Writing",
  price: "$50",
  description: "High-quality content writing services for blogs, websites, and more.",
  image: s88,
},
"89": {
  title: "Graphic Design",
  price: "$75",
  description: "Professional graphic design for your branding and marketing needs.",
  image: s89,
},
"90": {
  title: "Event Coordination",
  price: "$50",
  description: "Coordinate and manage events with ease and professionalism.",
  image: s90,
},
"91": {
  title: "Office Cleaning",
  price: "$79",
  description: "Thorough office cleaning to maintain a tidy workspace.",
  image: s91,
},
"92": {
  title: "Office Furniture Assembly",
  price: "$150",
  description: "Expert assembly of office furniture for a professional setup.",
  image: s92,
},
"93": {
  title: "Office Moving",
  price: "$250",
  description: "Move your office with minimal disruption and efficiency.",
  image: s93,
},
"94": {
  title: "Tech Setup",
  price: "$100",
  description: "Set up office technology for seamless operation.",
  image: s94,
},
"95": {
  title: "Conference Room Setup",
  price: "$150",
  description: "Set up your conference room for meetings and presentations.",
  image: s95,
},
"96": {
  title: "Document Shredding",
  price: "$75",
  description: "Secure shredding of confidential documents.",
  image: s96,
},
"97": {
  title: "Supply Delivery",
  price: "$50",
  description: "Efficient delivery of office supplies to keep you running smoothly.",
  image: s97,
},
"98": {
  title: "Office Organization",
  price: "$100",
  description: "Organize your office for maximum productivity.",
  image: s98,
},
"99": {
  title: "Mailing Services",
  price: "$30",
  description: "Handle all your office mailing needs with ease.",
  image: s99,
},
"100": {
  title: "Office Interior Design",
  price: "$200",
  description: "Create a functional and attractive office design.",
  image: s100,
},


  };
  

  const service = serviceData[serviceId]; // Ensure serviceId matches string "1", "2", etc.
    const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    address: '',
    phone: '',
    description: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setModalIsOpen(true);
    setFormData({
      name: '',
      email: '',
      date: '',
      time: '',
      address: '',
      phone: '',
      description: '',
    });
    setShowAlert(false);
    setErrors({});
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.description) newErrors.description = "Description is required";
    return newErrors;
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log("Booking data:", formData);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        address: '',
        phone: '',
        description: '',
      });
    }
  };

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="service-details-container">
    <Navbar />
    <br />
    <div 
      className="service-details-content-wrapper" 
      style={{ 
        backgroundImage: `url(${service.image})`, 
        backgroundColor: 'lightgray' 
      }}
    >
      <div className="service-details-overlay"></div>
      <div className="service-details-content">
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <p>Price: {service.price}</p>
        <button onClick={openModal} className="book-btn">Book now</button>
      </div>
      
    </div>

    {/* How It Works Section */}
    <div className="how-it-works">
      <h2>How it works</h2>
      <div className="steps-container">
        <div className="steph">
          <img src={hiw1} alt="Describe your task" />
          <h3>1. Describe Your Task</h3>
          <p>Tell us what you need done, when, and where it works for you.</p>
        </div>
        <div className="steph">
          <img src={hiw2} alt="Choose your tasker"/>
          <h3>2. Choose Your Tasker</h3>
          <p>Browse trusted Taskers by skills, reviews, and price. Chat with them to confirm details.</p>
        </div>
        <div className="steph">
          <img src={hiw3} alt="Get it done"/>
          <h3>3. Get It Done!</h3>
          <p>Your Tasker arrives and gets the job done. Pay securely and leave a review, all through Task Genie.</p>
        </div>
      </div>
    </div>

{/* Modal for booking */}
<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Booking Modal"
        className="booking-modal"
        overlayClassName="booking-overlay"
      >
        <h2 className="modal-title">Book {service.title}</h2>
        {showAlert && (
          <div className="alert-container">
            <div className="alert">
              <div className="checkmark"></div>
              <p className="alert-message">Booking Confirmed! Details sent to your email. </p>
            </div>
          </div>
        )}
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
            {errors.date && <span className="error">{errors.date}</span>}
          </label>
          <label>
            Time:
            <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
            {errors.time && <span className="error">{errors.time}</span>}
          </label>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" required />
            {errors.address && <span className="error">{errors.address}</span>}
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" required />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe your project needs" required />
            {errors.description && <span className="error">{errors.description}</span>}
          </label>
          <button type="submit" className="submit-btn">Confirm Booking</button>
        </form>
        <button onClick={closeModal} className="close-btn">Close</button>
      </Modal>
      
      <Footer />
    </div>
  );
};

export default ServiceDetails;
