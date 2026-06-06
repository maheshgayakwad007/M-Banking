// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState({ text: "", isError: false });
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         AOS.init({
//             duration: 800,
//             once: true
//         });
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         try {
//             const res = await axios.post("http://localhost:8000/api/users/forgot-password", { email });
//             setMessage({ text: res.data.message, isError: false });
//         } catch (err) {
//             setMessage({ 
//                 text: err.response?.data?.error || "Something went wrong. Please try again.", 
//                 isError: true 
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Styles
//     const containerStyle = {
//         maxWidth: "500px",
//         margin: "40px auto",
//         padding: "40px",
//         borderRadius: "12px",
//         boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//         backgroundColor: "#ffffff",
//         backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         position: "relative",
//         overflow: "hidden",
//     };

//     const overlayStyle = {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(255, 255, 255, 0.92)",
//         zIndex: 0,
//     };

//     const contentStyle = {
//         position: "relative",
//         zIndex: 1,
//     };

//     const titleStyle = {
//         textAlign: "center",
//         marginBottom: "10px",
//         color: "#2a2d3e",
//         fontSize: "2rem",
//         fontWeight: "700",
//         background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent",
//     };

//     const subtitleStyle = {
//         textAlign: "center",
//         color: "#666",
//         marginBottom: "30px",
//         fontSize: "1rem",
//     };

//     const inputContainerStyle = {
//         position: "relative",
//         marginBottom: "25px",
//     };

//     const inputStyle = {
//         width: "85%",
//         padding: "15px 20px 15px 50px",
//         borderRadius: "8px",
//         border: "1px solid #e0e0e0",
//         fontSize: "16px",
//         transition: "all 0.3s ease",
//         ":focus": {
//             borderColor: "#6a11cb",
//             boxShadow: "0 0 0 3px rgba(106, 17, 203, 0.1)",
//             outline: "none",
//         },
//     };

//     const iconStyle = {
//         position: "absolute",
//         left: "15px",
//         top: "15px",
//         color: "#6a11cb",
//         fontSize: "20px",
//     };

//     const buttonStyle = {
//         width: "100%",
//         padding: "15px",
//         borderRadius: "8px",
//         border: "none",
//         backgroundColor: "#6a11cb",
//         color: "white",
//         fontSize: "16px",
//         fontWeight: "600",
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         transition: "all 0.3s ease",
//         ":hover": {
//             backgroundColor: "#2575fc",
//             transform: "translateY(-2px)",
//         },
//         ":disabled": {
//             backgroundColor: "#cccccc",
//             cursor: "not-allowed",
//         },
//     };

//     const messageStyle = {
//         padding: "12px",
//         borderRadius: "8px",
//         marginBottom: "20px",
//         textAlign: "center",
//         backgroundColor: message.isError ? "#f8d7da" : "#d4edda",
//         color: message.isError ? "#721c24" : "#155724",
//         border: `1px solid ${message.isError ? "#f5c6cb" : "#c3e6cb"}`,
//     };

//     const backLinkStyle = {
//         display: "flex",
//         alignItems: "center",
//         color: "#6a11cb",
//         textDecoration: "none",
//         marginTop: "20px",
//         fontWeight: "500",
//         transition: "all 0.3s ease",
//         ":hover": {
//             color: "#2575fc",
//             textDecoration: "underline",
//         },
//     };

//     return (
//         <div style={containerStyle} data-aos="fade-up">
//             <div style={overlayStyle}></div>
//             <div style={contentStyle}>
//                 <h2 style={titleStyle}>Reset Your Password</h2>
//                 <p style={subtitleStyle}>
//                     Enter your email address and we'll send you a temporary password
//                 </p>
                
//                 {message.text && (
//                     <div style={messageStyle}>
//                         {message.text}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                     <div style={inputContainerStyle}>
//                         <FaEnvelope style={iconStyle} />
//                         <input
//                             type="email"
//                             placeholder="Enter your registered email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             style={inputStyle}
//                         />
//                     </div>

//                     <button 
//                         type="submit" 
//                         style={buttonStyle}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Sending..." : (
//                             <>
//                                 Send Temporary Password <FaPaperPlane style={{ marginLeft: "10px" }} />
//                             </>
//                         )}
//                     </button>
//                 </form>

//                 <Link to="/login" style={backLinkStyle}>
//                     <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Login
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaPaperPlane, FaShieldAlt, FaLock } from "react-icons/fa";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ text: "", isError: false });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Blockchain quotes related to security and passwords
    const blockchainQuotes = [
        "In blockchain, your security is decentralized - just like your recovery",
        "Lost keys don't mean lost access with proper recovery systems",
        "Blockchain security: Where every password matters in the chain",
        "Your digital identity deserves secure recovery options"
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost:8000/api/users/forgot-password", { email });
            setMessage({ text: res.data.message, isError: false });
        } catch (err) {
            setMessage({ 
                text: err.response?.data?.error || "Something went wrong. Please try again.", 
                isError: true 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // background: "linear-gradient(135deg, #0f192e 0%, #1e3a5f 100%)",
             backgroundImage: "url('https://camo.githubusercontent.com/7003a8f294c647b6ea8eeae8e0770d4c8d8fd2c530618728bf55c9610d4afda4/68747470733a2f2f737465656d6974696d616765732e636f6d2f702f37323538785356654a624b6b7a586879736542503450597a313165424454387357326f523161347666564653364867375836384a634466476a4d4632757a366755574c6254513843444d4b73704d65796f535a44777168726d747938537334584831387446764834425a485a534c7a317356766e71355463766d5265716f6b575a336454615a3174664d6272643f666f726d61743d6d61746368266d6f64653d666974')",
            
            padding: "20px",
            fontFamily: "'Poppins', sans-serif"
        }}>
            <div style={{
                display: "flex",
                width: "90%",
                maxWidth: "1000px",
                height: "auto",
                minHeight: "500px",
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
                    
                    <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "30px"
                        }}>
                            <div style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #64b5f6 0%, #bb86fc 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "30px",
                                color: "white"
                            }}>
                                <FaLock />
                            </div>
                        </div>
                        
                        <h2 style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            marginBottom: "30px",
                            background: "linear-gradient(90deg, #64b5f6 0%, #bb86fc 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>Blockchain Security</h2>
                        
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
                            width: "60px",
                            height: "4px",
                            background: "linear-gradient(90deg, #64b5f6 0%, #bb86fc 100%)",
                            margin: "0 auto 20px",
                            borderRadius: "2px"
                        }}></div>
                        
                        <p style={{ fontSize: "14px", opacity: 0.8 }}>
                            Secure • Decentralized • Reliable
                        </p>
                    </div>
                </div>
                
                {/* Right side - Form Section */}
                <div style={{
                    flex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
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
                        }}>Reset Your Password</h2>
                        <p style={{ color: "#666", fontSize: "14px" }}>
                            Enter your email to receive a temporary password
                        </p>
                    </div>
                    
                    {message.text && (
                        <div style={{
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            textAlign: "center",
                            backgroundColor: message.isError ? "#f8d7da" : "#d4edda",
                            color: message.isError ? "#721c24" : "#155724",
                            border: `1px solid ${message.isError ? "#f5c6cb" : "#c3e6cb"}`
                        }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "25px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#333",
                                textAlign: "left"
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
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            disabled={isLoading}
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
                                if (!isLoading) {
                                    e.target.style.transform = "translateY(-2px)";
                                    e.target.style.boxShadow = "0 5px 15px rgba(106, 17, 203, 0.4)";
                                }
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "none";
                            }}
                        >
                            {isLoading ? "Sending..." : (
                                <>
                                    Send Temporary Password <FaPaperPlane style={{ marginLeft: "10px" }} />
                                </>
                            )}
                        </button>
                    </form>

                    <Link to="/login" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        color: "#6a11cb",
                        textDecoration: "none",
                        marginTop: "20px",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                        justifyContent: "center"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.color = "#2575fc";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.color = "#6a11cb";
                    }}
                    >
                        <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;