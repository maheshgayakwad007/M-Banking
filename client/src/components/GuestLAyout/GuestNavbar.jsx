// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   FiHome, 
//   FiInfo, 
//   FiSettings, 
//   FiMail, 
//   FiUserPlus, 
//   FiLogIn 
// } from 'react-icons/fi';

// const GuestNavbar = () => {
//   const location = useLocation();
  
//   const styles = {
//     navbar: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '1rem 5%',
//       backgroundColor: 'white',
//       boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
//       position: 'sticky',
//       top: 0,
//       zIndex: 1000,
//     },
//     logoContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//     },
//     logo: {
//       height: '36px',
//       width: '36px',
//       borderRadius: '50%',
//       objectFit: 'cover',
//     },
//     brandName: {
//       fontSize: '1.4rem',
//       fontWeight: '700',
//       color: '#2563eb',
//       textDecoration: 'none',
//       letterSpacing: '0.5px',
//     },
//     navLinks: {
//       display: 'flex',
//       gap: '2rem',
//       alignItems: 'center',
//     },
//     navLink: {
//       color: '#64748b',
//       textDecoration: 'none',
//       fontSize: '0.95rem',
//       fontWeight: '500',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//       padding: '0.5rem 0',
//       position: 'relative',
//       transition: 'all 0.3s ease',
//     },
//     activeNavLink: {
//       color: '#2563eb',
//     },
//     navLinkHover: {
//       color: '#2563eb',
//     },
//     navLinkUnderline: {
//       position: 'absolute',
//       bottom: 0,
//       left: 0,
//       width: '0%',
//       height: '2px',
//       backgroundColor: '#2563eb',
//       transition: 'width 0.3s ease',
//     },
//     loginButton: {
//       backgroundColor: '#2563eb',
//       color: 'white',
//       padding: '0.6rem 1.8rem',
//       borderRadius: '6px',
//       textDecoration: 'none',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 2px 5px rgba(37, 99, 235, 0.2)',
//       ':hover': {
//         backgroundColor: '#1d4ed8',
//         transform: 'translateY(-2px)',
//         boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)',
//       },
//     },
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.logoContainer}>
//         <img 
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWd8zv3fU4KDMOpVYc_mI8ePVOnmMFKooXQ&s" 
//           alt="ChainPay Logo" 
//           style={styles.logo} 
//         />
//         <Link to="/" style={styles.brandName}>ChainPay</Link>
//       </div>
      
//       <div style={styles.navLinks}>
//         <Link 
//           to="/" 
//           style={{
//             ...styles.navLink,
//             ...(isActive('/') && styles.activeNavLink)
//           }}
//         >
//           <FiHome size={18} />
//           <span>Home</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/') ? '100%' : '0%'
//           }} />
//         </Link>
        
//         <Link 
//           to="/about" 
//           style={{
//             ...styles.navLink,
//             ...(isActive('/about') && styles.activeNavLink)
//           }}
//         >
//           <FiInfo size={18} />
//           <span>About</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/about') ? '100%' : '0%'
//           }} />
//         </Link>
        
//         <Link 
//           to="/services" 
//           style={{
//             ...styles.navLink,
//             ...(isActive('/services') && styles.activeNavLink)
//           }}
//         >
//           <FiSettings size={18} />
//           <span>Services</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/services') ? '100%' : '0%'
//           }} />
//         </Link>
        
//         <Link 
//           to="/contact" 
//           style={{
//             ...styles.navLink,
//             ...(isActive('/contact') && styles.activeNavLink)
//           }}
//         >
//           <FiMail size={18} />
//           <span>Contact</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/contact') ? '100%' : '0%'
//           }} />
//         </Link>
        
//         <Link 
//           to="/register" 
//           style={{
//             ...styles.navLink,
//             ...(isActive('/register') && styles.activeNavLink)
//           }}
//         >
//           <FiUserPlus size={18} />
//           <span>Register</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/register') ? '100%' : '0%'
//           }} />
//         </Link>
//       </div>
      
//       <Link to="/login" style={styles.loginButton}>
//         <FiLogIn size={18} />
//         <span>Login</span>
//       </Link>
//     </nav>
//   );
// };

// export default GuestNavbar;
import { NavLink } from 'react-router-dom';

const GuestNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Title */}
        <div className="navbar-brand">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWd8zv3fU4KDMOpVYc_mI8ePVOnmMFKooXQ&s" 
            alt="ChainPay Logo" 
            className="navbar-logo"
          />
          <span className="navbar-title">M-Banking</span>
        </div>
        
        {/* Navigation Links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              end
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <i className="fas fa-info-circle"></i>
              <span>About</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <i className="fas fa-cogs"></i>
              <span>Services</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <i className="fas fa-envelope"></i>
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
        
        {/* Auth Links */}
        <div className="navbar-auth">
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? "auth-link active" : "auth-link"}
          >
            <i className="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </NavLink>
          <NavLink 
            to="/register" 
            className={({ isActive }) => isActive ? "auth-link auth-link-primary" : "auth-link auth-link-primary"}
          >
            <i className="fas fa-user-plus"></i>
            <span>Register</span>
          </NavLink>
        </div>
      </div>
      
      {/* Dark Theme Styles */}
      <style>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
          
          .navbar {
            background-color: #1a2235;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            padding: 0.8rem 2rem;
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid #2d3748;
          }
          
          .navbar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .navbar-brand {
            display: flex;
            align-items: center;
            gap: 0.8rem;
          }
          
          .navbar-logo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #6366f1;
          }
          
          .navbar-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #e2e8f0;
            letter-spacing: 0.5px;
          }
          
          .navbar-nav {
            display: flex;
            list-style: none;
            gap: 1.5rem;
            margin: 0;
            padding: 0;
          }
          
          .nav-item {
            display: flex;
            align-items: center;
          }
          
          .nav-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: #a0aec0;
            font-weight: 500;
            padding: 0.5rem 0.8rem;
            border-radius: 0.375rem;
            transition: all 0.3s ease;
          }
          
          .nav-link:hover {
            color: #818cf8;
            background-color: #2d3748;
          }
          
          .nav-link.active {
            color: #6366f1;
            background-color: rgba(99, 102, 241, 0.1);
          }
          
          .navbar-auth {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          
          .auth-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: #a0aec0;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: all 0.3s ease;
          }
          
          .auth-link:hover {
            color: #818cf8;
            background-color: #2d3748;
          }
          
          .auth-link.active {
            color: #6366f1;
            background-color: rgba(99, 102, 241, 0.1);
          }
          
          .auth-link-primary {
            background-color: #6366f1;
            color: white;
          }
          
          .auth-link-primary:hover {
            background-color: #818cf8;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          }
          
          /* Responsive design */
          @media (max-width: 768px) {
            .navbar-container {
              flex-direction: column;
              gap: 1rem;
            }
            
            .navbar-nav {
              gap: 0.8rem;
              flex-wrap: wrap;
              justify-content: center;
            }
            
            .navbar-auth {
              gap: 0.8rem;
              flex-wrap: wrap;
              justify-content: center;
            }
            
            .nav-link, .auth-link {
              padding: 0.4rem 0.6rem;
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default GuestNavbar;