// import React, { useEffect } from 'react';
// import { FaMoneyBillWave, FaShieldAlt, FaMobileAlt, FaGlobe, FaChartLine, FaQrcode } from 'react-icons/fa';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Services = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//     });
//   }, []);

//   const servicesStyle = {
//     fontFamily: "'Poppins', sans-serif",
//     backgroundColor: '#f5f7ff',
//     color: '#333',
//     padding: '60px 20px',
//     maxWidth: '1200px',
//     margin: '0 auto',
//   };

//   const headerStyle = {
//     textAlign: 'center',
//     marginBottom: '60px',
//   };

//   const titleStyle = {
//     fontSize: '2.8rem',
//     fontWeight: '700',
//     marginBottom: '15px',
//     fontFamily: "'Merriweather', serif",
//     color: '#2a2d3e',
//     background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//   };

//   const subtitleStyle = {
//     fontSize: '1.2rem',
//     color: '#666',
//     maxWidth: '700px',
//     margin: '0 auto',
//   };

//   const servicesGridStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//     gap: '30px',
//     marginTop: '50px',
//   };

//   const serviceCardStyle = {
//     backgroundColor: '#fff',
//     borderRadius: '12px',
//     padding: '30px',
//     boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
//     transition: 'all 0.3s ease',
//     cursor: 'pointer',
//     border: '1px solid rgba(0,0,0,0.05)',
//     position: 'relative',
//     overflow: 'hidden',
//     zIndex: '1',
//   };

//   const cardHoverEffect = {
//     ':hover': {
//       transform: 'translateY(-10px)',
//       boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
//     },
//     ':hover::before': {
//       height: '100%',
//     },
//   };

//   const cardBeforeStyle = {
//     content: '""',
//     position: 'absolute',
//     top: '0',
//     left: '0',
//     width: '100%',
//     height: '5px',
//     background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
//     transition: 'height 0.3s ease',
//     zIndex: '-1',
//   };

//   const iconStyle = (color) => ({
//     fontSize: '2.5rem',
//     marginBottom: '20px',
//     color: color,
//     background: 'rgba(0,0,0,0.03)',
//     width: '70px',
//     height: '70px',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   });

//   const cardTitleStyle = {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     marginBottom: '15px',
//     fontFamily: "'Merriweather', serif",
//     color: '#2a2d3e',
//   };

//   return (
//     <div style={servicesStyle}>
//       <header style={headerStyle} data-aos="fade-down">
//         <h1 style={titleStyle}>Our Services</h1>
//         <p style={subtitleStyle}>
//           Experience next-generation financial services powered by blockchain technology.
//           Secure, fast, and transparent solutions for all your payment needs.
//         </p>
//       </header>

//       <div style={servicesGridStyle}>
//         {/* Send Money */}
//         <div 
//           style={{ 
//             ...serviceCardStyle,
//             ':hover': {
//               transform: 'translateY(-10px)',
//               boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
//             },
//             '::before': {
//               content: '""',
//               position: 'absolute',
//               top: '0',
//               left: '0',
//               width: '100%',
//               height: '5px',
//               background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
//               transition: 'height 0.3s ease',
//               zIndex: '-1',
//             },
//             ':hover::before': {
//               height: '100%',
//             }
//           }} 
//           data-aos="fade-up"
//           data-aos-delay="100"
//         >
//           <div style={iconStyle('#6a11cb')}>
//             <FaMoneyBillWave />
//           </div>
//           <h3 style={cardTitleStyle}>Send Money</h3>
//           <p>
//             Instantly transfer funds to anyone, anywhere with our blockchain-powered network. 
//             Lower fees than traditional banking with settlement in seconds.
//           </p>
//         </div>

//         {/* Receive Payments */}
//         <div 
//           style={{ 
//             ...serviceCardStyle,
//             ':hover': {
//               transform: 'translateY(-10px)',
//               boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
//             },
//             '::before': {
//               content: '""',
//               position: 'absolute',
//               top: '0',
//               left: '0',
//               width: '100%',
//               height: '5px',
//               background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
//               transition: 'height 0.3s ease',
//               zIndex: '-1',
//             },
//             ':hover::before': {
//               height: '100%',
//             }
//           }} 
//           data-aos="fade-up"
//           data-aos-delay="200"
//         >
//           <div style={iconStyle('#11998e')}>
//             <FaMobileAlt />
//           </div>
//           <h3 style={cardTitleStyle}>Receive Payments</h3>
//           <p>
//             Accept payments securely with your blockchain wallet. 
//             Generate payment requests or share your wallet address for seamless transactions.
//           </p>
//         </div>

//         {/* Security */}
//         <div 
//           style={{ 
//             ...serviceCardStyle,
//             ':hover': {
//               transform: 'translateY(-10px)',
//               boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
//             },
//             '::before': {
//               content: '""',
//               position: 'absolute',
//               top: '0',
//               left: '0',
//               width: '100%',
//               height: '5px',
//               background: 'linear-gradient(90deg, #f12711 0%, #f5af19 100%)',
//               transition: 'height 0.3s ease',
//               zIndex: '-1',
//             },
//             ':hover::before': {
//               height: '100%',
//             }
//           }} 
//           data-aos="fade-up"
//           data-aos-delay="300"
//         >
//           <div style={iconStyle('#f12711')}>
//             <FaShieldAlt />
//           </div>
//           <h3 style={cardTitleStyle}>Advanced Security</h3>
//           <p>
//             Military-grade encryption and decentralized validation protect every transaction. 
//             Your funds are secured by blockchain's immutable ledger technology.
//           </p>
//         </div>

//         {/* QR Payments */}
//         <div 
//           style={{ 
//             ...serviceCardStyle,
//             ':hover': {
//               transform: 'translateY(-10px)',
//               boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
//             },
//             '::before': {
//               content: '""',
//               position: 'absolute',
//               top: '0',
//               left: '0',
//               width: '100%',
//               height: '5px',
//               background: 'linear-gradient(90deg, #654ea3 0%, #eaafc8 100%)',
//               transition: 'height 0.3s ease',
//               zIndex: '-1',
//             },
//             ':hover::before': {
//               height: '100%',
//             }
//           }} 
//           data-aos="fade-up"
//           data-aos-delay="100"
//         >
//           <div style={iconStyle('#654ea3')}>
//             <FaQrcode />
//           </div>
//           <h3 style={cardTitleStyle}>QR Code Payments</h3>
//           <p>
//             Pay merchants instantly by scanning QR codes. 
//             No need to share sensitive bank details - just scan and confirm.
//           </p>
//         </div>

//         {/* Global */}
//         <div 
//           style={{ 
//             ...serviceCardStyle,
//             ':hover': {
//               transform: 'translateY(-10px)',
//               boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
//             },
//             '::before': {
//               content: '""',
//               position: 'absolute',
//               top: '0',
//               left: '0',
//               width: '100%',
//               height: '5px',
//               background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)',
//               transition: 'height 0.3s ease',
//               zIndex: '-1',
//             },
//             ':hover::before': {
//               height: '100%',
//             }
//           }} 
//           data-aos="fade-up"
//           data-aos-delay="200"
//         >
//           <div style={iconStyle('#0072ff')}>
//             <FaGlobe />
//           </div>
//           <h3 style={cardTitleStyle}>Cross-Border Payments</h3>
//           <p>
//             Send money internationally without exorbitant fees. 
//             Our blockchain network eliminates currency exchange middlemen.
//           </p>
//         </div>

//         {/* Analytics */}
//         <div 
//           style={{ 
//             ...serviceCardStyle,
//             ':hover': {
//               transform: 'translateY(-10px)',
//               boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
//             },
//             '::before': {
//               content: '""',
//               position: 'absolute',
//               top: '0',
//               left: '0',
//               width: '100%',
//               height: '5px',
//               background: 'linear-gradient(90deg, #f46b45 0%, #eea849 100%)',
//               transition: 'height 0.3s ease',
//               zIndex: '-1',
//             },
//             ':hover::before': {
//               height: '100%',
//             }
//           }} 
//           data-aos="fade-up"
//           data-aos-delay="300"
//         >
//           <div style={iconStyle('#f46b45')}>
//             <FaChartLine />
//           </div>
//           <h3 style={cardTitleStyle}>Transaction Analytics</h3>
//           <p>
//             Detailed insights into your payment history. 
//             Track spending patterns and generate reports from your immutable blockchain records.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;
import React, { useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaExchangeAlt, 
  FaGlobe, 
  FaMobileAlt, 
  FaChartLine, 
  FaCreditCard 
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const services = [
    {
      id: 1,
      icon: <FaShieldAlt />,
      title: 'Secure Transactions',
      description: 'Bank-level security with advanced encryption and multi-factor authentication to protect your financial data.',
      color: '#2563eb'
    },
    {
      id: 2,
      icon: <FaExchangeAlt />,
      title: 'Instant Transfers',
      description: 'Send and receive money globally in seconds with minimal fees and real-time transaction processing.',
      color: '#059669'
    },
    {
      id: 3,
      icon: <FaGlobe />,
      title: 'Global Access',
      description: 'Access your account from anywhere in the world with our international banking infrastructure.',
      color: '#d97706'
    },
    {
      id: 4,
      icon: <FaMobileAlt />,
      title: 'Mobile Banking',
      description: 'Full banking capabilities on your smartphone with our intuitive, feature-rich mobile application.',
      color: '#dc2626'
    },
    {
      id: 5,
      icon: <FaChartLine />,
      title: 'Investment Tools',
      description: 'Smart investment recommendations and portfolio management tools powered by AI algorithms.',
      color: '#7c3aed'
    },
    {
      id: 6,
      icon: <FaCreditCard />,
      title: 'Virtual Cards',
      description: 'Generate disposable virtual cards for online purchases with enhanced security controls.',
      color: '#db2777'
    }
  ];

  return (
    <section className="services-section">
      <style jsx>{`
        .services-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
          color: #1e293b;
          position: relative;
        }
        
        .section-title:after {
          content: '';
          display: block;
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, #2563eb, #059669);
          margin: 1rem auto 0;
          border-radius: 2px;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .service-card {
          background: white;
          padding: 2.5rem 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .service-card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(135deg, var(--card-color), transparent);
          transition: height 0.5s ease;
          z-index: -1;
          opacity: 0.1;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px rgba(0,0,0,0.1);
        }
        
        .service-card:hover:before {
          height: 100%;
        }
        
        .icon-wrapper {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--card-color), transparent);
          color: var(--card-color);
          font-size: 2rem;
          transition: all 0.3s ease;
        }
        
        .service-card:hover .icon-wrapper {
          background: var(--card-color);
          color: white;
          transform: scale(1.1) rotate(5deg);
        }
        
        .service-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #1e293b;
          transition: color 0.3s ease;
        }
        
        .service-card:hover h3 {
          color: var(--card-color);
        }
        
        .service-card p {
          color: #64748b;
          line-height: 1.6;
          transition: color 0.3s ease;
        }
        
        .service-card:hover p {
          color: #475569;
        }
        
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .service-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Our Services</h2>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              style={{ '--card-color': service.color } }
            >
              <div className="icon-wrapper">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;