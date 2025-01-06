import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Discover Section */}
        <div>
          <h4 style={styles.heading}>Discover</h4>
          <ul style={styles.list}>
            <li><a href="#" style={styles.link}>Become a Tasker</a></li>
            <li><a href="#" style={styles.link}>All Services</a></li>
            <li><a href="#" style={styles.link}>Popular Projects</a></li>
            <li><a href="#" style={styles.link}>Help & Support</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4 style={styles.heading}>Company</h4>
          <ul style={styles.list}>
            <li><a href="#" style={styles.link}>About Task Genie</a></li>
            <li><a href="#" style={styles.link}>Projects</a></li>
            <li><a href="#" style={styles.link}>Terms & Conditions</a></li>
            <li><a href="#" style={styles.link}>Privacy Policy</a></li>
            <li><a href="#" style={styles.link}>Legal Information</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 style={styles.heading}>Contact</h4>
          <ul style={styles.list}>
            <li><a href="#" style={styles.link}>Get in Touch</a></li>
            <li><a href="#" style={styles.link}>FAQs</a></li>
            <li><a href="#" style={styles.link}>Support</a></li>
            <li><a href="#" style={styles.link}>Feedback</a></li>
          </ul>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Task Genie. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Inline styles object
const styles = {
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '50px 20px',
    fontFamily: "'Nunito', sans-serif",
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
    borderBottom: '1px solid #555',
    paddingBottom: '30px',
  },
  list: {
    listStyle: 'none',
    paddingLeft: '0',
    margin: '20px 0',
  },
  link: {
    color: '#00bcd4', // Light blue for links
    textDecoration: 'none',
    marginBottom: '10px',
    display: 'block',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#fff', // Hover color
  },
  heading: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  bottomBar: {
    textAlign: 'center',
    paddingTop: '20px',
    fontSize: '14px',
    color: '#ccc',
  },
};

export default Footer;
