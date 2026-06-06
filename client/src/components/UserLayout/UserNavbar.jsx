// import React from 'react';
// import { Link } from 'react-router-dom';

// const UserNavbar = () => {
//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.navContainer}>
//         {/* Logo and Title */}
//         <div style={styles.logoContainer}>
//           <div style={styles.logo}>
//             <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM20 36C11.16 36 4 28.84 4 20C4 11.16 11.16 4 20 4C28.84 4 36 11.16 36 20C36 28.84 28.84 36 20 36Z" fill="#4A90E2"/>
//               <path d="M20 8C13.36 8 8 13.36 8 20C8 26.64 13.36 32 20 32C26.64 32 32 26.64 32 20C32 13.36 26.64 8 20 8ZM20 28C15.6 28 12 24.4 12 20C12 15.6 15.6 12 20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28Z" fill="#4A90E2"/>
//               <path d="M20 16C17.8 16 16 17.8 16 20C16 22.2 17.8 24 20 24C22.2 24 24 22.2 24 20C24 17.8 22.2 16 20 16Z" fill="#4A90E2"/>
//             </svg>
//           </div>
//           <h1 style={styles.title}>ChainPay Portal</h1>
//         </div>
        
//         {/* Navigation Links */}
//         <div style={styles.navLinks}>
          
//           <Link to="/user/TransactionVisualization" style={styles.navLink}>Dashbaord</Link>
          
//           <Link to="/user/Transaction" style={styles.navLink}>Transaction</Link>
//           <Link to="/user/blocks" style={styles.navLink}>Blocks</Link>
//           <Link to="/user" style={styles.navLink}>Profile</Link>
//           <Link to="/user/changepassword" style={styles.navLink}>ChangePasssword</Link>
          
//         </div>
        
//         {/* Login Button */}
//         <Link to="/login" style={styles.loginButton}>
//           Login
//           <span style={styles.loginButtonHover}></span>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// // Internal CSS Styles
// const styles = {
//   navbar: {
//     backgroundColor: '#ffffff',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1000,
//     padding: '0.5rem 0',
//     transition: 'all 0.3s ease',
//   },
//   navContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '0 2rem',
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1rem',
//   },
//   logo: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '50px',
//     height: '50px',
//     borderRadius: '50%',
//     backgroundColor: '#f5f7fa',
//     transition: 'transform 0.3s ease',
//   },
//   title: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#2c3e50',
//     margin: 0,
//     background: 'linear-gradient(90deg, #4A90E2, #2c3e50)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     transition: 'all 0.3s ease',
//   },
//   navLinks: {
//     display: 'flex',
//     gap: '2rem',
//     alignItems: 'center',
//   },
//   navLink: {
//     color: '#2c3e50',
//     textDecoration: 'none',
//     fontWeight: '600',
//     fontSize: '1rem',
//     position: 'relative',
//     padding: '0.5rem 0',
//     transition: 'color 0.3s ease',
//   },
//   navLinkHover: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: '0%',
//     height: '2px',
//     backgroundColor: '#4A90E2',
//     transition: 'width 0.3s ease',
//   },
//   loginButton: {
//     backgroundColor: '#4A90E2',
//     color: '#ffffff',
//     padding: '0.7rem 1.5rem',
//     borderRadius: '25px',
//     textDecoration: 'none',
//     fontWeight: '600',
//     fontSize: '1rem',
//     position: 'relative',
//     overflow: 'hidden',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 6px rgba(74, 144, 226, 0.2)',
//   },
//   loginButtonHover: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '0',
//     height: '0',
//     borderRadius: '50%',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     transition: 'width 0.3s ease, height 0.3s ease',
//   },
// };

// // Adding hover effects
// const addHoverEffects = () => {
//   // Navbar hover effect
//   const navbar = document.querySelector('nav');
//   if (navbar) {
//     navbar.addEventListener('mouseenter', () => {
//       navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
//     });
//     navbar.addEventListener('mouseleave', () => {
//       navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
//     });
//   }

//   // Logo hover effect
//   const logo = document.querySelector('.logo');
//   if (logo) {
//     logo.addEventListener('mouseenter', () => {
//       logo.style.transform = 'rotate(15deg) scale(1.1)';
//     });
//     logo.addEventListener('mouseleave', () => {
//       logo.style.transform = 'rotate(0deg) scale(1)';
//     });
//   }

//   // Title hover effect
//   const title = document.querySelector('.title');
//   if (title) {
//     title.addEventListener('mouseenter', () => {
//       title.style.background = 'linear-gradient(90deg, #2c3e50, #4A90E2)';
//     });
//     title.addEventListener('mouseleave', () => {
//       title.style.background = 'linear-gradient(90deg, #4A90E2, #2c3e50)';
//     });
//   }

//   // Nav link hover effects
//   const navLinks = document.querySelectorAll('.navLink');
//   navLinks.forEach(link => {
//     const hoverElement = document.createElement('div');
//     hoverElement.style.cssText = styles.navLinkHover;
//     link.appendChild(hoverElement);

//     link.addEventListener('mouseenter', () => {
//       link.style.color = '#4A90E2';
//       hoverElement.style.width = '100%';
//     });
//     link.addEventListener('mouseleave', () => {
//       link.style.color = '#2c3e50';
//       hoverElement.style.width = '0%';
//     });
//   });

//   // Login button hover effect
//   const loginButton = document.querySelector('.loginButton');
//   if (loginButton) {
//     const hoverElement = loginButton.querySelector('.loginButtonHover');
//     loginButton.addEventListener('mouseenter', () => {
//       loginButton.style.backgroundColor = '#3a7bc8';
//       hoverElement.style.width = '200%';
//       hoverElement.style.height = '200%';
//     });
//     loginButton.addEventListener('mouseleave', () => {
//       loginButton.style.backgroundColor = '#4A90E2';
//       hoverElement.style.width = '0';
//       hoverElement.style.height = '0';
//     });
//   }
// };

// // Call the hover effects after component mounts
// document.addEventListener('DOMContentLoaded', addHoverEffects);

// export default UserNavbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaTachometerAlt, 
  FaExchangeAlt, 
  FaCube, 
  FaKey 
} from "react-icons/fa";

const UserNavbar = () => {
  return (
    <nav className="user-navbar">
      <div className="user-nav-container">
        {/* Logo and Title */}
        <div className="user-logo-container">
          <div className="user-navbar-logo">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWd8zv3fU4KDMOpVYc_mI8ePVOnmMFKooXQ&s"
              alt="ChainPay Logo"
              className="navbar-logo"
            />
          </div>
          <h1 className="user-navbar-title">M-Banking</h1>
        </div>
        
        {/* Navigation Links */}
        <div className="user-nav-links">
          <Link to="/user/TransactionVisualization" className="user-nav-link">
            <FaTachometerAlt className="nav-icon" /> Dashboard
          </Link>
          <Link to="/user/Transaction" className="user-nav-link">
            <FaExchangeAlt className="nav-icon" /> Transaction
          </Link>
          <Link to="/user/blocks" className="user-nav-link">
            <FaCube className="nav-icon" /> Blocks
          </Link>
          <Link to="/user" className="user-nav-link">
            <FaUser className="nav-icon" /> Profile
          </Link>
          <Link to="/user/changepassword" className="user-nav-link">
            <FaKey className="nav-icon" /> Change Password
          </Link>
        </div>
        
        {/* Login Button */}
        <Link to="/" className="user-login-button">
          <FaSignOutAlt className="nav-icon" /> Logout
        </Link>
      </div>
      
      <style>
        {`
          .user-navbar {
            background-color: #1a2235;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 0.8rem 0;
            transition: all 0.3s ease;
            border-bottom: 1px solid #2d3748;
          }
          
          .user-nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }
          
          .user-logo-container {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          
          .user-navbar-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #2d3748;
            overflow: hidden;
            transition: transform 0.3s ease;
          }

          .navbar-logo {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          /* Logo zoom-in on hover */
          .user-navbar-logo:hover .navbar-logo {
            transform: scale(1.2);
          }
          
          .user-navbar-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #e2e8f0;
            margin: 0;
            background: linear-gradient(90deg, #6366f1, #818cf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: transform 0.3s ease, background 0.3s ease;
          }

          /* Title zoom-in on hover */
          .user-navbar-title:hover {
            transform: scale(1.1);
            color: linear-gradient(90deg, #818cf8, #6366f1);
          }
          
          .user-nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
          }
          
          .user-nav-link {
            color: #e2e8f0;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            position: relative;
            padding: 0.5rem 0;
            transition: color 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .user-nav-link::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background-color: #818cf8;
            transition: width 0.3s ease;
          }

          .user-nav-link:hover {
            color: #818cf8;
          }

          .user-nav-link:hover::after {
            width: 100%;
          }
          
          .nav-icon {
            font-size: 1rem;
            transition: transform 0.3s ease;
          }
          
          .user-nav-link:hover .nav-icon {
            transform: scale(1.2);
          }
          
          .user-login-button {
            background-color: #6366f1;
            color: #ffffff;
            padding: 0.7rem 1.5rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .user-login-button:hover {
            background-color: #818cf8;
            transform: scale(1.05);
          }
          
          .user-login-button:hover .nav-icon {
            transform: translateX(3px);
          }
          
          /* Responsive design */
          @media (max-width: 768px) {
            .user-nav-container {
              flex-direction: column;
              gap: 1rem;
            }
            
            .user-nav-links {
              gap: 1rem;
              flex-wrap: wrap;
              justify-content: center;
            }
            
            .user-nav-link {
              font-size: 0.9rem;
            }
            
            .user-login-button {
              padding: 0.5rem 1.2rem;
              font-size: 0.9rem;
            }
            
            .nav-icon {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default UserNavbar;