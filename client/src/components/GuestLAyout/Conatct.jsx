import React, { useEffect } from 'react';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const handleWhatsAppClick = () => {
    const message = "Hello, I'm interested in your blockchain banking solutions.";
    const whatsappUrl = `https://wa.me/9110413455?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="contact-section">
      <style jsx>{`
        .contact-section {
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
        
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .contact-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .contact-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .contact-details h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }
        
        .contact-details p {
          color: #64748b;
          margin-bottom: 0.5rem;
        }
        
        .contact-action {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #2563eb;
          font-weight: 500;
          margin-top: 0.5rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .contact-action:hover {
          color: #1e40af;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .social-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #e5e7eb;
          color: #374151;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          background: #2563eb;
          color: white;
          transform: translateY(-3px);
        }
        
        .location-info {
          background: white;
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          height: fit-content;
        }
        
        .location-info h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .address {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .map-container {
          margin-top: 2rem;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          height: 300px;
        }
        
        .map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        @media (max-width: 968px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        
        @media (max-width: 640px) {
          .section-title {
            font-size: 2rem;
          }
          
          .location-info {
            padding: 1.5rem;
          }
          
          .contact-card {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card" data-aos="fade-right" data-aos-delay="100">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+91 8549076433</p>
                <span 
                  className="contact-action"
                  onClick={() => window.open('tel:+918549076433')}
                >
                  Call Now
                </span>
              </div>
            </div>
            
            <div className="contact-card" data-aos="fade-right" data-aos-delay="200">
              <div className="contact-icon">
                <FaWhatsapp />
              </div>
              <div className="contact-details">
                <h3>WhatsApp</h3>
                <p>Message us directly</p>
                <span 
                  className="contact-action"
                  onClick={handleWhatsAppClick}
                >
                  Send Message
                </span>
              </div>
            </div>
            
            <div className="contact-card" data-aos="fade-right" data-aos-delay="300">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>info@chainpay.com</p>
                <span 
                  className="contact-action"
                  onClick={() => window.open('mailto:patilprasad3808@gmail.com')}
                >
                  Send Email
                </span>
              </div>
            </div>
            
            {/* <div className="contact-card" data-aos="fade-right" data-aos-delay="400">
              <div className="contact-icon">
                <FaClock />
              </div>
              <div className="contact-details">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9AM - 6PM</p>
                <p>Saturday: 10AM - 4PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div> */}
          </div>
          
          <div className="location-info" data-aos="fade-left" data-aos-delay="200">
            <h3><FaMapMarkerAlt /> Our Location</h3>
            <div className="address">
              <p><strong>ChainPay Headquarters</strong></p>
              <p>123 Blockchain Avenue</p>
              <p>Tech District, Bengaluru</p>
              <p>Karnataka 560001, India</p>
            </div>
            
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.2740695879415!2d74.49148039999999!3d16.257718000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0931673d7c8dd%3A0xc144c2d0dfb000bc!2sLIGAND%20SOFTWARE%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1756650489318!5m2!1sen!2sin" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="ChainPay Office Location"
              ></iframe>
            </div>
            
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;