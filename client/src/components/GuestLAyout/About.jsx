import React, { useEffect } from 'react';
import { FaHeart, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section id="about" className="about-section">
      <style jsx>{`
        .about-section {
          padding: 5rem 0;
          background-color: #f8fafc;
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
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          margin: 1rem auto 0;
          border-radius: 2px;
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 5rem;
          align-items: center;
        }
        
        .about-image {
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .about-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .about-image:hover img {
          transform: scale(1.05);
        }
        
        .about-text h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #1e293b;
        }
        
        .about-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #64748b;
          margin-bottom: 1.5rem;
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 4rem 0;
        }
        
        .value-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .value-icon {
          font-size: 2.5rem;
          color: #2563eb;
          margin-bottom: 1rem;
        }
        
        .value-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #1e293b;
        }
        
        .value-card p {
          color: #64748b;
          line-height: 1.6;
        }
        
        .team-section {
          margin: 5rem 0;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .team-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
        }
        
        .team-card:hover {
          transform: translateY(-5px);
        }
        
        .team-image {
          height: 300px;
          overflow: hidden;
        }
        
        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .team-card:hover .team-image img {
          transform: scale(1.1);
        }
        
        .team-info {
          padding: 1.5rem;
          text-align: center;
        }
        
        .team-info h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }
        
        .team-info p.role {
          color: #2563eb;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        
        .team-info p.bio {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .timeline {
          position: relative;
          max-width: 1000px;
          margin: 4rem auto;
        }
        
        .timeline:before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: #2563eb;
        }
        
        .milestone {
          display: flex;
          justify-content: flex-end;
          padding-right: 30px;
          position: relative;
          margin-bottom: 4rem;
          width: 50%;
        }
        
        .milestone:nth-child(even) {
          align-self: flex-end;
          justify-content: flex-start;
          padding-left: 30px;
          padding-right: 0;
          left: 50%;
        }
        
        .milestone-content {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 400px;
        }
        
        .milestone-year {
          font-weight: bold;
          color: #2563eb;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        
        .milestone-event {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }
        
        .milestone-description {
          color: #64748b;
          line-height: 1.5;
        }
        
        .milestone:after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          right: -10px;
          background-color: #2563eb;
          border: 4px solid white;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          z-index: 1;
        }
        
        .milestone:nth-child(even):after {
          left: -10px;
          right: auto;
        }
        
        .cta-container {
          text-align: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          border-radius: 1rem;
          margin: 5rem 0;
        }
        
        .cta-container h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }
        
        .cta-container p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto 2rem;
          opacity: 0.9;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          font-size: 1rem;
        }
        
        .btn-primary {
          background-color: white;
          color: #2563eb;
        }
        
        .btn-primary:hover {
          background-color: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 968px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .timeline:before {
            left: 30px;
          }
          
          .milestone {
            width: 100%;
            padding-right: 0;
            padding-left: 70px;
          }
          
          .milestone:nth-child(even) {
            left: 0;
            padding-left: 70px;
          }
          
          .milestone:after {
            left: 20px;
            right: auto;
          }
          
          .milestone:nth-child(even):after {
            left: 20px;
          }
        }
        
        @media (max-width: 640px) {
          .section-title {
            font-size: 2rem;
          }
          
          .values-grid {
            grid-template-columns: 1fr;
          }
          
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        <h2 className="section-title" data-aos="fade-up">About ChainPay</h2>
        
        <div className="about-content">
          <div className="about-image" data-aos="fade-right">
            <img 
              src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="ChainPay Blockchain Technology" 
            />
          </div>
          <div className="about-text" data-aos="fade-left" data-aos-delay="200">
            <h2>Revolutionizing Banking with Blockchain</h2>
            <p>
              ChainPay was founded in 2018 with a simple mission: to make banking more secure, transparent, 
              and accessible through blockchain technology. We believe that everyone deserves access to 
              financial services that are not only efficient but also trustworthy.
            </p>
            <p>
              Our platform leverages the power of distributed ledger technology to provide instant 
              transactions, reduced fees, and enhanced security compared to traditional banking systems. 
              With ChainPay, you're not just another customer - you're part of a financial revolution.
            </p>
            <p>
              Today, we serve over 1 million customers across 25 countries, processing billions of dollars 
              in transactions annually. Our team of experts from the fintech and blockchain industries 
              is dedicated to continuously improving our platform to meet the evolving needs of our users.
            </p>
          </div>
        </div>
        
        <div className="values-grid">
          <div className="value-card" data-aos="fade-up" data-aos-delay="0">
            <FaHeart className="value-icon" />
            <h3>Customer First</h3>
            <p>We prioritize our users' needs and constantly innovate to provide the best banking experience.</p>
          </div>
          
          <div className="value-card" data-aos="fade-up" data-aos-delay="100">
            <FaLightbulb className="value-icon" />
            <h3>Innovation</h3>
            <p>We embrace cutting-edge technology to stay ahead of the curve in the financial industry.</p>
          </div>
          
          <div className="value-card" data-aos="fade-up" data-aos-delay="200">
            <FaHandshake className="value-icon" />
            <h3>Transparency</h3>
            <p>We believe in open communication and clear processes that build trust with our users.</p>
          </div>
        </div>
        
        {/* <div className="team-section">
          <h2 className="section-title" data-aos="fade-up">Our Leadership Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="team-card" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div data-aos="fade-up">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="milestone" 
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={index * 100}
              >
                <div className="milestone-content">
                  <div className="milestone-year">{milestone.year}</div>
                  <h3 className="milestone-event">{milestone.event}</h3>
                  <p className="milestone-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
         */}
        <div className="cta-container" data-aos="zoom-in">
          <h2>Join the Financial Revolution</h2>
          <p>Experience the future of banking with ChainPay's secure, transparent, and efficient platform.</p>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;