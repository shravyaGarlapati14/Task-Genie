import React, { useState } from 'react';
import '../css/Register.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { storeUser } from './indexedDB'; // Import the storeUser function
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: '',
        experience: '',
        noExperience: false,
        serviceTypes: [],
        mandatoryDocument: null,
        additionalDocuments: [],
        termsAccepted: false,
    });
    const [showTerms, setShowTerms] = useState(false);
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [experienceYears, setExperienceYears] = useState('');
    const [taskType, setTaskType] = useState('');
    const [hourlyRate, setHourlyRate] = useState(null);
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    const navigate = useNavigate();
    const handleNavigation = () => { navigate('/login'); };
    const areas = ['Kansas City', 'New York', 'San Francisco'];
    const experiences = ['0-1 years', '2-3 years', '4+ years'];
    const tasks = ['Branch & Hedge Trimming', 'House Cleaning', 'Furniture Assembly'];

    const calculateRate = () => {
        if (selectedArea && experienceYears && taskType) {
            let baseRate = 40;
            if (experienceYears === '2-3 years') baseRate += 10;
            if (experienceYears === '4+ years') baseRate += 20;
            setHourlyRate(baseRate);
        }
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName) {
            setError('First and Last Name are required');
            return false;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password should be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (!formData.termsAccepted) {
            setError('You must accept the terms and conditions');
            return false;
        }
        setError('');
        return true;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDocumentUpload = (e, type) => {
        const files = e.target.files;
        if (type === "mandatory") {
            if (files[0].size > 2 * 1024 * 1024 || !['application/pdf', 'image/jpeg'].includes(files[0].type)) {
                setError("Mandatory document must be a PDF or JPEG under 2MB.");
                return;
            }
            setFormData({ ...formData, mandatoryDocument: files[0] });
        } else {
            const validFiles = Array.from(files).filter(
                (file) => file.size <= 2 * 1024 * 1024 && ['application/pdf', 'image/jpeg'].includes(file.type)
            );
            setFormData({ ...formData, additionalDocuments: validFiles });
        }
    };

    const submitForm = async () => {
        setIsSubmitting(true);
    
        if (!formData.email) {
            setError('Email is required');
            setIsSubmitting(false);
            return;
        }
    
        // Add step 3 data to the formData
        formData.selectedArea = selectedArea;
        formData.experienceYears = experienceYears;
        formData.taskType = taskType;
        formData.hourlyRate = hourlyRate;
    
        try {
            // Store user data in IndexedDB
            await storeUser(formData);
            console.log("User details stored in IndexedDB");
    
            setShowSubmitPopup(true);
            setTimeout(() => {
                setShowSubmitPopup(false);
                navigate('/homepage'); // Redirect after submission
            }, 3000);
        } catch (error) {
            console.error("Failed to complete registration:", error);
            setError("Failed to register. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleNext = () => {
        if (step === 1 && validateForm()) nextStep();
        else if (step === 2) nextStep();
    };

    const addServiceType = () => {
        setFormData({
            ...formData,
            serviceTypes: [...formData.serviceTypes, ""]
        });
    };

    const updateServiceType = (index, value) => {
        const newServiceTypes = [...formData.serviceTypes];
        newServiceTypes[index] = value;
        setFormData({ ...formData, serviceTypes: newServiceTypes });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation before submission
        if (!validateForm()) {
            return;
        }
        setStep((prevStep) => prevStep + 1); // If using a step-based process, this increments the step

        setIsSubmitting(true);
        try {
            // Store user data in IndexedDB
            await storeUser(formData);

            // Success message
            setSuccessMessage("Registration successful!");
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error("Failed to complete registration:", error);
            setError("Failed to register. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="right-section">
                        <form onSubmit={handleSubmit}>
                            <div className="auth-container1">
                                <h2>Create An Account</h2>
                                {error && <div className="error-message">{error}</div>}
                                <div className="form-group side-by-side">
                                    <div>
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group side-by-side">
                                    <div>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group side-by-side">
                                    <div>
                                        <label>Create Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="termsAccepted"
                                            onChange={handleChange}
                                            required
                                        />
                                        Creating your account means you accept our{' '}
                                        <a href="#" onClick={() => setShowTerms(true)}>
                                            Terms & Conditions
                                        </a>
                                        .
                                    </label>
                                </div>
                                <button type="submit" className="nextbut">
                                    <span className="label">Next</span>
                                    <span className="icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path
                                                fill="currentColor"
                                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                );
           case 2:
    return (
        <div className="right-section">
            <div className="auth-container1">
                <h2>Upload Proof of Documents</h2>

                <div className="form-group">
                    <label>Upload Mandatory Document</label>
                    <div className="custom-file-upload">
                        <input type="file" onChange={(e) => handleDocumentUpload(e, "mandatory")} required />
                        <span className="file-label">Choose File</span>
                    </div>
                    {formData.mandatoryDocument && <p className="uploaded-file">Uploaded: {formData.mandatoryDocument.name}</p>}
                </div>

                <div className="form-group">
                    <label>Upload Additional Documents (Optional)</label>
                    <div className="custom-file-upload">
                        <input type="file" multiple onChange={(e) => handleDocumentUpload(e, "additional")} />
                        <span className="file-label">Choose Files</span>
                    </div>
                    {formData.additionalDocuments.length > 0 && (
                        <ul className="file-list">
                            {Array.from(formData.additionalDocuments).map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    )}
                </div>

                <p className="document-note">Documents can include Passport, Driving License, State ID, etc.</p>

                <div className="button-group">
                    <button className="nextbut pevbut" onClick={prevStep}>
                        <span className="label">Back</span>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43"><path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"/></svg>
                        </span>
                    </button>

                    <button className="nextbut" onClick={handleNext}>
                        <span className="label">Next</span>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
case 3:
    return (
        <div className="right-section">
            <div className="auth-container1">
                <div className="step2-form">
                    <h2>Earn money your way</h2><br />

                    {/* Side-by-side container */}
                    <div className="form-group side-by-side">
                        <div>
                            <label>Select your area</label>
                            <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                                <option value="">Select an area</option>
                                {areas.map((area, index) => (
                                    <option key={index} value={area}>{area}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Years of Experience</label>
                            <select value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)}>
                                <option value="">Select experience</option>
                                {experiences.map((exp, index) => (
                                    <option key={index} value={exp}>{exp}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <label>Choose a Category</label>
                    <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                        <option value="">Select a task</option>
                        {tasks.map((task, index) => (
                            <option key={index} value={task}>{task}</option>
                        ))}
                    </select>

                    {/* Side-by-side layout for buttons and hourly rate */}
                    <div className="side-by-side-container">
                        <button onClick={calculateRate} className="calculate-btn">Calculate Rate</button>

                        {hourlyRate && (
                            <div className="hourly-rate">
                                <h3>${hourlyRate} per hour</h3>
                            </div>
                        )}
                    </div>

                    {/* Side-by-side buttons for navigation */}
                    <div className="button-group">
                        <button className="nextbut pevbut" onClick={prevStep}>
                            <span className="label">Back</span>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43"><path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"/></svg>
                            </span>
                        </button>

                        <button className="next-btn cssbuttons-io-button" onClick={handleNavigation}>
                            Get Started
                            <div className="icon">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
default:
                return null;
        }
    };


    return (
        <>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="registration-container">
                <div className="left-section">
                    <h1>Let's Make it Happen Together!</h1>
                </div>
                {renderStep()}
            </div>
            <Footer />

            {showTerms && (
                <div className="popup">
    <div className="popup-content">
      <h3>Terms and Conditions</h3>
      <p>
        By creating an account, you agree to the following terms:
      </p>
      <ul>
      <li><strong>1. Service Agreement:</strong> By creating an account, you agree to adhere to our service policies and maintain professionalism in all transactions.</li>
      <li><strong>2. Payment:</strong> All payments must be processed through our secure payment gateway. No direct payments are allowed between users.</li>
      <li><strong>3. Privacy:</strong> We prioritize your privacy and handle your data according to our <a href="#">Privacy Policy</a>.</li>
      <li><strong>4. Liability:</strong> We are not responsible for any indirect, incidental, or consequential damages.</li>
      <li><strong>5. Modifications:</strong> We reserve the right to update these terms as necessary. You will be notified of any changes.</li>
    </ul>
      <button className="close-btn" onClick={() => setShowTerms(false)}>Close</button>
    </div>
  </div>
            )}

            {showSubmitPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Thank You!</h3>
                        <p>Your details have been submitted. We need some time to verify them. You'll hear from us soon.</p>
                        <button onClick={() => setShowSubmitPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegistrationForm;
