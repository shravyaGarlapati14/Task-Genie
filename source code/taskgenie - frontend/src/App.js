import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import PopularProjects from './components/PopularProjects';
import ProjectDetail from './components/ProjectDetail'; 
import AllProjects from './components/AllProjects';
import PopularServices from './components/PopularServices';
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import RegistrationForm from './components/registrationform'; 
import Login from './components/Login'; 
import AllServices from './components/AllServices';
import ServiceDetails from './components/ServiceDetails';
import './App.css';
import Account from './components/Account';
import Dashboard from './components/Dashboard';
import MyProfile from './components/MyProfile';
import Navbar from './components/Navbar';
import Navbar2 from './components/navbar2';  // Make sure this is the correct import
import Profile from './components/Profile';
import Bookings from './components/Bookings';
import UpcomingBookings from './components/UpcomingBookings';
import Messages from './components/Messages';
import Messagesend from './components/Messagesend';
import Reviews from './components/Reviews';
import Homepage from './components/Homepage';
import { UserProvider } from './components/UserContext';
import UpdateProfile from './components/UpdateProfile';
import AdsSection from './components/AdsSection';
import Earnings from './components/Earnings';

// import RatingsComponent from './components/RatingsComponent';

function App() {
  const [name, setName] = useState('');
  const [isServiceProvider, setIsServiceProvider] = useState(false); // Added state to track user role

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log("Stored User:", storedUser); // Check if the data is retrieved
    if (storedUser && storedUser.name) {
      setName(storedUser.name);
      setIsServiceProvider(storedUser.isServiceProvider || false);
    }
  }, []);
  
  const updateName = (newName) => {
    setName(newName);
  };

  return (
    <UserProvider>
      <Router>
        {/* Conditionally render Navbar based on user type */}
        {isServiceProvider ? <Navbar2 /> : <Navbar name={name} />}
        
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<PopularProjects />} />
            <Route path="/projectsall" element={<AllProjects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} /> 
            <Route path="/popularservices" element={<PopularServices />} />
            <Route path="/servicesall" element={<AllServices />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />         
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/footer" element={<Footer />} /> 
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/booking" element={<Bookings />} /> 
            <Route path="/upcomingbookings" element={<UpcomingBookings />} /> 
            <Route path="/messages" element={<Messages />} />
            <Route path="/messagesend" element={<Messagesend />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path='/adsection'element={<AdsSection />} />
            <Route path='/earnings'element={<Earnings />} />
            {/* <Route path='/rc'element={<RatingsComponent />} /> */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}


export default App;
