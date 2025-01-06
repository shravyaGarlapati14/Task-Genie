import React, { useState, useEffect,useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Assets/bglogo.png";
import "./Navbar.css";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from './UserContext';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showAccountModal, setShowAccountModal] = useState(false);
  const { user } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Projects", icon: <InfoIcon />, path: "/projectsall" },
    { text: "All Services", icon: <InfoIcon />, path: "/servicesall" },
    { text: "Contact", icon: <PhoneRoundedIcon />, path: "/contact" },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name); // Set the user name from localStorage
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/signin");
    window.location.reload(); // Optionally reload the page or navigate the user
  };

  const handleBecomeTasker = () => {
    navigate("/login");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAccountClick = () => {
    navigate("/dashboard");
  };

  const handleModalClose = () => {
    setShowAccountModal(false);
  };

  const isAllProjectsPage = location.pathname.startsWith("/projects");
  const isAllServicesPage = location.pathname.startsWith("/services");

  // Render dynamic header based on the page
  const renderHeader = () => {
    if (isAllProjectsPage) {
      return <h1 className="heading">All Projects</h1>;
    } else if (isAllServicesPage) {
      return <h1 className="heading">All Services</h1>;
    }
    return null; 
  };

  return (
    <nav
      className={`navbar ${
        isAllProjectsPage || isAllServicesPage ? "white-navbar" : ""
      }`}
      style={{
        position: "absolute",
        width: "100%",
        zIndex: 100,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow here
      }}
    >
      <div className="nav-logo-container">
        <Link to="/">
          <img src={Logo} alt="Logo" style={{ width: "250px", height: "100px" }} />
        </Link>
      </div>

      {/* Conditionally render the dynamic header */}
      {(isAllProjectsPage || isAllServicesPage) ? (
        renderHeader() // Show the dynamic header in place of the search bar
      ) : (
        <div className="navbar-search-container">
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      )}

      <div className="navbar-links-container">
        <Link to="/projectsall">Projects</Link>
        <Link to="/servicesall">Services</Link>

        {isLoggedIn ? (
          <>
      <span className="navbar-username">Hi {user.name}!</span>
      <AccountCircleIcon
              onClick={handleAccountClick}
              style={{ cursor: "pointer", fontSize: "30px" }}
            />
            <a onClick={handleLogout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <button className="navbut" onClick={handleBecomeTasker}>
              Become a Tasker
            </button>
          </>
        )}
      </div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton component={Link} to={item.path} onClick={() => setOpenMenu(false)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Account Modal */}
      <Modal show={showAccountModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Here you can modify your account details.</p>
          <ul>
            <li><Link to="/change-password">Change Password</Link></li>
            <li><Link to="/delete-account">Delete Account</Link></li>
            <li><Link to="/purchase-history">View Purchase History</Link></li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
