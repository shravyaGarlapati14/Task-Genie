import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { MdOutlineDashboard, MdLogout, MdMessage, MdAccountCircle, MdAdsClick, } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineProfile,  } from "react-icons/ai";
import Logo from "../Assets/bglogo.png";
import "../css/navbar2.css";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user, updateUser } = useContext(UserContext); // Use updateUser instead of setUser
  const [userName, setUserName] = useState(user?.firstName || "Guest");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     setUserName(user?.firstName || "Guest");
// }, [user]);
useEffect(() => {
  // Update userName and profileImage when the user data changes (e.g., after login)
  if (user) {
    setUserName(user.firstName || "Guest");
    setProfileImage(user.profileImage || "");
  }
}, [user]);  // Re-run when user context changes


  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    updateUser(null); // Clear the user from context using updateUser
    navigate("/login");
  }, [updateUser, navigate]);

  const closeSidebar = useCallback(() => setOpenMenu(false), []);

  const menuOptions = [
    { text: "Bookings", icon: <AiOutlineShoppingCart />, path: "/upcomingbookings" },
    { text: "Ads", icon: <MdAdsClick />, path: "/adsection" },
    // { text: "Messages", icon: <MdMessage />, path: "/messages" },
    { text: "Earnings", icon: <MdOutlineDashboard />, path: "/earnings" },
    { text: "Reviews", icon: <AiOutlineProfile />, path: "/reviews" },
  ];

  // const profileImage = user?.profileImage;
   // Assuming `profileImage` is a URL or base64 string in the `user` object

  return (
    <nav className="tasker-navbar">
      <div className="tasker-navbar-left">
        <Link to="/homepage">
          <img src={Logo} alt="Logo" className="tasker-navbar-logo" />
        </Link>
      </div>

      <div className="tasker-navbar-center">
        <ul className="tasker-navbar-links">
          {menuOptions.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="tasker-navbar-link">
                {item.icon}
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="tasker-navbar-right">
        {user ? (
          <>
            <span className="tasker-navbar-username">Hi, {userName}!</span>
            <div
              className="tasker-navbar-icon"
              onClick={() => navigate("/update-profile")}
              style={{ cursor: "pointer" }}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="tasker-navbar-profile-image"
                />
              ) : (
                <MdAccountCircle />
              )}
            </div>
            <button className="tasker-navbar-logout" onClick={handleLogout}>
              <MdLogout /> Logout
            </button>
          </>
        ) : (
          <>
            {/* <Link to="/signin" className="tasker-navbar-login">
              Sign In
            </Link>
            <button
              className="tasker-navbar-cta"
              onClick={() => navigate("/register")}
            >
              Become a Tasker
            </button> */}
          </>
        )}
      </div>

      <div className="tasker-navbar-menu">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      {openMenu && (
        <div className="tasker-sidebar-overlay" onClick={closeSidebar}>
          <div className="tasker-sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="tasker-close-sidebar" onClick={closeSidebar}>
              &times;
            </button>
            <ul className="tasker-sidebar-links">
              {menuOptions.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="tasker-sidebar-link"
                    onClick={closeSidebar}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {user && (
              <button className="tasker-sidebar-logout" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
