
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

// const AdminNavbar = () => {
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
//           to="/admin/Dashboard" 
//           style={{
//             ...styles.navLink,
//             ...(isActive('/admin/Dashboard') && styles.activeNavLink)
//           }}
//         >
//           <FiUserPlus size={18} />
//           <span>Dashboard</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/admin/Dashboard') ? '100%' : '0%'
//           }} />
//         </Link>
        
//         <Link
//           to="/admin/AllTransactions"
//           style={{
//             ...styles.navLink,
//             ...(isActive('/contact') && styles.activeNavLink)
//           }}
//         >
//           <FiMail size={18} />
//           <span>AllTransactions</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/contact') ? '100%' : '0%'
//           }} />
//         </Link>
        
//         <Link
//           to="/admin/profile"
//           style={{
//             ...styles.navLink,
//             ...(isActive('/') && styles.activeNavLink)
//           }}
//         >
//           <FiHome size={18} />
//           <span>Profile</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/') ? '100%' : '0%'
//           }} />
//         </Link>

//         <Link
//           to="/admin/changepassword"
//           style={{
//             ...styles.navLink,
//             ...(isActive('/about') && styles.activeNavLink)
//           }}
//         >
//           <FiInfo size={18} />
//           <span>chnagePassword</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/about') ? '100%' : '0%'
//           }} />
//         </Link>

//          <Link 
//           to="/admin/Block" 
//           style={{
//             ...styles.navLink,
//             ...(isActive('/services') && styles.activeNavLink)
//           }}
//         >
//           <FiSettings size={18} />
//           <span>BlockChain</span>
//           <div style={{
//             ...styles.navLinkUnderline,
//             width: isActive('/services') ? '100%' : '0%'
//           }} />
//         </Link>



        
//       </div>

//       <Link to="/" style={styles.loginButton}>
//         <FiLogIn size={18} />
//         <span>Logout</span>
//       </Link>
//     </nav>
//   );
// };

// export default AdminNavbar;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiLogOut,
  FiPieChart,
  FiDatabase,
  FiUser,
  FiLock,
  FiCpu,
  FiMenu,
  FiX
} from 'react-icons/fi';

const AdminNavbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-logo-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWd8zv3fU4KDMOpVYc_mI8ePVOnmMFKooXQ&s"
            alt="ChainPay Logo"
            className="admin-logo"
          />
          <Link to="/admin/dashboard" className="admin-brand-name">
            M-Banking Admin
          </Link>
        </div>

        <div className={`admin-nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/admin/dashboard" 
            className={`admin-nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <FiPieChart className="nav-icon" />
            <span>Dashboard</span>
          </Link>
          
          <Link
            to="/admin/AllTransactions"
            className={`admin-nav-link ${isActive('/admin/transactions') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <FiDatabase className="nav-icon" />
            <span>Transactions</span>
          </Link>
          
          <Link
            to="/admin/profile"
            className={`admin-nav-link ${isActive('/admin/profile') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <FiUser className="nav-icon" />
            <span>Profile</span>
          </Link>

          <Link
            to="/admin/changepassword"
            className={`admin-nav-link ${isActive('/admin/change-password') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <FiLock className="nav-icon" />
            <span>Change Password</span>
          </Link>

          <Link 
            to="/admin/block" 
            className={`admin-nav-link ${isActive('/admin/blockchain') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <FiCpu className="nav-icon" />
            <span>Blockchain</span>
          </Link>
        </div>

        <div className="admin-nav-actions">
          <Link 
            to="/" 
            className="admin-logout-btn"
          >
            <FiLogOut className="nav-icon" />
            <span>Logout</span>
          </Link>

          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <style jsx>{`
        .admin-navbar {
          background-color: #1a2235;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 0.8rem 0;
          border-bottom: 1px solid #2d3748;
        }
        
        .admin-nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .admin-logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .admin-logo {
          height: 36px;
          width: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #4f46e5;
        }
        
        .admin-brand-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #e2e8f0;
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }
        
        .admin-brand-name:hover {
          color: #818cf8;
        }
        
        .admin-nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        
        .admin-nav-link {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0.5rem 0;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .admin-nav-link:hover {
          color: #818cf8;
        }
        
        .admin-nav-link.active {
          color: #6366f1;
        }
        
        .admin-nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #6366f1;
          transition: width 0.3s ease;
        }
        
        .admin-nav-link:hover::after,
        .admin-nav-link.active::after {
          width: 100%;
        }
        
        .nav-icon {
          font-size: 1.1rem;
        }
        
        .admin-nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .admin-logout-btn {
          background-color: #6366f1;
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(99, 102, 241, 0.3);
        }
        
        .admin-logout-btn:hover {
          background-color: #818cf8;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(99, 102, 241, 0.4);
        }
        
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #cbd5e1;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-toggle:hover {
          color: #818cf8;
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 900px) {
          .admin-nav-links {
            position: fixed;
            top: 64px;
            left: 0;
            width: 100%;
            height: 0;
            background-color: #1a2235;
            flex-direction: column;
            gap: 0;
            overflow: hidden;
            transition: height 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          
          .admin-nav-links.active {
            height: auto;
            padding: 1rem 0;
            border-top: 1px solid #2d3748;
          }
          
          .admin-nav-link {
            width: 100%;
            padding: 1rem 2rem;
            justify-content: flex-start;
            border-bottom: 1px solid #2d3748;
          }
          
          .admin-nav-link:last-child {
            border-bottom: none;
          }
          
          .mobile-menu-toggle {
            display: block;
          }
        }
        
        @media (max-width: 600px) {
          .admin-nav-container {
            padding: 0 1rem;
          }
          
          .admin-brand-name {
            font-size: 1.2rem;
          }
          
          .admin-logout-btn span {
            display: none;
          }
          
          .admin-logout-btn {
            padding: 0.6rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default AdminNavbar;