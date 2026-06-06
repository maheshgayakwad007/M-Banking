// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaLock, FaBolt, FaGlobe } from "react-icons/fa";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import About from './About';
// import Services from './Services';
// import Contact from './Conatct';

// const Home = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);

//   const carouselImages = [
//     'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80',
//     'https://miro.medium.com/v2/resize:fit:2160/1*H7XzqV0r4YdQK90w3Rf67w.gif',
//     'https://media.licdn.com/dms/image/v2/D4E12AQEQo4nBKWd17Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709215919787?e=2147483647&v=beta&t=YwIyPbhDQVO2XJBb8J2gfv-LAtbd8HCaSxdWk_uSN2E'
//   ];

//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero-section" data-aos="fade-up">
//         <div className="hero-content">
//           <h1 data-aos="fade-up" data-aos-delay="100">
//             Welcome to <span className="highlight">ChainPay</span>
//           </h1>
//           <p className="subtitle" data-aos="fade-up" data-aos-delay="200">
//             Revolutionizing Digital Payments with Blockchain Technology
//           </p>
//           <p className="description" data-aos="fade-up" data-aos-delay="300">
//             Experience the future of secure, transparent, and decentralized transactions.
//             ChainPay combines the convenience of UPI with the power of blockchain,
//             ensuring every transaction is immutable and verifiable.
//           </p>
//           <div className="cta-buttons" data-aos="fade-up" data-aos-delay="400">
//             <button className="primary-btn">Get Started</button>
//             <button className="secondary-btn">Learn More</button>
//           </div>
//         </div>
//         <div className="hero-image" data-aos="fade-left" data-aos-delay="500">
//           <img
//             src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
//             alt="Blockchain Technology"
//           />
//         </div>
//       </section>

//       {/* Features Carousel */}
//       <section className="features-section" data-aos="fade-up">
//         <h2>Why Choose ChainPay?</h2>
//         <div className="carousel-container">
//           <Carousel
//             showArrows={true}
//             infiniteLoop={true}
//             showThumbs={false}
//             showStatus={false}
//             autoPlay={true}
//             interval={5000}
//           >
//             {carouselImages.map((img, index) => (
//               <div key={index}>
//                 <img src={img} alt={`Feature ${index + 1}`} />
//                 <p className="legend">
//                   {index === 0 && "Secure Blockchain Transactions"}
//                   {index === 1 && "Instant UPI-like Payments"}
//                   {index === 2 && "Decentralized Finance Solutions"}
//                 </p>
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       </section>

//       {/* Key Benefits */}
//       <section className="benefits-section">
//         <div className="benefit-card" data-aos="fade-up">
//           <div className="icon">
//             <FaLock size={40} />
//           </div>
//           <h3>Enhanced Security</h3>
//           <p>Every transaction is cryptographically secured and recorded on the blockchain.</p>
//         </div>

//         <div className="benefit-card" data-aos="fade-up" data-aos-delay="200">
//           <div className="icon">
//             <FaBolt size={40} />
//           </div>
//           <h3>Lightning Fast</h3>
//           <p>Experience near-instant settlements with our optimized blockchain network.</p>
//         </div>

//         <div className="benefit-card" data-aos="fade-up" data-aos-delay="400">
//           <div className="icon">
//             <FaGlobe size={40} />
//           </div>
//           <h3>Transparent</h3>
//           <p>Full transaction history visible on the immutable blockchain ledger.</p>
//         </div>
//       </section>


//       <style jsx>{`
//         .home-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 2rem;
//           padding:10vh;
//         }

//         .hero-section {
//           display: flex;
//           align-items: center;
//           gap: 3rem;
//           margin-bottom: 4rem;
//         }

//         .hero-content {
//           flex: 1;
//         }

//         .hero-image {
//           flex: 1;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         }

//         .hero-image img {
//           width: 100%;
//           height: auto;
//           object-fit: cover;
//         }

//         h1 {
//           font-size: 3rem;
//           color: #1e293b;
//           margin-bottom: 1rem;
//         }

//         .highlight {
//           color: #2563eb;
//         }

//         .subtitle {
//           font-size: 1.25rem;
//           color: #64748b;
//           margin-bottom: 1.5rem;
//         }

//         .description {
//           font-size: 1rem;
//           line-height: 1.6;
//           color: #475569;
//           margin-bottom: 2rem;
//         }

//         .cta-buttons {
//           display: flex;
//           gap: 1rem;
//         }

//         .primary-btn {
//           background-color: #2563eb;
//           color: white;
//           border: none;
//           padding: 0.75rem 1.5rem;
//           border-radius: 6px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .primary-btn:hover {
//           background-color: #1d4ed8;
//           transform: translateY(-2px);
//         }

//         .secondary-btn {
//           background-color: white;
//           color: #2563eb;
//           border: 1px solid #2563eb;
//           padding: 0.75rem 1.5rem;
//           border-radius: 6px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .secondary-btn:hover {
//           background-color: #f8fafc;
//           transform: translateY(-2px);
//         }

//         .features-section {
//           margin: 5rem 0;
//           text-align: center;
//         }

//         .features-section h2 {
//           font-size: 2rem;
//           color: #1e293b;
//           margin-bottom: 2rem;
//         }

//         .carousel-container {
//           max-width: 800px;
//           margin: 0 auto;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         }

//         .legend {
//           background: rgba(37, 99, 235, 0.8) !important;
//           font-size: 1rem !important;
//           padding: 15px !important;
//         }

//         .benefits-section {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 2rem;
//           margin: 5rem 0;
//         }

//         .benefit-card {
//           background: white;
//           padding: 2rem;
//           border-radius: 12px;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.05);
//           text-align: center;
//           transition: all 0.3s ease;
//         }

//         .benefit-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//         }

//         .benefit-card .icon {
//           font-size: 2.5rem;
//           margin-bottom: 1rem;
//         }

//         .benefit-card h3 {
//           color: #1e293b;
//           margin-bottom: 1rem;
//         }

//         .benefit-card p {
//           color: #64748b;
//           line-height: 1.6;
//         }

//         @media (max-width: 768px) {
//           .hero-section {
//             flex-direction: column;
//           }

//           h1 {
//             font-size: 2.2rem;
//           }
//         }
//       `}</style>

//       <About/>
//       <Services/>
//       <Contact/>
//     </div>
//   );
// };

// // export default Home;
// import React, { useEffect, useState } from 'react';
// import { FaLock, FaExchangeAlt, FaGlobe,FaChevronRight, FaChartLine, FaUserShield, FaCreditCard, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import About from './About';
// import Services from './Services';
// import Contact from './Conatct';

// const ChainPay = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchTransactions = async () => {
//       try {
//         // In a real app, this would be your API endpoint
//         // const response = await fetch('http://localhost:8000/api/transactions/');
//         // if (!response.ok) throw new Error('Failed to fetch transactions');
//         // const data = await response.json();

//         // Simulating API call with mock data
//         setTimeout(() => {
//           const data = [
//             {
//               _id: '1',
//               type: 'Transfer',
//               amount: '1.5 ETH',
//               status: 'Completed',
//               timestamp: '2023-10-15T14:30:00Z',
//               from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
//               to: '0x53d284357ec70cE289D6D64134DfAc8E511c8a3D'
//             },
//             {
//               _id: '2',
//               type: 'Exchange',
//               amount: '2.3 BTC',
//               status: 'Completed',
//               timestamp: '2023-10-14T09:15:00Z',
//               from: '0x53d284357ec70cE289D6D64134DfAc8E511c8a3D',
//               to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
//             },
//             {
//               _id: '3',
//               type: 'Payment',
//               amount: '$250.00',
//               status: 'Pending',
//               timestamp: '2023-10-15T10:45:00Z',
//               from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
//               to: 'Merchant Account'
//             }
//           ];
//           setTransactions(data);
//           setLoading(false);
//         }, 1000);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) return <div className="loading-spinner"></div>;
//   if (error) console.error('Error:', error);

//   return (
//     <>
//       <style jsx global>{`
//         :root {
//           --primary: #2563eb;
//           --primary-dark: #1d4ed8;
//           --secondary: #059669;
//           --dark: #1e293b;
//           --light: #f8fafc;
//           --gray: #64748b;
//           --light-gray: #e2e8f0;
//           --white: #ffffff;
//           --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
//           --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
//           --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
//           --radius-sm: 0.25rem;
//           --radius-md: 0.5rem;
//           --radius-lg: 1rem;
//           --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//           line-height: 1.5;
//           color: var(--dark);
//           background-color: var(--light);
//         }

//         h1, h2, h3, h4 {
//           font-weight: 600;
//           line-height: 1.25;
//         }

//         a {
//           text-decoration: none;
//           color: inherit;
//         }

//         .container {
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 1.5rem;
//         }

//         .section {
//           padding: 5rem 0;
//         }

//         .section-title {
//           font-size: 2rem;
//           margin-bottom: 2rem;
//           text-align: center;
//           position: relative;
//         }

//         .section-title:after {
//           content: '';
//           display: block;
//           width: 80px;
//           height: 4px;
//           background: linear-gradient(to right, var(--primary), var(--secondary));
//           margin: 1rem auto 0;
//           border-radius: 2px;
//         }

//         .btn {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0.75rem 1.5rem;
//           border-radius: var(--radius-sm);
//           font-weight: 500;
//           cursor: pointer;
//           transition: var(--transition);
//           border: none;
//         }

//         .btn-primary {
//           background-color: var(--primary);
//           color: var(--white);
//         }

//         .btn-primary:hover {
//           background-color: var(--primary-dark);
//           transform: translateY(-2px);
//           box-shadow: var(--shadow-md);
//         }

//         .btn-secondary {
//           background-color: var(--white);
//           color: var(--primary);
//           border: 1px solid var(--primary);
//         }

//         .btn-secondary:hover {
//           background-color: rgba(37, 99, 235, 0.05);
//           transform: translateY(-2px);
//           box-shadow: var(--shadow-md);
//         }

//         .loading-spinner {
//           display: inline-block;
//           width: 50px;
//           height: 50px;
//           border: 3px solid rgba(37, 99, 235, 0.3);
//           border-radius: 50%;
//           border-top-color: var(--primary);
//           animation: spin 1s ease-in-out infinite;
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//         }

//         @keyframes spin {
//           to { transform: translate(-50%, -50%) rotate(360deg); }
//         }

//         /* Hero Section */
//         .hero {
//           background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
//           color: var(--white);
//           padding: 6rem 0;
//           position: relative;
//           overflow: hidden;
//         }

//         .hero::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           right: 0;
//           bottom: 0;
//           width: 50%;
//           background: url('https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') no-repeat center/cover;
//           clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
//         }

//         .hero-content {
//           max-width: 50%;
//           position: relative;
//           z-index: 1;
//         }

//         .hero h1 {
//           font-size: 3rem;
//           margin-bottom: 1.5rem;
//           line-height: 1.2;
//         }

//         .hero p {
//           font-size: 1.25rem;
//           opacity: 0.9;
//           margin-bottom: 2rem;
//         }

//         .hero-buttons {
//           display: flex;
//           gap: 1rem;
//         }

//         /* Quick Links */
//         .quick-links {
//           background-color: var(--white);
//           padding: 4rem 0;
//         }

//         .quick-links-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 2rem;
//         }

//         .quick-link-card {
//           background: var(--white);
//           border-radius: var(--radius-md);
//           padding: 2rem;
//           box-shadow: var(--shadow-sm);
//           transition: var(--transition);
//           border: 1px solid var(--light-gray);
//           text-align: center;
//         }

//         .quick-link-card:hover {
//           transform: translateY(-5px);
//           box-shadow: var(--shadow-lg);
//           border-color: var(--primary);
//         }

//         .link-icon {
//           font-size: 2.5rem;
//           color: var(--primary);
//           margin-bottom: 1rem;
//         }

//         .quick-link-card h3 {
//           font-size: 1.25rem;
//           margin-bottom: 0.5rem;
//         }

//         .quick-link-card p {
//           color: var(--gray);
//           margin-bottom: 1rem;
//         }

//         .arrow-icon {
//           color: var(--primary);
//           transition: var(--transition);
//         }

//         .quick-link-card:hover .arrow-icon {
//           transform: translateX(3px);
//         }

//         /* Transactions */
//         .transactions {
//           background-color: var(--light);
//           padding: 5rem 0;
//         }

//         .transactions-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 2rem;
//         }

//         .transaction-card {
//           background: var(--white);
//           border-radius: var(--radius-md);
//           overflow: hidden;
//           box-shadow: var(--shadow-sm);
//           transition: var(--transition);
//           padding: 1.5rem;
//           position: relative;
//         }

//         .transaction-card:hover {
//           transform: translateY(-5px);
//           box-shadow: var(--shadow-lg);
//         }

//         .status-badge {
//           position: absolute;
//           top: 1rem;
//           right: 1rem;
//           background-color: var(--secondary);
//           color: var(--white);
//           padding: 0.25rem 0.75rem;
//           border-radius: var(--radius-sm);
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         .status-badge.pending {
//           background-color: #f59e0b;
//         }

//         .transaction-card h3 {
//           font-size: 1.25rem;
//           margin-bottom: 0.5rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .transaction-card p {
//           color: var(--gray);
//           margin-bottom: 0.5rem;
//           font-size: 0.9rem;
//         }

//         .transaction-date {
//           color: var(--gray);
//           font-size: 0.8rem;
//           margin-top: 1rem;
//         }

//         /* Features */
//         .features {
//           background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
//           color: var(--white);
//           padding: 4rem 0;
//         }

//         .features-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 2rem;
//         }

//         .feature-item {
//           text-align: center;
//           padding: 2rem;
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: var(--radius-md);
//           backdrop-filter: blur(10px);
//         }

//         .feature-icon {
//           font-size: 2.5rem;
//           margin-bottom: 1rem;
//           color: var(--white);
//         }

//         .feature-item h3 {
//           font-size: 1.5rem;
//           margin-bottom: 1rem;
//         }

//         .feature-item p {
//           opacity: 0.9;
//         }

//         /* Stats */
//         .stats {
//           background-color: var(--white);
//           padding: 4rem 0;
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 2rem;
//           text-align: center;
//         }

//         .stat-item h3 {
//           font-size: 3rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//           color: var(--primary);
//         }

//         .stat-item p {
//           color: var(--gray);
//           font-size: 1.125rem;
//         }

//         /* Security */
//         .security {
//           background-color: var(--light);
//           padding: 5rem 0;
//         }

//         .security-content {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 3rem;
//           align-items: center;
//         }

//         .security-image {
//           border-radius: var(--radius-lg);
//           overflow: hidden;
//           box-shadow: var(--shadow-lg);
//         }

//         .security-image img {
//           width: 100%;
//           height: auto;
//           display: block;
//         }

//         .security-features {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         .security-feature {
//           display: flex;
//           align-items: flex-start;
//           gap: 1rem;
//         }

//         .security-feature-icon {
//           font-size: 1.5rem;
//           color: var(--primary);
//           flex-shrink: 0;
//         }

//         /* CTA Section */
//         .cta {
//           background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
//           color: var(--white);
//           padding: 5rem 0;
//           text-align: center;
//         }

//         .cta-inner {
//           max-width: 600px;
//           margin: 0 auto;
//         }

//         .cta-icon {
//           font-size: 3rem;
//           color: var(--primary);
//           margin-bottom: 1.5rem;
//         }

//         .cta h2 {
//           font-size: 2rem;
//           margin-bottom: 1rem;
//         }

//         .cta p {
//           opacity: 0.9;
//           margin-bottom: 2rem;
//         }

//         /* Responsive */
//         @media (max-width: 1024px) {
//           .hero::before {
//             width: 40%;
//             opacity: 0.3;
//           }
//           .hero-content {
//             max-width: 60%;
//           }
//           .security-content {
//             grid-template-columns: 1fr;
//             gap: 2rem;
//           }
//         }

//         @media (max-width: 768px) {
//           .hero {
//             padding: 4rem 0;
//             text-align: center;
//           }
//           .hero::before {
//             display: none;
//           }
//           .hero-content {
//             max-width: 100%;
//           }
//           .hero-buttons {
//             justify-content: center;
//           }
//           .section {
//             padding: 3rem 0;
//           }
//         }

//         @media (max-width: 480px) {
//           .hero h1 {
//             font-size: 2.25rem;
//           }
//           .hero p {
//             font-size: 1rem;
//           }
//           .hero-buttons {
//             flex-direction: column;
//             gap: 0.75rem;
//           }
//           .btn {
//             width: 100%;
//           }
//         }
//       `}</style>

//       <div className="chainpay-home">
//         {/* Hero Section */}
//         <section className="hero">
//           <div className="container">
//             <div className="hero-content">
//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 ChainPay: Blockchain Banking Revolution
//               </motion.h1>
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 Experience the future of banking with our secure, transparent, and decentralized blockchain-powered financial platform.
//               </motion.p>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className="hero-buttons"
//               >
//                 <button className="btn btn-primary" onClick={() => navigate('/register')}>
//                   Create Account
//                 </button>
//                 <button className="btn btn-secondary" onClick={() => navigate('/demo')}>
//                   Watch Demo
//                 </button>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Quick Links */}
//         <section className="quick-links section">
//           <div className="container">
//             <h2 className="section-title">Key Features</h2>
//             <div className="quick-links-grid">
//               <motion.div
//                 className="quick-link-card"
//                 whileHover={{ y: -5 }}
//               >
//                 <FaLock className="link-icon" />
//                 <h3>Secure Transactions</h3>
//                 <p>Bank-level security with blockchain encryption</p>
//                 <FaChevronRight className="arrow-icon" />
//               </motion.div>

//               <motion.div
//                 className="quick-link-card"
//                 whileHover={{ y: -5 }}
//               >
//                 <FaExchangeAlt className="link-icon" />
//                 <h3>Instant Transfers</h3>
//                 <p>Send money globally in seconds, not days</p>
//                 <FaChevronRight className="arrow-icon" />
//               </motion.div>

//               <motion.div
//                 className="quick-link-card"
//                 whileHover={{ y: -5 }}
//               >
//                 <FaGlobe className="link-icon" />
//                 <h3>Global Access</h3>
//                 <p>Bank from anywhere in the world</p>
//                 <FaChevronRight className="arrow-icon" />
//               </motion.div>

//               <motion.div
//                 className="quick-link-card"
//                 whileHover={{ y: -5 }}
//               >
//                 <FaChartLine className="link-icon" />
//                 <h3>Smart Investments</h3>
//                 <p>AI-powered investment recommendations</p>
//                 <FaChevronRight className="arrow-icon" />
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Transactions */}
//         {/* <section className="transactions section">
//           <div className="container">
//             <h2 className="section-title">Recent Transactions</h2>
//             <div className="transactions-grid">
//               {transactions.map((transaction, index) => (
//                 <motion.div
//                   key={transaction._id}
//                   className="transaction-card"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className={`status-badge ${transaction.status.toLowerCase()}`}>
//                     {transaction.status}
//                   </div>
//                   <h3>
//                     {transaction.type === 'Transfer' && <FaExchangeAlt />}
//                     {transaction.type === 'Exchange' && <FaChartLine />}
//                     {transaction.type === 'Payment' && <FaCreditCard />}
//                     {transaction.type}
//                   </h3>
//                   <p><strong>Amount:</strong> {transaction.amount}</p>
//                   <p><strong>From:</strong> {transaction.from.substring(0, 8)}...{transaction.from.substring(transaction.from.length - 4)}</p>
//                   <p><strong>To:</strong> {transaction.to.substring(0, 8)}...{transaction.to.substring(transaction.to.length - 4)}</p>
//                   <div className="transaction-date">{formatDate(transaction.timestamp)}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section> */}

//         {/* Features */}
//         <section className="features section">
//           <div className="container">
//             <h2 className="section-title" style={{color: 'white'}}>Why Choose ChainPay?</h2>
//             <div className="features-grid">
//               <motion.div
//                 className="feature-item"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <FaUserShield className="feature-icon" />
//                 <h3>Enhanced Security</h3>
//                 <p>Blockchain technology ensures your transactions and data are protected with military-grade encryption.</p>
//               </motion.div>

//               <motion.div
//                 className="feature-item"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <FaMobileAlt className="feature-icon" />
//                 <h3>Mobile First</h3>
//                 <p>Bank on the go with our intuitive mobile app, available for iOS and Android devices.</p>
//               </motion.div>

//               <motion.div
//                 className="feature-item"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 viewport={{ once: true }}
//               >
//                 <FaShieldAlt className="feature-icon" />
//                 <h3>Fraud Protection</h3>
//                 <p>Advanced AI monitors your account 24/7 to detect and prevent fraudulent activities.</p>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="stats section">
//           <div className="container">
//             <div className="stats-grid">
//               <motion.div
//                 className="stat-item"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <h3>500K+</h3>
//                 <p>Active Users</p>
//               </motion.div>

//               <motion.div
//                 className="stat-item"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <h3>$2.5B+</h3>
//                 <p>Transactions Processed</p>
//               </motion.div>

//               <motion.div
//                 className="stat-item"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 viewport={{ once: true }}
//               >
//                 <h3>99.9%</h3>
//                 <p>Uptime Guarantee</p>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Security Section */}
//         <section className="security section">
//           <div className="container">
//             <h2 className="section-title">Advanced Security Features</h2>
//             <div className="security-content">
//               <div className="security-image">
//                 <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Blockchain Security" />
//               </div>
//               <div className="security-features">
//                 <div className="security-feature">
//                   <FaLock className="security-feature-icon" />
//                   <div>
//                     <h3>Multi-Signature Wallets</h3>
//                     <p>Require multiple approvals for transactions above specified limits.</p>
//                   </div>
//                 </div>
//                 <div className="security-feature">
//                   <FaShieldAlt className="security-feature-icon" />
//                   <div>
//                     <h3>Biometric Authentication</h3>
//                     <p>Secure your account with fingerprint and facial recognition technology.</p>
//                   </div>
//                 </div>
//                 <div className="security-feature">
//                   <FaUserShield className="security-feature-icon" />
//                   <div>
//                     <h3>Decentralized Identity</h3>
//                     <p>Take control of your personal data with self-sovereign identity solutions.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <About/>
//         <Services/>
//         <Contact/>

//         {/* CTA Section */}
//         <section className="cta section">
//           <div className="container">
//             <div className="cta-inner">
//               <FaShieldAlt className="cta-icon" />
//               <h2>Ready to Experience the Future of Banking?</h2>
//               <p>Join thousands of satisfied customers who have made the switch to ChainPay's secure blockchain banking platform.</p>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => navigate('/register')}
//               >
//                 Get Started Today
//               </button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default ChainPay;
import React, { useEffect, useState } from 'react';
import { FaLock, FaExchangeAlt, FaGlobe, FaChevronRight, FaChartLine, FaUserShield, FaCreditCard, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import About from './About';
import Services from './Services';
import Contact from './Conatct';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ChainPay = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    const fetchTransactions = async () => {
      try {
        // In a real app, this would be your API endpoint
        // const response = await fetch('http://localhost:8000/api/transactions/');
        // if (!response.ok) throw new Error('Failed to fetch transactions');
        // const data = await response.json();

        // Simulating API call with mock data
        setTimeout(() => {
          const data = [
            {
              _id: '1',
              type: 'Transfer',
              amount: '1.5 ETH',
              status: 'Completed',
              timestamp: '2023-10-15T14:30:00Z',
              from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
              to: '0x53d284357ec70cE289D6D64134DfAc8E511c8a3D'
            },
            {
              _id: '2',
              type: 'Exchange',
              amount: '2.3 BTC',
              status: 'Completed',
              timestamp: '2023-10-14T09:15:00Z',
              from: '0x53d284357ec70cE289D6D64134DfAc8E511c8a3D',
              to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
            },
            {
              _id: '3',
              type: 'Payment',
              amount: '$250.00',
              status: 'Pending',
              timestamp: '2023-10-15T10:45:00Z',
              from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
              to: 'Merchant Account'
            }
          ];
          setTransactions(data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) console.error('Error:', error);

  return (
    <>
      <style jsx global>{`
        :root {
          --primary: #2563eb;
          --primary-dark: #1d4ed8;
          --secondary: #059669;
          --dark: #1e293b;
          --light: #f8fafc;
          --gray: #64748b;
          --light-gray: #e2e8f0;
          --white: #ffffff;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
          --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
          --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
          --radius-sm: 0.25rem;
          --radius-md: 0.5rem;
          --radius-lg: 1rem;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.5;
          color: var(--dark);
          background-color: var(--light);
        }

        h1, h2, h3, h4 {
          font-weight: 600;
          line-height: 1.25;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .section {
          padding: 5rem 0;
        }

        .section-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          position: relative;
        }

        .section-title:after {
          content: '';
          display: block;
          width: 80px;
          height: 4px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          margin: 1rem auto 0;
          border-radius: 2px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          border: none;
        }

        .btn-primary {
          background-color: var(--primary);
          color: var(--white);
        }

        .btn-primary:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .btn-secondary {
          background-color: var(--white);
          color: var(--primary);
          border: 1px solid var(--primary);
        }

        .btn-secondary:hover {
          background-color: rgba(37, 99, 235, 0.05);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .loading-spinner {
          display: inline-block;
          width: 50px;
          height: 50px;
          border: 3px solid rgba(37, 99, 235, 0.3);
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 1s ease-in-out infinite;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: var(--white);
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 50%;
          background: url('https://mir-s3-cdn-cf.behance.net/project_modules/hd/143cdc64702723.5ae00a2ba8cd0.gif') no-repeat center/cover;
          clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
        }

        .hero-content {
          max-width: 50%;
          position: relative;
          z-index: 1;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero p {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
        }

        /* Quick Links */
        .quick-links {
          background-color: var(--white);
          padding: 4rem 0;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .quick-link-card {
          background: var(--white);
          border-radius: var(--radius-md);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          border: 1px solid var(--light-gray);
          text-align: center;
        }

        .quick-link-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .link-icon {
          font-size: 2.5rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .quick-link-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .quick-link-card p {
          color: var(--gray);
          margin-bottom: 1rem;
        }

        .arrow-icon {
          color: var(--primary);
          transition: var(--transition);
        }

        .quick-link-card:hover .arrow-icon {
          transform: translateX(3px);
        }

        /* Transactions */
        .transactions {
          background-color: var(--light);
          padding: 5rem 0;
        }

        .transactions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .transaction-card {
          background: var(--white);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          padding: 1.5rem;
          position: relative;
        }

        .transaction-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .status-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background-color: var(--secondary);
          color: var(--white);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-badge.pending {
          background-color: #f59e0b;
        }

        .transaction-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .transaction-card p {
          color: var(--gray);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .transaction-date {
          color: var(--gray);
          font-size: 0.8rem;
          margin-top: 1rem;
        }

        /* Features */
        .features {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: var(--white);
          padding: 4rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-item {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          backdrop-filter: blur(10px);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--white);
        }

        .feature-item h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .feature-item p {
          opacity: 0.9;
        }

        /* Stats */
        .stats {
          background-color: var(--white);
          padding: 4rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-item h3 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }

        .stat-item p {
          color: var(--gray);
          font-size: 1.125rem;
        }

        /* Security */
        .security {
          background-color: var(--light);
          padding: 5rem 0;
        }

        .security-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .security-image {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .security-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .security-features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .security-feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .security-feature-icon {
          font-size: 1.5rem;
          color: var(--primary);
          flex-shrink: 0;
        }

        /* CTA Section */
        .cta {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: var(--white);
          padding: 5rem 0;
          text-align: center;
        }

        .cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-icon {
          font-size: 3rem;
          color: var(--primary);
          margin-bottom: 1.5rem;
        }

        .cta h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .cta p {
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero::before {
            width: 40%;
            opacity: 0.3;
          }
          .hero-content {
            max-width: 60%;
          }
          .security-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 4rem 0;
            text-align: center;
          }
          .hero::before {
            display: none;
          }
          .hero-content {
            max-width: 100%;
          }
          .hero-buttons {
            justify-content: center;
          }
          .section {
            padding: 3rem 0;
          }
        }

        @media (max-width: 480px) {
          .hero h1 {
            font-size: 2.25rem;
          }
          .hero p {
            font-size: 1rem;
          }
          .hero-buttons {
            flex-direction: column;
            gap: 0.75rem;
          }
          .btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="chainpay-home">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                data-aos="fade-up"
              >
                ChainPay: Blockchain Banking Revolution
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Experience the future of banking with our secure, transparent, and decentralized blockchain-powered financial platform.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-buttons "
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <button className="btn btn-primary" onClick={() => navigate('/register')} style={{ marginLeft: "16vh" }}>
                  Create Account
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/demo')}>
                  Watch Demo
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="quick-links section">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">Key Features</h2>
            <div className="quick-links-grid">
              <motion.div
                className="quick-link-card"
                whileHover={{ y: -5 }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <FaLock className="link-icon" />
                <h3>Secure Transactions</h3>
                <p>Bank-level security with blockchain encryption</p>
                <FaChevronRight className="arrow-icon" />
              </motion.div>

              <motion.div
                className="quick-link-card"
                whileHover={{ y: -5 }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <FaExchangeAlt className="link-icon" />
                <h3>Instant Transfers</h3>
                <p>Send money globally in seconds, not days</p>
                <FaChevronRight className="arrow-icon" />
              </motion.div>

              <motion.div
                className="quick-link-card"
                whileHover={{ y: -5 }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <FaGlobe className="link-icon" />
                <h3>Global Access</h3>
                <p>Bank from anywhere in the world</p>
                <FaChevronRight className="arrow-icon" />
              </motion.div>

              <motion.div
                className="quick-link-card"
                whileHover={{ y: -5 }}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <FaChartLine className="link-icon" />
                <h3>Smart Investments</h3>
                <p>AI-powered investment recommendations</p>
                <FaChevronRight className="arrow-icon" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Transactions */}
        {/* <section className="transactions section">
          <div className="container">
            <h2 className="section-title">Recent Transactions</h2>
            <div className="transactions-grid">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction._id}
                  className="transaction-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`status-badge ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </div>
                  <h3>
                    {transaction.type === 'Transfer' && <FaExchangeAlt />}
                    {transaction.type === 'Exchange' && <FaChartLine />}
                    {transaction.type === 'Payment' && <FaCreditCard />}
                    {transaction.type}
                  </h3>
                  <p><strong>Amount:</strong> {transaction.amount}</p>
                  <p><strong>From:</strong> {transaction.from.substring(0, 8)}...{transaction.from.substring(transaction.from.length - 4)}</p>
                  <p><strong>To:</strong> {transaction.to.substring(0, 8)}...{transaction.to.substring(transaction.to.length - 4)}</p>
                  <div className="transaction-date">{formatDate(transaction.timestamp)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Features */}
        <section className="features section">
          <div className="container">
            <h2 className="section-title" style={{ color: 'white' }} data-aos="fade-up">Why Choose ChainPay?</h2>
            <div className="features-grid">
              <motion.div
                className="feature-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <FaUserShield className="feature-icon" />
                <h3>Enhanced Security</h3>
                <p>Blockchain technology ensures your transactions and data are protected with military-grade encryption.</p>
              </motion.div>

              <motion.div
                className="feature-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <FaMobileAlt className="feature-icon" />
                <h3>OTP based verification</h3>

                <p>For your protection, an OTP has been sent to your registered email. Verify it to confirm the you transaction.</p>              </motion.div>

              <motion.div
                className="feature-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <FaShieldAlt className="feature-icon" />
                <h3>Fraud Protection</h3>
                <p>Advanced AI monitors your account 24/7 to detect and prevent fraudulent activities.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats section">
          <div className="container">
            <div className="stats-grid">
              <motion.div
                className="stat-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h3>500K+</h3>
                <p>Active Users</p>
              </motion.div>

              <motion.div
                className="stat-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3>₹2.5B+</h3>
                <p>Transactions Processed</p>
              </motion.div>

              <motion.div
                className="stat-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3>99.9%</h3>
                <p>Uptime Guarantee</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="security section">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">Advanced Security Features</h2>
            <div className="security-content">
              <div className="security-image" data-aos="fade-right" data-aos-delay="100">
                <img src="https://substackcdn.com/image/fetch/$s_!WUHm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F861c99d3-3d4d-4d91-8a46-f32bcfc16d4a_629x329.gif" alt="Blockchain Security" />
              </div>
              <div className="security-features" data-aos="fade-left" data-aos-delay="200">
                <div className="security-feature" data-aos="fade-up" data-aos-delay="100">
                  <FaLock className="security-feature-icon" />
                  <div>
                    <h3>Multi-Signature Wallets</h3>
                    <p>Require multiple approvals for transactions above specified limits.</p>
                  </div>
                </div>
                <div className="security-feature" data-aos="fade-up" data-aos-delay="200">
                  <FaShieldAlt className="security-feature-icon" />
                  <div>
                    <h3>Biometric Authentication</h3>
                    <p>Secure your account with fingerprint and facial recognition technology.</p>
                  </div>
                </div>
                <div className="security-feature" data-aos="fade-up" data-aos-delay="300">
                  <FaUserShield className="security-feature-icon" />
                  <div>
                    <h3>Decentralized Identity</h3>
                    <p>Take control of your personal data with self-sovereign identity solutions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <About />
        <Services />
        <Contact />

        {/* CTA Section */}
        <section className="cta section">
          <div className="container">
            <div className="cta-inner">
              <FaShieldAlt className="cta-icon" data-aos="zoom-in" />
              <h2 data-aos="fade-up">Ready to Experience the Future of Banking?</h2>
              <p data-aos="fade-up" data-aos-delay="100">Join thousands of satisfied customers who have made the switch to ChainPay's secure blockchain banking platform.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/register')}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChainPay;