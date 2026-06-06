// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaUser, FaEnvelope, FaPhone, FaLock, FaUniversity, FaCreditCard, FaIdCard, FaQrcode, FaCamera, FaCheckCircle } from "react-icons/fa";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         contact: "",
//         password: "",
//         bankName: "",
//         bankNumber: "",
//         ifscCode: "",
//         upiId: "",
//     });
//     const [profilePic, setProfilePic] = useState(null);
//     const [message, setMessage] = useState("");
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [preview, setPreview] = useState("");

//     useEffect(() => {
//         AOS.init({
//             duration: 800,
//             once: false,
//             easing: 'ease-in-out'
//         });
//     }, []);

//     useEffect(() => {
//         if (!profilePic) {
//             setPreview("");
//             return;
//         }

//         const objectUrl = URL.createObjectURL(profilePic);
//         setPreview(objectUrl);

//         return () => URL.revokeObjectURL(objectUrl);
//     }, [profilePic]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setProfilePic(e.target.files[0]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         for (let key in formData) {
//             data.append(key, formData[key]);
//         }
//         if (profilePic) {
//             data.append("profilePic", profilePic);
//         }

//         try {
//             const res = await axios.post("http://localhost:8000/api/users/register", data, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             });
//             setMessage(res.data.message);
//             setIsSuccess(true);
//             setFormData({
//                 name: "",
//                 email: "",
//                 contact: "",
//                 password: "",
//                 bankName: "",
//                 bankNumber: "",
//                 ifscCode: "",
//                 upiId: "",
//             });
//             setProfilePic(null);
//         } catch (err) {
//             setMessage(err.response?.data?.error || "Registration failed");
//             setIsSuccess(false);
//         }
//     };

//     // Styles
//     const inputStyle = {
//         width: "100%",
//         padding: "12px 20px 12px 50px",
//         margin: "8px 0",
//         display: "inline-block",
//         border: "1px solid #e0e0e0",
//         borderRadius: "8px",
//         boxSizing: "border-box",
//         fontFamily: "'Poppins', sans-serif",
//         fontSize: "16px",
//         transition: "all 0.3s ease",
//         ":focus": {
//             borderColor: "#6a11cb",
//             boxShadow: "0 0 0 3px rgba(106, 17, 203, 0.1)",
//             outline: "none",
//         },
//     };

//     const labelStyle = {
//         display: "block",
//         margin: "10px 0 5px",
//         fontWeight: "500",
//         color: "#555",
//         fontFamily: "'Poppins', sans-serif",
//     };

//     const buttonStyle = {
//         backgroundColor: "#6a11cb",
//         color: "white",
//         padding: "14px 20px",
//         margin: "20px 0",
//         border: "none",
//         borderRadius: "8px",
//         cursor: "pointer",
//         width: "100%",
//         fontSize: "16px",
//         fontWeight: "600",
//         transition: "all 0.3s ease",
//         ":hover": {
//             backgroundColor: "#2575fc",
//             transform: "translateY(-2px)",
//         },
//     };

//     const containerStyle = {
//         maxWidth: "600px",
//         margin: "40px auto",
//         padding: "40px",
//         borderRadius: "12px",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//         backgroundColor: "white",
//         fontFamily: "'Poppins', sans-serif",
//     };

//     const titleStyle = {
//         textAlign: "center",
//         color: "#2a2d3e",
//         marginBottom: "30px",
//         fontFamily: "'Montserrat', sans-serif",
//         background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent",
//         fontSize: "2.2rem",
//     };

//     const messageStyle = {
//         padding: "12px",
//         borderRadius: "8px",
//         margin: "20px 0",
//         textAlign: "center",
//         backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
//         color: isSuccess ? "#155724" : "#721c24",
//         border: `1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"}`,
//     };

//     const iconStyle = {
//         position: "absolute",
//         left: "15px",
//         top: "15px",
//         color: "#6a11cb",
//         fontSize: "20px",
//     };

//     const profilePicContainer = {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         margin: "20px 0",
//     };

//     const profilePicPreview = {
//         width: "100px",
//         height: "100px",
//         borderRadius: "50%",
//         objectFit: "cover",
//         border: "3px solid #6a11cb",
//         marginBottom: "10px",
//     };

//     const fileInputStyle = {
//         display: "none",
//     };

//     const fileInputLabelStyle = {
//         backgroundColor: "#f0f0f0",
//         padding: "10px 15px",
//         borderRadius: "6px",
//         cursor: "pointer",
//         display: "inline-flex",
//         alignItems: "center",
//         transition: "all 0.3s ease",
//         ":hover": {
//             backgroundColor: "#e0e0e0",
//         },
//     };

//     const inputContainerStyle = {
//         position: "relative",
//         marginBottom: "20px",
//     };

//     return (
//         <div style={containerStyle} data-aos="fade-up">
//             <h2 style={titleStyle}>Create Your Account</h2>

//             {message && (
//                 <div style={messageStyle} data-aos="fade-down">
//                     {isSuccess ? <FaCheckCircle style={{ marginRight: "10px" }} /> : null}
//                     {message}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 {/* Personal Information */}
//                 <h3 style={{ color: "#6a11cb", margin: "20px 0 10px" }} data-aos="fade-right">Personal Information</h3>

//                 <div style={inputContainerStyle} data-aos="fade-up" data-aos-delay="100">
//                     <FaUser style={iconStyle} />
//                     <input 
//                         type="text" 
//                         name="name" 
//                         placeholder="Enter your full name" 
//                         value={formData.name} 
//                         onChange={handleChange} 
//                         required 
//                         style={inputStyle}
//                     />
//                 </div>

//                 <div style={inputContainerStyle} data-aos="fade-up" data-aos-delay="150">
//                     <FaEnvelope style={iconStyle} />
//                     <input 
//                         type="email" 
//                         name="email" 
//                         placeholder="Enter your email" 
//                         value={formData.email} 
//                         onChange={handleChange} 
//                         required 
//                         style={inputStyle}
//                     />
//                 </div>

//                 <div style={inputContainerStyle} data-aos="fade-up" data-aos-delay="200">
//                     <FaPhone style={iconStyle} />
//                     <input 
//                         type="text" 
//                         name="contact" 
//                         placeholder="Enter your phone number" 
//                         value={formData.contact} 
//                         onChange={handleChange} 
//                         required 
//                         style={inputStyle}
//                     />
//                 </div>

//                 <div style={inputContainerStyle} data-aos="fade-up" data-aos-delay="250">
//                     <FaLock style={iconStyle} />
//                     <input 
//                         type="password" 
//                         name="password" 
//                         placeholder="Create a password" 
//                         value={formData.password} 
//                         onChange={handleChange} 
//                         required 
//                         style={inputStyle}
//                     />
//                 </div>

//                 {/* Profile Picture */}
//                 <div style={profilePicContainer} data-aos="fade-up" data-aos-delay="300">
//                     {preview ? (
//                         <img src={preview} alt="Profile preview" style={profilePicPreview} />
//                     ) : (
//                         <div style={{ ...profilePicPreview, backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                             <FaCamera style={{ color: "#999", fontSize: "30px" }} />
//                         </div>
//                     )}
//                     <label style={fileInputLabelStyle}>
//                         <FaCamera style={{ marginRight: "8px" }} />
//                         {profilePic ? "Change Profile Picture" : "Upload Profile Picture"}
//                         <input 
//                             type="file" 
//                             name="profilePic" 
//                             accept="image/*" 
//                             onChange={handleFileChange} 
//                             style={fileInputStyle}
//                         />
//                     </label>
//                 </div>

//                 {/* Banking Information */}
//                 <h3 style={{ color: "#6a11cb", margin: "20px 0 10px" }} data-aos="fade-right" data-aos-delay="350">Banking Information</h3>

//                 <div style={inputContainerStyle} data-aos="fade-up" data-aos-delay="400">
//                     <FaUniversity style={iconStyle} />
//                     <input 
//                         type="text" 
//                         name="bankName" 
//                         placeholder="Enter your bank name" 
//                         value={formData.bankName} 
//                         onChange={handleChange} 
//                         required 
//                         style={inputStyle}
//                     />
//                 </div>

//                 <div style={inputContainerStyle} data-aos="fade-up" data-aos-delay="450">
//                     <FaCreditCard style={iconStyle} />
//                     <input 
//                         type="text" 
//                         name="bankNumber" 
//                         placeholder="Enter your account number" 
//                         value={formData.bankNumber} 
//                         onChange={handleChange} 
//                         required 
//                         style={inputStyle}
//                     />
//                 </div>

//                 <div style={inputContainerStyle} data-aos="fade-up" data-aos-delay="500">
//                     <FaIdCard style={iconStyle} />
//                     <input 
//                         type="text" 
//                         name="ifscCode" 
//                         placeholder="Enter IFSC code" 
//                         value={formData.ifscCode} 
//                         onChange={handleChange} 
//                         required 
//                         style={inputStyle}
//                     />
//                 </div>

//                 <div style={inputContainerStyle} data-aos="fade-up" data-aos-delay="550">
//                     <FaQrcode style={iconStyle} />
//                     <input 
//                         type="text" 
//                         name="upiId" 
//                         placeholder="Enter your UPI ID" 
//                         value={formData.upiId} 
//                         onChange={handleChange} 
//                         required 
//                         style={inputStyle}
//                     />
//                 </div>

//                 <button 
//                     type="submit" 
//                     style={buttonStyle}
//                     data-aos="fade-up" 
//                     data-aos-delay="600"
//                 >
//                     Register Now
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Register;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUniversity, FaCreditCard, FaIdCard, FaQrcode, FaCamera, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";


const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        bankName: "",
        bankNumber: "",
        ifscCode: "",
        upiId: "",
    });
    const [profilePic, setProfilePic] = useState(null);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (!profilePic) {
            setPreview("");
            return;
        }

        const objectUrl = URL.createObjectURL(profilePic);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [profilePic]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        if (profilePic) {
            data.append("profilePic", profilePic);
        }

        try {
            const res = await axios.post("http://localhost:8000/api/users/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage(res.data.message);
            setIsSuccess(true);
            setFormData({
                name: "",
                email: "",
                contact: "",
                password: "",
                bankName: "",
                bankNumber: "",
                ifscCode: "",
                upiId: "",
            });
            setProfilePic(null);
        } catch (err) {
            setMessage(err.response?.data?.error || "Registration failed");
            setIsSuccess(false);
        }
    };

    // Blockchain quotes
    const blockchainQuotes = [
        "Blockchain is the future of secure financial transactions",
        "Decentralization: Banking without borders",
        "Trust is built with transparency and blockchain delivers both",
        "The next evolution of banking is happening on the blockchain"
    ];
    const [currentQuote, setCurrentQuote] = useState(blockchainQuotes[0]);

    useEffect(() => {
        // Rotate quotes every 5 seconds
        const quoteInterval = setInterval(() => {
            setCurrentQuote(prevQuote => {
                const currentIndex = blockchainQuotes.indexOf(prevQuote);
                return blockchainQuotes[(currentIndex + 1) % blockchainQuotes.length];
            });
        }, 5000);

        return () => clearInterval(quoteInterval);
    }, [blockchainQuotes]);

    return (
        <div data-aos="fade-up"

            style={{

                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('https://images.unsplash.com/photo-1640837423607-5a0d674ac823?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "20px",
                fontFamily: "'Poppins', sans-serif"
            }}>
            <div style={{
                display: "flex",
                width: "90%",
                maxWidth: "1100px",
                height: "auto",
                minHeight: "600px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>

                {/* Left side - Quote Section */}
                <div style={{
                    flex: 1,
                    background: "rgba(15, 25, 45, 0.7)",
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "white",
                    position: "relative",
                    overflow: "hidden"
                }}>
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(33, 150, 243, 0.4) 0%, rgba(13, 71, 161, 0.6) 100%)",
                        zIndex: 0
                    }}></div>

                    <div style={{ position: "relative", zIndex: 1 }}>
                        <h2 style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            marginBottom: "30px",
                            background: "linear-gradient(90deg, #64b5f6 0%, #bb86fc 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>Blockchain Banking</h2>

                        <div style={{
                            fontSize: "20px",
                            lineHeight: "1.6",
                            marginBottom: "20px",
                            fontStyle: "italic",
                            minHeight: "100px"
                        }}>
                            "{currentQuote}"
                        </div>

                        <div style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <div style={{
                                width: "60px",
                                height: "4px",
                                background: "linear-gradient(90deg, #64b5f6 0%, #bb86fc 100%)",
                                marginBottom: "20px",
                                borderRadius: "2px"
                            }}></div>
                        </div>

                        <p style={{ fontSize: "14px", opacity: 0.8 }}>
                            Secure • Transparent • Decentralized
                        </p>

                        <Link to="/login" style={{
                            display: "inline-flex",
                            alignItems: "center",
                            color: "#64b5f6",
                            textDecoration: "none",
                            marginTop: "30px",
                            fontWeight: "500",
                            transition: "all 0.3s ease"
                        }}
                            onMouseOver={(e) => {
                                e.target.style.color = "#bb86fc";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = "#64b5f6";
                            }}
                        >
                            <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Login
                        </Link>
                    </div>
                </div>

                {/* Right side - Registration Form */}
                <div style={{
                    flex: 1.5,
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(10px)",
                    padding: "40px",
                    overflowY: "auto",
                    maxHeight: "600px"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                        <h2 style={{
                            color: "#0f192e",
                            fontSize: "28px",
                            fontWeight: "700",
                            marginBottom: "10px",
                            background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>Create Your Account</h2>
                        <p style={{ color: "#666", fontSize: "14px" }}>
                            Join our blockchain banking platform
                        </p>
                    </div>

                    {message && (
                        <div style={{
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            textAlign: "center",
                            backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
                            color: isSuccess ? "#155724" : "#721c24",
                            border: `1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"}`
                        }}>
                            {isSuccess ? <FaCheckCircle style={{ marginRight: "10px" }} /> : null}
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Personal Information */}
                        <h3 style={{
                            color: "#6a11cb",
                            margin: "20px 0 10px",
                            paddingBottom: "8px",
                            borderBottom: "2px solid #f0f0f0",
                            fontSize: "18px"
                        }}>Personal Information</h3>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>Full Name</label>
                            <div style={{ position: "relative" }}>
                                <FaUser style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px",
                                    zIndex: 1
                                }} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px 12px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)",
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>Email Address</label>
                            <div style={{ position: "relative" }}>
                                <FaEnvelope style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px",
                                    zIndex: 1
                                }} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px 12px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)",
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>Phone Number</label>
                            <div style={{ position: "relative" }}>
                                <FaPhone style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px",
                                    zIndex: 1
                                }} />
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="Enter your phone number"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px 12px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)",
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>Password</label>
                            <div style={{ position: "relative" }}>
                                <FaLock style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px",
                                    zIndex: 1
                                }} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px 12px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)",
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Profile Picture */}
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>Profile Picture</label>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "15px",
                                borderRadius: "10px",
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                backdropFilter: "blur(5px)"
                            }}>
                                {preview ? (
                                    <img src={preview} alt="Profile preview" style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "3px solid #6a11cb",
                                        marginBottom: "10px"
                                    }} />
                                ) : (
                                    <div style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        backgroundColor: "#f0f0f0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "10px",
                                        border: "2px dashed #ccc"
                                    }}>
                                        <FaCamera style={{ color: "#999", fontSize: "30px" }} />
                                    </div>
                                )}
                                <label style={{
                                    backgroundColor: "#f0f0f0",
                                    padding: "10px 15px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    transition: "all 0.3s ease",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "14px"
                                }}
                                    onMouseOver={(e) => {
                                        e.target.style.backgroundColor = "#e0e0e0";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.backgroundColor = "#f0f0f0";
                                    }}
                                >
                                    <FaCamera style={{ marginRight: "8px", color: "#6a11cb" }} />
                                    {profilePic ? "Change Profile Picture" : "Upload Profile Picture"}
                                    <input
                                        type="file"
                                        name="profilePic"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Banking Information */}
                        <h3 style={{
                            color: "#6a11cb",
                            margin: "20px 0 10px",
                            paddingBottom: "8px",
                            borderBottom: "2px solid #f0f0f0",
                            fontSize: "18px"
                        }}>Banking Information</h3>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>Bank Name</label>
                            <div style={{ position: "relative" }}>
                                <FaUniversity style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px",
                                    zIndex: 1
                                }} />
                                <input
                                    type="text"
                                    name="bankName"
                                    placeholder="Enter your bank name"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px 12px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)",
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>Account Number</label>
                            <div style={{ position: "relative" }}>
                                <FaCreditCard style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px",
                                    zIndex: 1
                                }} />
                                <input
                                    type="text"
                                    name="bankNumber"
                                    placeholder="Enter your account number"
                                    value={formData.bankNumber}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px 12px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)",
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>IFSC Code</label>
                            <div style={{ position: "relative" }}>
                                <FaIdCard style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px",
                                    zIndex: 1
                                }} />
                                <input
                                    type="text"
                                    name="ifscCode"
                                    placeholder="Enter IFSC code"
                                    value={formData.ifscCode}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px 12px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)",
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333"
                            }}>UPI ID</label>
                            <div style={{ position: "relative" }}>
                                <FaQrcode style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px",
                                    zIndex: 1
                                }} />
                                <input
                                    type="text"
                                    name="upiId"
                                    placeholder="Enter your UPI ID"
                                    value={formData.upiId}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px 20px 12px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)",
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "15px",
                                borderRadius: "10px",
                                border: "none",
                                background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s ease",
                                margin: "20px 0",
                                fontFamily: "'Poppins', sans-serif"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 5px 15px rgba(106, 17, 203, 0.4)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "none";
                            }}
                        >
                            Register Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;