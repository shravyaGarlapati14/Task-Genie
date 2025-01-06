import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeBooking, getAllBookings, updateBookingInDB } from './indexedDB'; // Assuming methods for IndexedDB
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import Navbar from './Navbar';  // Import the Navbar
import Footer from './Footer';
import Logo from "../Assets/bglogo.png";
import Modal from 'react-modal';
import emailjs from 'emailjs-com';  // Import EmailJS
import { useParams } from 'react-router-dom';
import '../css/ProjectDetails.css';
import sp1 from '../Assets/sp1.webp';
import sp2 from '../Assets/sp2.jpg';
import sp3 from '../Assets/sp3.jpg';
import sp4 from '../Assets/sp4.jpg';
import sp5 from '../Assets/s5.webp';
import sp6 from '../Assets/Mohith_Image.jpeg';
import hiw1 from '../Assets/hiw1.jpg';
import hiw2 from '../Assets/hiw2.jpg';
import hiw3 from '../Assets/hiw3.jpg';
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
import visa from '../Assets/visa.svg';
import mc from '../Assets/mastercard.svg';
import ac from '../Assets/ac2.svg';
import { getUserByEmail } from './indexedDB'; // Ensure this utility can fetch all service providers
Modal.setAppElement('#root');

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [base64Logo, setBase64Logo] = useState('');
  const [base64Stamp, setBase64Stamp] = useState('');

  const projectData = {
    "1": {
      title      : "Furniture Assembly",
      price      : "$49",
      description: "Our experts will assemble your furniture with precision, ensuring each piece is put together securely and according to the manufacturer's guidelines. Whether it's flat-pack furniture or custom pieces, we handle it all efficiently.",
      image      : p1,                                                                                                                                                                                                                                         // Path to background image

    },
    "2": {
      title      : "Mount a TV",
      price      : "$69",
      description: "We securely mount your TV on any wall type, ensuring proper alignment and safety. Our team also handles cable management and setup for optimal viewing experience, no matter the room size or TV model.",
      image      : p2,
    },
    "3": {
        title      : "Help Moving",
        price      : "$67",
        description: "Need help moving heavy furniture or boxes? We provide skilled movers to assist with packing, lifting, and safely transporting your items. Our service is ideal for both short-distance and local moves."
      , image      : p3,
    },
    "4": {
        title      : "House Cleaning",
        price      : "$59",
        description: "Our house cleaning service covers every nook and cranny, from dusting to vacuuming and deep-cleaning bathrooms and kitchens. We use eco-friendly products and ensure your home is spotless and comfortable."
      , image      : p4,

    },
    "5": {
        title      : "Plumbing Repairs",
        price      : "$75",
        description: "From fixing leaks to installing new fixtures, our licensed plumbers handle all types of repairs. Whether it's a leaky faucet or a broken pipe, we ensure the job is done correctly and efficiently."
      , image      : p5,
    },
    "6": {
        title      : "Electrical Repairs",
        price      : "$80",
        description: "Our certified electricians diagnose and repair any electrical issue, from faulty wiring to circuit breaker problems. We also provide installation of new outlets, lighting, and electrical fixtures."
      , image      : p6,
    },
    "7": {
        title      : "Gardening Services",
        price      : "$40",
        description: "Our gardening service covers lawn care, planting, trimming, and seasonal clean-up. We ensure your garden thrives by using the best tools and techniques, providing everything from soil care to plant health monitoring."
      , image      : p7,
    },
    "8": {
        title      : "Carpentry Work",
        price      : "$55",
        description: "Our carpenters are skilled in crafting custom furniture, installing cabinetry, and making home repairs. Whether it’s a new bookshelf or repairing damaged woodwork, we deliver high-quality, long-lasting results."
      , image      : p8,
  },
    "9": {
        title      : "Window Installation",
        price      : "$150",
        description: "We install windows of all sizes, ensuring a perfect fit and energy efficiency. Our service includes removal of old windows, precise installation, and thorough sealing to improve insulation and appearance."
      , image      : p9,
    },
    "10": {
        title      : "Appliance Repair",
        price      : "$100",
        description: "Our technicians repair all major appliances, including refrigerators, washers, dryers, and ovens. We diagnose the issue quickly and offer solutions to extend the lifespan of your appliance, saving you from costly replacements."
      , image      : p10,
    },
    "11": {
        title      : "Roofing Services",
        price      : "$250",
        description: "Our roofing experts handle repairs, replacements, and maintenance for both residential and commercial properties. We use high-quality materials and ensure that your roof is weatherproof and durable."
      , image      : p11,
    },
    "12": {
        title      : "Pest Control",
        price      : "$90",
        description: "We offer eco-friendly pest control services to eliminate unwanted pests from your home or office. Our methods are safe, effective, and tailored to address common pests such as insects, rodents, and termites."
      , image      : p12,
    },
    "13": {
        title      : "Landscaping",
        price      : "$60",
        description: "Our landscaping team designs and maintains beautiful outdoor spaces, offering services like mowing, planting, and landscape design. We create tailored solutions to suit your yard's size, soil, and climate."
      , image      : p13,
    },
    "14": {
        title      : "Pressure Washing",
        price      : "$70",
        description: "We provide professional pressure washing services for driveways, patios, and house exteriors. Our powerful cleaning equipment removes dirt, grime, and mold, leaving surfaces looking brand new."
      , image      : p14,
    },
    "15": {
        title      : "Siding Repair",
        price      : "$120",
        description: "Our siding repair service restores the exterior of your home, fixing damage from weather, pests, and wear and tear. We match materials and colors to ensure seamless repairs that enhance your home's appearance."
      , image      : p15,
    }
  };
  const stepIndicatorRef = useRef(null);
  const [errors, setErrors] = useState({});
  const project = projectData[projectId];
  const [step, setStep] = useState(0);  // Initially, step is 0 (shows "Book Now")
  const [taskDetails, setTaskDetails] = useState({
    name           : '',
    location       : '',
    taskSize       : 'small',
    email          : '',
    serviceProvider: null,
    date           : '',
    time           : '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    status: 'Pending',
    datePaid: '',
    transactionTime: '',
    paymentReceipt: ''
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv       : '',
    cardType: 'credit', // Default to 'credit'
  });

  
  const [serviceProviders] = useState([
    { name: 'Alice Johnson', experience: '2 years', reviews: '4.7/5', image: sp1 },
    { name: 'Bob Harris', experience: '6 years', reviews: '4.3/5', image: sp2 },
    { name: 'Charlie Williams', experience: '4 years', reviews: '4.9/5', image: sp3 },
    { name: 'Diana Lee', experience: '1 year', reviews: '2.8/5', image: sp4 },
    { name: 'Edward Brown', experience: '5 year', reviews: '4.5/5', image: sp5 },
    { name: 'Mohith Reddy Pune', experience: '0 years', reviews: '5/5', image: sp6 },
  ]);
  

  const validateField = (name, value) => {
    let errorMsg = '';
    const unformattedValue = value.replace(/\s/g, '');

    switch (name) {
      case 'name':
        if (!value) errorMsg = 'Name is required';
        break;
      case 'location':
        if (!value) errorMsg = 'Location is required';
        break;
      case 'taskSize':
        if (!['small', 'medium', 'large'].includes(value)) errorMsg = 'Invalid task size';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = 'Enter a valid email';
        break;
      case 'serviceProvider':
        if (!value) errorMsg = 'Service provider is required';
        break;
      case 'date':
        if (!value) errorMsg = 'Date is required';
        break;
      case 'time':
        if (!value) errorMsg = 'Time is required';
        break;
      case 'cardNumber':
        if (!/^\d{16}$/.test(unformattedValue)) {
          errorMsg = 'Enter a valid 16-digit card number';
        }        break;
      case 'expiryDate':
        if (!/^\d{2}\/\d{2}$/.test(value)) errorMsg = 'Enter a valid expiry date (MM/YY)';
        break;
      case 'cvv':
        if (!/^\d{3,4}$/.test(value)) errorMsg = 'Enter a valid 3 digit CVV';
        break;
      default:
        break;
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  
    return errorMsg === '';
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    stepIndicatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
    const nextStep = () => {
    let isValid = true;
  
    // Perform step-specific validation
    if (step === 1) { // Step 1: Basic task details
      isValid = validateField('name', taskDetails.name) &
                validateField('email', taskDetails.email) &
                validateField('location', taskDetails.location) &
                validateField('taskSize', taskDetails.taskSize);
    }  else if (step === 3) { // Step 3: Date and time
      isValid = validateField('date', taskDetails.date) &
                validateField('time', taskDetails.time);
    } 
  
    // Only proceed to the next step if all fields are valid
    if (isValid) {
      setStep((prev) => prev + 1);
    } else {
      Swal.fire({
        title: 'Incomplete Details',
        text: 'Please complete the details.',
        icon: 'warning',
        confirmButtonText: 'OK',
        background: '#FFFCF9',  // Light background color
        color: '#856404',  // Text color
        confirmButtonColor: '#f39c12', // Button color
      });    }
      stepIndicatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
    validateField(name, value); 
  };
  
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    validateField(name, value);  // Validate each card detail input as it's changed
  };
  const handleCardTypeChange = (event) => {
    const { value } = event.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      cardType: value, // Update the card type
    }));
  };
  const formatCardNumber = (number) => {
    return number.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19); 
  };

  const cardPreview = (cardNumber) => {
    return cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : 'Not Provided';
  };

    const handleProviderSelect = (provider) => {
    setTaskDetails({ ...taskDetails, serviceProvider: provider });
    nextStep();
  };
  const generateTransactionId = () => {
    const randomPart = Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric string
    const timestamp = Date.now().toString(36); // Convert the current timestamp to a base-36 string
    return `${timestamp}-${randomPart}`; // Combine both to form a unique ID
  };
  const handleConfirmBooking = async () => {
    const currentDate = new Date();
    const transactionId = generateTransactionId();
    const bookingDetails = {
      transactionId: generateTransactionId(),
      taskName: project.title,
      customerName: taskDetails.name,
      email: taskDetails.email,
      location: taskDetails.location,
      taskSize: taskDetails.taskSize,
      description: taskDetails.description,
      serviceProvider: taskDetails.serviceProvider.name,
      date: taskDetails.date,
      time: taskDetails.time,
      totalPrice: project.price,
      status: 'Upcoming', // Initial status is Pending
    };
    setPaymentDetails({
      ...paymentDetails,
      status: 'Confirmed',
      transactionId: generateTransactionId(),
      datePaid: currentDate.toLocaleDateString(),
      transactionTime: currentDate.toLocaleTimeString(),
      paymentReceipt: ``,
    });

    try {
      await storeBooking(bookingDetails);  // Store the booking in IndexedDB
      Swal.fire({
        title: 'Booking Confirmed!',
        text: 'Your booking has been confirmed.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Could not do booking. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

   // Handle canceling the booking and processing the refund
   const handleCancelBooking = async () => {
    setPaymentDetails((prevState) => ({
      ...prevState,
      status: 'Refund Processed', // Update payment status
    }));

    // Update booking status to 'Refund Processed' in IndexedDB
    const updatedBooking = { ...paymentDetails, status: 'Refund Processed' };
    await updateBookingInDB(updatedBooking);

    // Show success alert
    Swal.fire({
      title: 'Refund Processed!',
      text: 'Your payment has been refunded.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    // Additional logic for email or triggering other actions
  };

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const allBookings = await getAllBookings();
      const booking = allBookings.find((b) => b.transactionId === paymentDetails.transactionId);

      if (booking) {
        setPaymentDetails({
          userName: booking.customerName,
          amountPaid: booking.totalPrice,
          status: booking.status,
          datePaid: booking.datePaid,
          transactionTime: booking.transactionTime,
          transactionId: booking.transactionId,
          paymentReceipt: booking.paymentReceipt,
        });
      }
    };

    if (paymentDetails.transactionId) {
      fetchPaymentDetails(); // Fetch payment details based on transaction ID
    }
  }, [paymentDetails.transactionId]);

  const sendConfirmationEmail = () => {
    const transactionId = generateTransactionId(); // Generate the transaction ID

    emailjs.send(
      'service_dulykwh',
      'template_hfajj99',
      {
        user_name  : taskDetails.name,
        user_email : taskDetails.email,
        task_name  : project.title,
        service_provider: taskDetails.serviceProvider.name, // assuming serviceProvider is an object with a name property
        task_date  : taskDetails.date,
        task_time  : taskDetails.time,
        total_price: project.price,
        transaction_id: transactionId  // Include the transaction ID

      }, 
      'ICCIghzrmloavUiJs'
    ).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Payment Confirmation Sent to Your Email!',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#ffffff',
        color: '#4F8A10',
      });
    })
    .catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Could not send email. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        background: '#F8D7DA',
        color: '#721C24',
      });
    });
  };

  useEffect(() => {
    const convertImageToBase64 = async (imageUrl, setter) => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(blob);
    };

    // Convert local logo to base64
    convertImageToBase64(Logo, setBase64Logo);
    // Convert "Paid in Full" stamp image to base64
    convertImageToBase64('https://thumbs.dreamstime.com/b/paid-full-grunge-rubber-stamp-white-background-vector-illustration-265004086.jpg', setBase64Stamp);
  }, []);

  const generateReceiptPDF = () => {
    const doc = new jsPDF();

    // Add logo at top center if available
    if (base64Logo) {
      doc.addImage(base64Logo, 'PNG', 10, 10, 60, 30); // Adjust size and position
    }

    // Set title with attractive font and color
    doc.setFont('helvetica');
    doc.setFontSize(26);
    doc.setTextColor(0, 123, 255); // Blue color for title
    doc.text("Payment Receipt", 105, 50, { align: 'center' });

    // Draw a line to separate the title
    doc.setLineWidth(1);
    doc.setDrawColor(0, 123, 255); // Blue line color
    doc.line(10, 55, 200, 55);

    // Add content to the PDF with colorful text
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Default black color for details

    const details = [
      `Receipt for: ${project.title}`,
      `Customer Name: ${taskDetails.name}`,
      `Email: ${taskDetails.email}`,
      `Service Provider: ${taskDetails.serviceProvider.name}`,
      `Date: ${taskDetails.date}`,
      `Time: ${taskDetails.time}`,
      `Total Price: ${project.price}`,
      `Transaction ID: ${generateTransactionId()}`
    ];

    details.forEach((line, index) => {
      doc.text(line, 20, 70 + (index * 12)); // Spacing between lines
    });

  

    // Add a footer with colorful text
    doc.setFontSize(12);
    doc.setTextColor(0, 123, 255); // Blue footer text
    doc.text("Thank you for your business!", 10, 200);
    doc.text("Contact us at customersupport@taskgenie.com", 10, 205); // Change to your support email

      // Add the "Paid in Full" stamp if available
      if (base64Stamp) {
        doc.addImage(base64Stamp, 'JPEG', 150, 70, 50, 50); // Adjust size and position to be smaller
      }

    // Save the PDF
    doc.save(`receipt_${generateTransactionId()}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const isValid = Object.keys(taskDetails).every((field) =>
      validateField(field, taskDetails[field])
    ) && Object.keys(cardDetails).every((field) =>
      validateField(field, cardDetails[field])
    );
  
    if (isValid) {
      console.log('Form is valid! Proceeding...');
      // Send confirmation email or perform the next step
    } else {
      console.log('Form contains errors.');
    }
  };
  const [experienceFilter, setExperienceFilter] = useState('');
  const [reviewFilter, setReviewFilter] = useState('');

  // Filter providers based on the selected filters
  const filteredProviders = serviceProviders.filter((provider) => {
    const isExperienceValid = experienceFilter ? provider.experience >= experienceFilter : true;
    const isReviewValid = reviewFilter ? provider.reviews >= reviewFilter : true;
    return isExperienceValid && isReviewValid;
  });
  return (
    <div className = "project-details-container">
      <Navbar />
  <div className = "project-details-content-wrapper" style = {{ backgroundImage: `url(${project.image})` }}>
  <div className = "project-details-overlay"></div> {/* Blur and darken background */}
  <div className = "project-details-content">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <p>Price: {project.price}</p>
        </div>
      </div>
      {/* How It Works Section */}
    <div className = "how-it-works">
      <h2>How it works</h2>
      <div className = "steps-container"  >
      <div className = "steph">
      <img src       = {hiw1} alt = "Describe your task" />
          <h3>1. Describe Your Task</h3>
          <p>Tell us what you need done, when, and where it works for you.</p>
        </div>
        <div className = "steph">
        <img src       = {hiw2} alt = "Choose your tasker"/>
          <h3>2. Choose Your Tasker</h3>
          <p>Browse trusted Taskers by skills, reviews, and price. Chat with them to confirm details.</p>
        </div>
        <div className = "steph">
        <img src       = {hiw3} alt = "Get it done"/>
          <h3>3. Get It Done!</h3>
          <p>Your Tasker arrives and gets the job done. Pay securely and leave a review, all through Task Genie.</p>
        </div>
      </div>
    </div>
      <div className = "booking-container">
      {/* <button onClick={handleBookNow}>Book Now</button> */}
        {step === 0 ? (
          <button className = "book-now-btn" onClick = {() => setStep(1)}>Book Now</button>
        ) : (
          <div className = "booking-steps">
            <div className="step-indicator" ref={stepIndicatorRef}>
  <div className={`step ${step >= 1 ? 'active' : ''}`}>
    <div className="circle">1</div>
    <div className="step-title">Describe your task</div>
  </div>
  <div className={`step ${step >= 2 ? 'active' : ''}`}>
    <div className="circle">2</div>
    <div className="step-title">Choose your Tasker</div>
  </div>
  <div className={`step ${step >= 3 ? 'active' : ''}`}>
    <div className="circle">3</div>
    <div className="step-title">Choose Date & Time</div>
  </div>
  <div className={`step ${step >= 4 ? 'active' : ''}`}>
    <div className="circle">4</div>
    <div className="step-title">Confirm Booking</div>
  </div>
  <div className={`step ${step >= 5 ? 'active' : ''}`}>
    <div className="circle">5</div>
    <div className="step-title">Payment</div>
  </div>
</div>

            {step === 1 && (
              <div className = "steps step-1">
                <h2>Step 1: Describe Your Task</h2>
                <label>
                  {/* Full Name:  */}
                  <input type = "text" name = "name" value = {taskDetails.name} onChange = {handleInputChange} className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="Enter your full name" required />        {errors.name && <span className="error-message">{errors.name}</span>}

                </label><br></br><br></br>
                <label>
                  {/* E-mail:  */}
                  <input type = "text" name = "email" value = {taskDetails.email} onChange = {handleInputChange}   className={`form-input ${errors.email ? 'error' : ''}`}
placeholder="Enter Your E-mail" required />{errors.email && <span className="error-message">{errors.email}</span>}
                </label>< br></br><br></br>
                <label>
                  {/* Location:  */}
                  <input type = "text" name = "location" value = {taskDetails.location} onChange = {handleInputChange}   className={`form-input ${errors.location ? 'error' : ''}`}
placeholder="Enter your Location" required />{errors.location && <span className="error-message">{errors.location}</span>}
                </label>< br></br><br></br>
                <label>
                  Task Size: <br></br>
                  <select name  = "taskSize" value = {taskDetails.taskSize}   className={`form-input ${errors.name ? 'error' : ''}`}
 onChange = {handleInputChange}>{errors.name && <span className="error-message">{errors.name}</span>}
                  <option value = "small">Small (1 hr)</option>
                  <option value = "medium">Medium (2 hr)</option>
                  <option value = "large">Large (4 hr)</option>
                  </select>
                </label><br></br><br></br>
                 <label>
      {/* Description:  */}
      <textarea name = "description" value = {taskDetails.description} onChange = {handleInputChange} placeholder = "Describe your task in detail" required></textarea>
    </label>
                <button className = "nextbut next-btn" onClick = {nextStep}><span class="label">Next</span>
  <span class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
  </span></button><br></br>
              </div>
            )}

            {step === 2 && (
              <div className="steps step-2">
              <h2>Step 2: Select Service Provider</h2>
        
              {/* Filter Options */}
              <div className="filter-container">
                <label>
                  Experience:
                  <select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="1">1+ years</option>
                    <option value="3">3+ years</option>
                    <option value="5">5+ years</option>
                  </select>
                </label>
                <label>
                  Ratings:
                  <select value={reviewFilter} onChange={(e) => setReviewFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="4">4+ stars</option>
                    <option value="4.5">4.5+ stars</option>
                    <option value="5">5 stars</option>
                  </select>
                </label>
              </div>
        
              {/* Provider List */}
              <div className="provider-list">
                {filteredProviders.map((provider, index) => (
                  <div className="provider-card" key={index} onClick={() => handleProviderSelect(provider)}>
                    <img src={provider.image} alt={provider.name} />
                    <h3>{provider.name}</h3>
                    <p>Experience: {provider.experience} </p>
                    <p>Ratings: {provider.reviews} stars</p>
                  </div>
                ))}
              </div>
        
              <button className = "prev-btn nextbut pevbut" onClick = {prevStep}><span class="label">Back</span>
  <span class="icon">
  <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43"><path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"/></svg>  </span></button>

            </div>
            )}

            {step === 3 && (
              <div className = "steps step-3">
                <h2>Step 3: Choose Date and Time</h2>
                <label>
                  Date: 
                  <input type = "date" name = "date" value = {taskDetails.date} onChange = {handleInputChange} required />
                </label><br></br><br></br>
                <label>
                  Time: 
                  <input type = "time" name = "time" value = {taskDetails.time} onChange = {handleInputChange} required />
                </label><br></br>
                <button className = "prev-btn nextbut pevbut" onClick = {prevStep}><span class="label">Back</span>
  <span class="icon">
  <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43"><path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"/></svg>  </span></button>

                <button className = "nextbut next-btn" onClick = {nextStep}><span class="label">Next</span>
  <span class="icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
  </span></button>        </div>
            )}

{step === 4 && (
  <div className = "steps step-4">
    <h2>Step           4                     : Confirm Booking</h2>
                       <p><strong>Task       : </strong> {project.title}</p>
                       <p><strong>Name       : </strong> {taskDetails.name}</p>
                       <p><strong>Email      : </strong> {taskDetails.email}</p>
                       <p><strong>Location   : </strong> {taskDetails.location}</p>
    <p><strong>Task    Size                  : </strong> {taskDetails.taskSize}</p>
                       <p><strong>Description: </strong> {taskDetails.description}</p>
    <p><strong>Service Provider              : </strong> {taskDetails.serviceProvider?.name}</p>
                       <p><strong>Date       : </strong> {taskDetails.date}</p>
                       <p><strong>Time       : </strong> {taskDetails.time}</p>
    <p><strong>Total   Price                 : </strong> {project.price}</p>
    {/* <button className="confirm-btn" onClick={() => alert('Booking Confirmed!')}>Confirm Booking</button> */}
    <button className="payment" onClick={() => {
  console.log("Proceeding to payment, step should go to 5");
  nextStep();
}}>Proceed to Payment</button><br></br>
    <button className = "prev-btn nextbut pevbut" onClick = {prevStep}><span class="label">Back</span>
  <span class="icon">
  <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43"><path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"/></svg>  </span></button>

  </div>
)}

{step === 5 && (
  <div className="steps step-5">
    <div className="payment-container">
      <h2>Step 5: Payment Details</h2>

      {/* Card Type and Card Type Icons */}
      <div className="card-type-container">
        <label>Card Type</label>
        <div className="card-type-selector">
          <label>
            <input
              type="radio"
              name="cardType"
              value="credit"
              checked={cardDetails.cardType === 'credit'}
              onChange={handleCardTypeChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="cardType"
              value="debit"
              checked={cardDetails.cardType === 'debit'}
              onChange={handleCardTypeChange}
            />
            Debit Card
          </label>
        </div>
        <div className="card-icons">
          {cardDetails.cardType === 'credit' && (
            <>
              <img src={visa} alt="Visa" className="card-icon" />
              <img src={mc} alt="MasterCard" className="card-icon" />
              <img src={ac} alt="American Express" className="card-icon" />
            </>
          )}
          {cardDetails.cardType === 'debit' && (
            <>
              <img src={visa} alt="Visa Debit" className="card-icon" />
              <img src={mc} alt="MasterCard Debit" className="card-icon" />
            </>
          )}
        </div>
      </div>

      {/* Card Number Input */}
      <label>
        Card Number:
        <input
          type="text"
          name="cardNumber"
          value={formatCardNumber(cardDetails.cardNumber)}
          onChange={handleCardInputChange}
          className={`form-input ${cardDetails.cardNumber.length < 19 ? 'valid' : 'error'}`}
          placeholder="Enter Card Number"
          required
          maxLength="19"  // Max length for card number format
        />
        <br />
        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
      </label>

      <div className="expiry-cvv-container">
        {/* Expiry Date */}
        <label>
          Expiry Date:
          <input
            type="text"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleCardInputChange}
            className={`form-input ${errors.expiryDate ? 'error' : ''}`}
            placeholder="MM/YY"
            required
            maxLength="5"  // Format for expiry date (MM/YY)
          />
          {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
        </label>

        {/* CVV */}
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleCardInputChange}
            className={`form-input ${errors.cvv ? 'error' : ''}`}
            placeholder="CVV"
            required
            maxLength="3"  // CVV length for validation
          />
                  <span className="tooltip">CVV is the 3-digit code on the back of your card</span>
          {errors.cvv && <span className="error-message">{errors.cvv}</span>}
        </label>
      </div>

      <div className="card-preview">
        <p><strong>Card Preview:</strong> {cardPreview(cardDetails.cardNumber)}</p>
      </div>
      
      {/* Payment Summary */}
      <div className="payment-summary">
        <p><strong>Amount:</strong> {project.price}</p>
        <p><strong>Payment Method:</strong> {cardDetails.cardType}</p>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
      <button className = "prev-btn nextbut pevbut" onClick = {prevStep}><span class="label">Back</span>
  <span class="icon">
  <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43"><path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"/></svg>  </span></button>

        <button
          className="payment"
          onClick={() => {
            if (validateField('cardNumber', cardDetails.cardNumber) && validateField('expiryDate', cardDetails.expiryDate) && validateField('cvv', cardDetails.cvv)) {
              sendConfirmationEmail();
              handleConfirmBooking();
              nextStep();            
              Swal.fire({
                title: 'Payment Successful!',
                text: 'Your task is now confirmed.',
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#ffffff',
                color: '#4F8A10',
              });
            }
          }}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  </div>
)}

            {step === 6 && (
              <div className="steps step-5">
                <h2>Booking Confirmed!</h2>
                <p>Your booking for {project.title} has been confirmed!</p>
                <p>A confirmation email has been sent to {taskDetails.email}.</p>
                <button className='download' onClick={generateReceiptPDF}><svg
    stroke-linejoin="round"
    stroke-linecap="round"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    height="40"
    width="40"
    class="button__icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
    <path d="M7 11l5 5l5 -5"></path>
    <path d="M12 4l0 12"></path>
  </svg>
  <span class="button__text">Download Receipt</span></button> <br></br><br></br>
        <button onClick={() => setStep(0)}>Back to Home</button>

              </div>
            )}
          </div>
        )}
      </div><br></br><br></br>
      <Footer />
    </div>
  );
};

export default ProjectDetails;