// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { FaLock, FaKey, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

// const ChangePassword = () => {
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [message, setMessage] = useState({ text: "", isError: false });
//     const [isLoading, setIsLoading] = useState(false);
//     const [passwordMatch, setPasswordMatch] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         AOS.init({
//             duration: 800,
//             once: true
//         });
//     }, []);

//     useEffect(() => {
//         if (newPassword && confirmPassword) {
//             setPasswordMatch(newPassword === confirmPassword);
//         }
//     }, [newPassword, confirmPassword]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!passwordMatch) {
//             setMessage({ text: "Passwords do not match", isError: true });
//             return;
//         }

//         setIsLoading(true);
//         const token = localStorage.getItem("token");

//         try {
//             const res = await axios.put(
//                 "http://localhost:8000/api/users/change-password",
//                 { oldPassword, newPassword },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setMessage({ text: res.data.message, isError: false });
//             setOldPassword("");
//             setNewPassword("");
//             setConfirmPassword("");
//         } catch (err) {
//             setMessage({ 
//                 text: err.response?.data?.error || "Password change failed", 
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
//         marginBottom: "30px",
//         color: "#2a2d3e",
//         fontSize: "2rem",
//         fontWeight: "700",
//         background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent",
//     };

//     const inputContainerStyle = {
//         position: "relative",
//         marginBottom: "25px",
//     };

//     const inputStyle = {
//         width: "100%",
//         padding: "15px 20px 15px 50px",
//         borderRadius: "8px",
//         border: `1px solid ${passwordMatch ? "#e0e0e0" : "#ff6b6b"}`,
//         fontSize: "16px",
//         transition: "all 0.3s ease",
//         ":focus": {
//             borderColor: passwordMatch ? "#6a11cb" : "#ff6b6b",
//             boxShadow: passwordMatch ? "0 0 0 3px rgba(106, 17, 203, 0.1)" : "0 0 0 3px rgba(255, 107, 107, 0.1)",
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

//     const errorTextStyle = {
//         color: "#ff6b6b",
//         fontSize: "0.9rem",
//         marginTop: "-15px",
//         marginBottom: "15px",
//         display: passwordMatch ? "none" : "block",
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
//                 <h2 style={titleStyle}>Change Password</h2>

//                 {message.text && (
//                     <div style={messageStyle}>
//                         {!message.isError && <FaCheckCircle style={{ marginRight: "8px" }} />}
//                         {message.text}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                     <div style={inputContainerStyle}>
//                         <FaLock style={iconStyle} />
//                         <input
//                             type="password"
//                             placeholder="Current Password"
//                             value={oldPassword}
//                             onChange={(e) => setOldPassword(e.target.value)}
//                             required
//                             style={inputStyle}
//                         />
//                     </div>

//                     <div style={inputContainerStyle}>
//                         <FaKey style={iconStyle} />
//                         <input
//                             type="password"
//                             placeholder="New Password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             required
//                             style={inputStyle}
//                         />
//                     </div>

//                     <div style={inputContainerStyle}>
//                         <FaKey style={{ ...iconStyle, color: passwordMatch ? "#6a11cb" : "#ff6b6b" }} />
//                         <input
//                             type="password"
//                             placeholder="Confirm New Password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             required
//                             style={inputStyle}
//                         />
//                     </div>
//                     <p style={errorTextStyle}>Passwords do not match</p>

//                     <button 
//                         type="submit" 
//                         style={buttonStyle}
//                         disabled={isLoading || !passwordMatch}
//                     >
//                         {isLoading ? "Updating..." : "Change Password"}
//                     </button>
//                 </form>

//                 <a href="#" onClick={() => navigate(-1)} style={backLinkStyle}>
//                     <FaArrowLeft style={{ marginRight: "8px" }} /> Go Back
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default ChangePassword;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLock, FaKey, FaCheckCircle } from "react-icons/fa";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState({ text: "", isError: false });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    useEffect(() => {
        if (newPassword && confirmPassword) {
            setPasswordMatch(newPassword === confirmPassword);
        }
    }, [newPassword, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordMatch) {
            setMessage({ text: "Passwords do not match", isError: true });
            return;
        }

        setIsLoading(true);
        const token = localStorage.getItem("token");

        try {
            const res = await axios.put(
                "http://localhost:8000/api/users/change-password",
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage({ text: res.data.message, isError: false });
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setMessage({
                text: err.response?.data?.error || "Password change failed",
                isError: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Security quotes
    const securityQuotes = [
        "A strong password is your first line of defense against cyber threats",
        "Change your passwords regularly to maintain account security",
        "Security is not a product, but a process of continuous protection",
        "Your password is like a toothbrush: don't share it and change it regularly"
    ];
    const [currentQuote, setCurrentQuote] = useState(securityQuotes[0]);

    useEffect(() => {
        // Rotate quotes every 5 seconds
        const quoteInterval = setInterval(() => {
            setCurrentQuote(prevQuote => {
                const currentIndex = securityQuotes.indexOf(prevQuote);
                return securityQuotes[(currentIndex + 1) % securityQuotes.length];
            });
        }, 5000);

        return () => clearInterval(quoteInterval);
    }, [securityQuotes]);

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "20px",
            fontFamily: "'Poppins', sans-serif"
        }}>
            <div style={{
                display: "flex",
                width: "90%",
                maxWidth: "1000px",
                height: "550px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)"
            }} data-aos="fade-up">

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
                        }}>Security First</h2>

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
                            Secure • Protected • Private
                        </p>
                    </div>
                </div>

                {/* Right side - Change Password Form */}
                <div style={{
                    flex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(10px)",
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
                            marginBottom: "10px"
                        }}>Change Your Password</h2>
                        <p style={{ color: "#666", fontSize: "14px" }}>
                            Keep your account secure with a new password
                        </p>
                    </div>

                    {message.text && (
                        <div style={{
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            textAlign: "center",
                            backgroundColor: (message.isError ? "#f8d7da" : "#d4edda"),
                            color: (message.isError ? "#721c24" : "#155724"),
                            border: `1px solid ${message.isError ? "#f5c6cb" : "#c3e6cb"}`
                        }}>
                            {!message.isError && <FaCheckCircle style={{ marginRight: "8px" }} />}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#0f192e",
                                fontSize: "14px"
                            }}>Current Password</label>
                            <div style={{
                                position: "relative"
                            }}>
                                <FaLock style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px"
                                }} />
                                <input
                                    type="password"
                                    placeholder="Enter your current password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "15px 20px 15px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#0f192e",
                                fontSize: "14px"
                            }}>New Password</label>
                            <div style={{
                                position: "relative"
                            }}>
                                <FaKey style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: "#6a11cb",
                                    fontSize: "18px"
                                }} />
                                <input
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "15px 20px 15px 50px",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "25px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "500",
                                color: "#0f192e",
                                fontSize: "14px"
                            }}>Confirm New Password</label>
                            <div style={{
                                position: "relative"
                            }}>
                                <FaKey style={{
                                    position: "absolute",
                                    left: "15px",
                                    top: "15px",
                                    color: passwordMatch ? "#6a11cb" : "#ff6b6b",
                                    fontSize: "18px"
                                }} />
                                <input
                                    type="password"
                                    placeholder="Confirm your new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "15px 20px 15px 50px",
                                        borderRadius: "10px",
                                        border: `1px solid ${passwordMatch ? "#e0e0e0" : "#ff6b6b"}`,
                                        fontSize: "16px",
                                        transition: "all 0.3s ease",
                                        boxSizing: "border-box",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        backdropFilter: "blur(5px)"
                                    }}
                                />
                            </div>
                            {!passwordMatch && (
                                <p style={{
                                    color: "#ff6b6b",
                                    fontSize: "0.9rem",
                                    marginTop: "5px"
                                }}>
                                    Passwords do not match
                                </p>
                            )}
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
                                marginBottom: "20px"
                            }}
                            disabled={isLoading || !passwordMatch}
                            onMouseOver={(e) => {
                                if (!isLoading && passwordMatch) {
                                    e.target.style.transform = "translateY(-2px)";
                                    e.target.style.boxShadow = "0 5px 15px rgba(106, 17, 203, 0.4)";
                                }
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "none";
                            }}
                        >
                            {isLoading ? "Updating..." : "Change Password"}
                        </button>
                    </form>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "10px"
                    }}>
                        <a href="#" onClick={() => navigate(-1)} style={{
                            color: "#6a11cb",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.3s ease"
                        }}
                            onMouseOver={(e) => {
                                e.target.style.color = "#2575fc";
                                e.target.style.textDecoration = "underline";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = "#6a11cb";
                                e.target.style.textDecoration = "none";
                            }}
                        >
                            {/* <FaArrowLeft style={{ marginRight: "5px" }} /> Go Back */}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;