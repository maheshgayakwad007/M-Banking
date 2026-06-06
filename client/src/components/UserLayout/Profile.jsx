// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaCreditCard, FaIdCard, FaQrcode, FaCamera, FaEdit, FaSave, FaTimes, FaCheckCircle } from "react-icons/fa";

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({});
//     const [profilePic, setProfilePic] = useState(null);
//     const [preview, setPreview] = useState("");
//     const [message, setMessage] = useState({ text: "", isError: false });
//     const [isLoading, setIsLoading] = useState(false);

//     const token = localStorage.getItem("token");

//     // Initialize AOS with persistent animations
//     useEffect(() => {
//         AOS.init({
//             duration: 800,
//             once: false, // Animations will trigger every time element comes into view
//             mirror: true // Animations will trigger when scrolling back up
//         });
//     }, []);

//     // Fetch user data
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const decodedToken = JSON.parse(atob(token.split(".")[1]));
//                 const userId = decodedToken.id;

//                 const res = await axios.get(`http://localhost:8000/api/users/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 setUser(res.data);
//                 setFormData(res.data);
//                 if (res.data.profilePic) {
//                     setPreview(`http://localhost:8000/uploads/${res.data.profilePic}`);
//                 }
//             } catch (err) {
//                 setMessage({ text: "Error fetching profile", isError: true });
//             }
//         };

//         if (token) fetchProfile();
//     }, [token]);

//     // Handle profile picture preview
//     useEffect(() => {
//         if (!profilePic) return;
        
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

//     const handleUpdate = async () => {
//         try {
//             setIsLoading(true);
//             const decodedToken = JSON.parse(atob(token.split(".")[1]));
//             const userId = decodedToken.id;

//             const data = new FormData();
//             for (let key in formData) {
//                 if (typeof formData[key] === "object") {
//                     for (let subKey in formData[key]) {
//                         data.append(`${key}[${subKey}]`, formData[key][subKey]);
//                     }
//                 } else {
//                     data.append(key, formData[key]);
//                 }
//             }
//             if (profilePic) data.append("profilePic", profilePic);

//             const res = await axios.put(`http://localhost:8000/api/users/${userId}`, data, {
//                 headers: { 
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data"
//                 }
//             });

//             setMessage({ text: res.data.message, isError: false });
//             setUser(res.data.user);
//             setEditMode(false);
//             setProfilePic(null);
//         } catch (err) {
//             setMessage({ 
//                 text: err.response?.data?.error || "Update failed", 
//                 isError: true 
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Styles
//     const containerStyle = {
//         maxWidth: "600px",
//         margin: "40px auto",
//         padding: "40px",
//         borderRadius: "12px",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//         backgroundColor: "#ffffff",
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

//     const profilePicStyle = {
//         width: "150px",
//         height: "150px",
//         borderRadius: "50%",
//         objectFit: "cover",
//         border: "3px solid #6a11cb",
//         margin: "0 auto 20px",
//         display: "block",
//     };

//     const infoStyle = {
//         marginBottom: "15px",
//         fontSize: "1.1rem",
//         color: "#555",
//     };

//     const labelStyle = {
//         fontWeight: "600",
//         color: "#2a2d3e",
//         marginRight: "10px",
//     };

//     const inputStyle = {
//         width: "100%",
//         padding: "12px 15px",
//         margin: "8px 0",
//         border: "1px solid #e0e0e0",
//         borderRadius: "6px",
//         fontSize: "16px",
//         transition: "all 0.3s ease",
//         ":focus": {
//             borderColor: "#6a11cb",
//             boxShadow: "0 0 0 3px rgba(106, 17, 203, 0.1)",
//             outline: "none",
//         },
//     };

//     const buttonStyle = {
//         padding: "12px 25px",
//         borderRadius: "6px",
//         border: "none",
//         backgroundColor: "#6a11cb",
//         color: "white",
//         fontSize: "16px",
//         fontWeight: "600",
//         cursor: "pointer",
//         transition: "all 0.3s ease",
//         marginRight: "10px",
//         ":hover": {
//             backgroundColor: "#2575fc",
//             transform: "translateY(-2px)",
//         },
//     };

//     const cancelButtonStyle = {
//         ...buttonStyle,
//         backgroundColor: "#f0f0f0",
//         color: "#555",
//         ":hover": {
//             backgroundColor: "#e0e0e0",
//             transform: "translateY(-2px)",
//         },
//     };

//     const messageStyle = {
//         padding: "12px",
//         borderRadius: "6px",
//         margin: "20px 0",
//         textAlign: "center",
//         backgroundColor: message.isError ? "#f8d7da" : "#d4edda",
//         color: message.isError ? "#721c24" : "#155724",
//         border: `1px solid ${message.isError ? "#f5c6cb" : "#c3e6cb"}`,
//     };

//     const fileInputLabelStyle = {
//         display: "block",
//         backgroundColor: "#f0f0f0",
//         padding: "10px 15px",
//         borderRadius: "6px",
//         cursor: "pointer",
//         textAlign: "center",
//         margin: "20px 0",
//         transition: "all 0.3s ease",
//         ":hover": {
//             backgroundColor: "#e0e0e0",
//         },
//     };

//     if (!user) return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;

//     return (
//         <div style={containerStyle} data-aos="fade-up" data-aos-once="false">
//             <h2 style={titleStyle} data-aos="fade-down" data-aos-once="false">My Profile</h2>
            
//             {message.text && (
//                 <div style={messageStyle} data-aos="fade-down" data-aos-once="false">
//                     {!message.isError && <FaCheckCircle style={{ marginRight: "10px" }} />}
//                     {message.text}
//                 </div>
//             )}

//             <div style={{ textAlign: "center" }} data-aos="zoom-in" data-aos-once="false">
//                 <img
//                     src={preview || `http://localhost:8000/uploads/${user.profilePic}`}
//                     alt="Profile"
//                     style={profilePicStyle}
//                 />
                
//                 {editMode && (
//                     <label style={fileInputLabelStyle}>
//                         <FaCamera style={{ marginRight: "8px" }} />
//                         Change Profile Picture
//                         <input 
//                             type="file" 
//                             name="profilePic" 
//                             accept="image/*" 
//                             onChange={handleFileChange} 
//                             style={{ display: "none" }}
//                         />
//                     </label>
//                 )}
//             </div>

//             {editMode ? (
//                 <div>
//                     <div style={{ marginBottom: "20px" }} data-aos="fade-right" data-aos-once="false">
//                         <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
//                             <FaUser style={{ marginRight: "10px", color: "#6a11cb" }} />
//                             Full Name
//                         </label>
//                         <input 
//                             type="text" 
//                             name="name" 
//                             value={formData.name || ""} 
//                             onChange={handleChange} 
//                             style={inputStyle}
//                             required
//                         />
//                     </div>

//                     <div style={{ marginBottom: "20px" }} data-aos="fade-right" data-aos-once="false">
//                         <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
//                             <FaPhone style={{ marginRight: "10px", color: "#6a11cb" }} />
//                             Contact Number
//                         </label>
//                         <input 
//                             type="text" 
//                             name="contact" 
//                             value={formData.contact || ""} 
//                             onChange={handleChange} 
//                             style={inputStyle}
//                             required
//                         />
//                     </div>

//                     <h3 style={{ color: "#6a11cb", margin: "25px 0 15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }} data-aos="fade-right" data-aos-once="false">
//                         Banking Information
//                     </h3>

//                     <div style={{ marginBottom: "20px" }} data-aos="fade-right" data-aos-once="false">
//                         <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
//                             <FaUniversity style={{ marginRight: "10px", color: "#6a11cb" }} />
//                             Bank Name
//                         </label>
//                         <input 
//                             type="text" 
//                             name="bankName" 
//                             value={formData.bankDetails?.bankName || ""} 
//                             onChange={(e) => setFormData({
//                                 ...formData,
//                                 bankDetails: { ...formData.bankDetails, bankName: e.target.value }
//                             })} 
//                             style={inputStyle}
//                         />
//                     </div>

//                     <div style={{ marginBottom: "20px" }} data-aos="fade-right" data-aos-once="false">
//                         <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
//                             <FaCreditCard style={{ marginRight: "10px", color: "#6a11cb" }} />
//                             Account Number
//                         </label>
//                         <input 
//                             type="text" 
//                             name="bankNumber" 
//                             value={formData.bankDetails?.bankNumber || ""} 
//                             onChange={(e) => setFormData({
//                                 ...formData,
//                                 bankDetails: { ...formData.bankDetails, bankNumber: e.target.value }
//                             })} 
//                             style={inputStyle}
//                         />
//                     </div>

//                     <div style={{ marginBottom: "20px" }} data-aos="fade-right" data-aos-once="false">
//                         <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
//                             <FaIdCard style={{ marginRight: "10px", color: "#6a11cb" }} />
//                             IFSC Code
//                         </label>
//                         <input 
//                             type="text" 
//                             name="ifscCode" 
//                             value={formData.bankDetails?.ifscCode || ""} 
//                             onChange={(e) => setFormData({
//                                 ...formData,
//                                 bankDetails: { ...formData.bankDetails, ifscCode: e.target.value }
//                             })} 
//                             style={inputStyle}
//                         />
//                     </div>

//                     <div style={{ marginBottom: "25px" }} data-aos="fade-right" data-aos-once="false">
//                         <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
//                             <FaQrcode style={{ marginRight: "10px", color: "#6a11cb" }} />
//                             UPI ID
//                         </label>
//                         <input 
//                             type="text" 
//                             name="upiId" 
//                             value={formData.bankDetails?.upiId || ""} 
//                             onChange={(e) => setFormData({
//                                 ...formData,
//                                 bankDetails: { ...formData.bankDetails, upiId: e.target.value }
//                             })} 
//                             style={inputStyle}
//                         />
//                     </div>

//                     <div style={{ display: "flex", justifyContent: "center" }} data-aos="fade-up" data-aos-once="false">
//                         <button 
//                             onClick={handleUpdate} 
//                             style={buttonStyle}
//                             disabled={isLoading}
//                         >
//                             {isLoading ? "Saving..." : (
//                                 <>
//                                     <FaSave style={{ marginRight: "8px" }} /> Save Changes
//                                 </>
//                             )}
//                         </button>
//                         <button 
//                             onClick={() => setEditMode(false)} 
//                             style={cancelButtonStyle}
//                         >
//                             <FaTimes style={{ marginRight: "8px" }} /> Cancel
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <div>
//                     <div style={infoStyle} data-aos="fade-right" data-aos-once="false">
//                         <span style={labelStyle}><FaUser style={{ marginRight: "8px", color: "#6a11cb" }} />Name:</span>
//                         {user.name}
//                     </div>
//                     <div style={infoStyle} data-aos="fade-right" data-aos-once="false">
//                         <span style={labelStyle}><FaEnvelope style={{ marginRight: "8px", color: "#6a11cb" }} />Email:</span>
//                         {user.email}
//                     </div>
//                     <div style={infoStyle} data-aos="fade-right" data-aos-once="false">
//                         <span style={labelStyle}><FaPhone style={{ marginRight: "8px", color: "#6a11cb" }} />Contact:</span>
//                         {user.contact}
//                     </div>

//                     <h3 style={{ color: "#6a11cb", margin: "25px 0 15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }} data-aos="fade-right" data-aos-once="false">
//                         Banking Details
//                     </h3>

//                     <div style={infoStyle} data-aos="fade-right" data-aos-once="false">
//                         <span style={labelStyle}><FaUniversity style={{ marginRight: "8px", color: "#6a11cb" }} />Bank:</span>
//                         {user.bankDetails?.bankName || "Not provided"}
//                     </div>
//                     <div style={infoStyle} data-aos="fade-right" data-aos-once="false">
//                         <span style={labelStyle}><FaCreditCard style={{ marginRight: "8px", color: "#6a11cb" }} />Account:</span>
//                         {user.bankDetails?.bankNumber || "Not provided"}
//                     </div>
//                     <div style={infoStyle} data-aos="fade-right" data-aos-once="false">
//                         <span style={labelStyle}><FaIdCard style={{ marginRight: "8px", color: "#6a11cb" }} />IFSC:</span>
//                         {user.bankDetails?.ifscCode || "Not provided"}
//                     </div>
//                     <div style={infoStyle} data-aos="fade-right" data-aos-once="false">
//                         <span style={labelStyle}><FaQrcode style={{ marginRight: "8px", color: "#6a11cb" }} />UPI ID:</span>
//                         {user.bankDetails?.upiId || "Not provided"}
//                     </div>

//                     <div style={{ textAlign: "center", marginTop: "30px" }} data-aos="fade-up" data-aos-once="false">
//                         <button 
//                             onClick={() => setEditMode(true)} 
//                             style={buttonStyle}
//                         >
//                             <FaEdit style={{ marginRight: "8px" }} /> Edit Profile
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaCreditCard, FaIdCard, FaQrcode, FaCamera, FaEdit, FaSave, FaTimes, FaCheckCircle } from "react-icons/fa";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState({ text: "", isError: false });
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("token");

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Fetch user data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const userId = decodedToken.id;

                const res = await axios.get(`http://localhost:8000/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(res.data);
                setFormData(res.data);
                if (res.data.profilePic) {
                    setPreview(`http://localhost:8000/uploads/${res.data.profilePic}`);
                }
            } catch (err) {
                setMessage({ text: "Error fetching profile", isError: true });
            }
        };

        if (token) fetchProfile();
    }, [token]);

    // Handle profile picture preview
    useEffect(() => {
        if (!profilePic) return;
        
        const objectUrl = URL.createObjectURL(profilePic);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [profilePic]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(e.target.files[0]);
        }
    };

    const handleUpdate = async () => {
        try {
            setIsLoading(true);
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const userId = decodedToken.id;

            const data = new FormData();
            for (let key in formData) {
                if (typeof formData[key] === "object") {
                    for (let subKey in formData[key]) {
                        data.append(`${key}[${subKey}]`, formData[key][subKey]);
                    }
                } else {
                    data.append(key, formData[key]);
                }
            }
            if (profilePic) data.append("profilePic", profilePic);

            const res = await axios.put(`http://localhost:8000/api/users/${userId}`, data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            setMessage({ text: res.data.message, isError: false });
            setUser(res.data.user);
            setEditMode(false);
            setProfilePic(null);
        } catch (err) {
            setMessage({ 
                text: err.response?.data?.error || "Update failed", 
                isError: true 
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Styles
    const containerStyle = {
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "0",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
        backgroundColor: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "row",
    };

    const sidePanelStyle = {
        width: "35%",
        background: "linear-gradient(135deg, #2d4b91ff 0%, #1e293b 100%)",
        padding: "40px 30px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
    };

    const contentStyle = {
        width: "65%",
        padding: "40px",
    };

    const titleStyle = {
        textAlign: "center",
        color: "#2a2d3e",
        marginBottom: "30px",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "2rem",
        fontWeight: "700",
    };

    const profilePicContainerStyle = {
        position: "relative",
        width: "180px",
        height: "180px",
        margin: "0 auto 25px",
        borderRadius: "50%",
        border: "4px solid rgba(255, 255, 255, 0.3)",
        overflow: "hidden",
        transition: "all 0.4s ease",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    };

    const profilePicStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "all 0.4s ease",
    };

    const profileOverlayStyle = {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0",
        transition: "all 0.3s ease",
        cursor: "pointer",
    };

    const infoStyle = {
        marginBottom: "15px",
        fontSize: "1.1rem",
        color: "#555",
        display: "flex",
        alignItems: "flex-start",
    };

    const labelStyle = {
        fontWeight: "600",
        color: "#2a2d3e",
        minWidth: "120px",
        display: "flex",
        alignItems: "center",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px 15px",
        margin: "8px 0",
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        fontSize: "16px",
        transition: "all 0.3s ease",
    };

    const focusInputStyle = {
        borderColor: "#4c6ef5",
        boxShadow: "0 0 0 3px rgba(76, 110, 245, 0.1)",
        outline: "none",
    };

    const buttonStyle = {
        padding: "12px 25px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#4c6ef5",
        color: "white",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginRight: "10px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const buttonHoverStyle = {
        backgroundColor: "#3b5bdb",
        transform: "translateY(-2px)",
        boxShadow: "0 5px 15px rgba(59, 91, 219, 0.3)",
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#f0f0f0",
        color: "#555",
    };

    const cancelButtonHoverStyle = {
        backgroundColor: "#e0e0e0",
        transform: "translateY(-2px)",
    };

    const messageStyle = {
        padding: "12px",
        borderRadius: "6px",
        margin: "20px 0",
        textAlign: "center",
        backgroundColor: message.isError ? "#f8d7da" : "#d4edda",
        color: message.isError ? "#721c24" : "#155724",
        border: `1px solid ${message.isError ? "#f5c6cb" : "#c3e6cb"}`,
    };

    const fileInputLabelStyle = {
        display: "block",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: "10px 15px",
        borderRadius: "6px",
        cursor: "pointer",
        textAlign: "center",
        margin: "20px 0",
        transition: "all 0.3s ease",
        color: "white",
        fontWeight: "500",
    };

    const fileInputLabelHoverStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    };

    const bankCardStyle = {
        background: "linear-gradient(135deg, #4c6ef5, #3b5bdb)",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        margin: "20px 0",
        boxShadow: "0 10px 20px rgba(76, 110, 245, 0.2)",
    };

    const bankTitleStyle = {
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        paddingBottom: "15px",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        fontSize: "1.2rem",
    };

    // Hover state handlers
    const [hoverStates, setHoverStates] = useState({
        profilePic: false,
        saveButton: false,
        cancelButton: false,
        editButton: false,
        fileInput: false
    });

    const handleHover = (element, isHovered) => {
        setHoverStates(prev => ({ ...prev, [element]: isHovered }));
    };

    if (!user) return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;

    return (
        <div style={containerStyle} data-aos="fade-up">
            {/* Side Panel with Profile Picture */}
            <div style={sidePanelStyle}>
                <div 
                    style={profilePicContainerStyle}
                    onMouseEnter={() => handleHover('profilePic', true)}
                    onMouseLeave={() => handleHover('profilePic', false)}
                >
                    <img
                        src={preview || `http://localhost:8000/uploads/${user.profilePic}` || "/default-avatar.png"}
                        alt="Profile"
                        style={{
                            ...profilePicStyle,
                            transform: hoverStates.profilePic ? 'scale(1.1)' : 'scale(1)'
                        }}
                    />
                    {editMode && (
                        <div 
                            style={{
                                ...profileOverlayStyle,
                                opacity: hoverStates.profilePic ? 1 : 0
                            }}
                            onClick={() => document.getElementById('profilePicInput').click()}
                        >
                            <FaCamera size={30} color="#fff" />
                            <input 
                                id="profilePicInput"
                                type="file" 
                                name="profilePic" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                style={{ display: "none" }}
                            />
                        </div>
                    )}
                </div>
                
                <h2 style={{ margin: "10px 0", textAlign: "center" }}>{user.name}</h2>
                <p style={{ textAlign: "center", opacity: 0.8 }}>{user.email}</p>
                
                {editMode && (
                    <label 
                        style={{
                            ...fileInputLabelStyle,
                            ...(hoverStates.fileInput ? fileInputLabelHoverStyle : {})
                        }}
                        onMouseEnter={() => handleHover('fileInput', true)}
                        onMouseLeave={() => handleHover('fileInput', false)}
                    >
                        <FaCamera style={{ marginRight: "8px" }} />
                        Change Profile Picture
                        <input 
                            type="file" 
                            name="profilePic" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            style={{ display: "none" }}
                        />
                    </label>
                )}
            </div>
            
            {/* Content Area */}
            <div style={contentStyle}>
                <h2 style={titleStyle} data-aos="fade-down">My Profile</h2>
                
                {message.text && (
                    <div style={messageStyle} data-aos="fade-down">
                        {!message.isError && <FaCheckCircle style={{ marginRight: "10px" }} />}
                        {message.text}
                    </div>
                )}

                {editMode ? (
                    <div>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                                <FaUser style={{ marginRight: "10px", color: "#4c6ef5" }} />
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name || ""} 
                                onChange={handleChange} 
                                style={inputStyle}
                                onFocus={(e) => e.target.style = {...inputStyle, ...focusInputStyle}}
                                onBlur={(e) => e.target.style = inputStyle}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                                <FaPhone style={{ marginRight: "10px", color: "#4c6ef5" }} />
                                Contact Number
                            </label>
                            <input 
                                type="text" 
                                name="contact" 
                                value={formData.contact || ""} 
                                onChange={handleChange} 
                                style={inputStyle}
                                onFocus={(e) => e.target.style = {...inputStyle, ...focusInputStyle}}
                                onBlur={(e) => e.target.style = inputStyle}
                                required
                            />
                        </div>

                        <h3 style={{ color: "#4c6ef5", margin: "25px 0 15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                            Banking Information
                        </h3>

                        <div style={bankCardStyle}>
                            <div style={bankTitleStyle}>
                                <FaUniversity style={{ marginRight: "10px" }} />
                                Bank Details
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", opacity: 0.9 }}>
                                    Bank Name
                                </label>
                                <input 
                                    type="text" 
                                    name="bankName" 
                                    value={formData.bankDetails?.bankName || ""} 
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        bankDetails: { ...formData.bankDetails, bankName: e.target.value }
                                    })} 
                                    style={{
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                    onFocus={(e) => e.target.style = {
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.5)",
                                        outline: "none"
                                    }}
                                    onBlur={(e) => e.target.style = {
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                    placeholder="Enter bank name"
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", opacity: 0.9 }}>
                                    Account Number
                                </label>
                                <input 
                                    type="text" 
                                    name="bankNumber" 
                                    value={formData.bankDetails?.bankNumber || ""} 
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        bankDetails: { ...formData.bankDetails, bankNumber: e.target.value }
                                    })} 
                                    style={{
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                    onFocus={(e) => e.target.style = {
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.5)",
                                        outline: "none"
                                    }}
                                    onBlur={(e) => e.target.style = {
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                    placeholder="Enter account number"
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", opacity: 0.9 }}>
                                    IFSC Code
                                </label>
                                <input 
                                    type="text" 
                                    name="ifscCode" 
                                    value={formData.bankDetails?.ifscCode || ""} 
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        bankDetails: { ...formData.bankDetails, ifscCode: e.target.value }
                                    })} 
                                    style={{
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                    onFocus={(e) => e.target.style = {
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.5)",
                                        outline: "none"
                                    }}
                                    onBlur={(e) => e.target.style = {
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                    placeholder="Enter IFSC code"
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", opacity: 0.9 }}>
                                    UPI ID
                                </label>
                                <input 
                                    type="text" 
                                    name="upiId" 
                                    value={formData.bankDetails?.upiId || ""} 
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        bankDetails: { ...formData.bankDetails, upiId: e.target.value }
                                    })} 
                                    style={{
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                    onFocus={(e) => e.target.style = {
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.5)",
                                        outline: "none"
                                    }}
                                    onBlur={(e) => e.target.style = {
                                        ...inputStyle,
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                    placeholder="Enter UPI ID"
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: "25px" }} data-aos="fade-up">
                            <button 
                                onClick={handleUpdate} 
                                style={{
                                    ...buttonStyle,
                                    ...(hoverStates.saveButton ? buttonHoverStyle : {})
                                }}
                                onMouseEnter={() => handleHover('saveButton', true)}
                                onMouseLeave={() => handleHover('saveButton', false)}
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : (
                                    <>
                                        <FaSave style={{ marginRight: "8px" }} /> Save Changes
                                    </>
                                )}
                            </button>
                            <button 
                                onClick={() => setEditMode(false)} 
                                style={{
                                    ...cancelButtonStyle,
                                    ...(hoverStates.cancelButton ? cancelButtonHoverStyle : {})
                                }}
                                onMouseEnter={() => handleHover('cancelButton', true)}
                                onMouseLeave={() => handleHover('cancelButton', false)}
                            >
                                <FaTimes style={{ marginRight: "8px" }} /> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div style={infoStyle}>
                            <span style={labelStyle}><FaUser style={{ marginRight: "8px", color: "#4c6ef5" }} />Name:</span>
                            {user.name}
                        </div>
                        <div style={infoStyle}>
                            <span style={labelStyle}><FaEnvelope style={{ marginRight: "8px", color: "#4c6ef5" }} />Email:</span>
                            {user.email}
                        </div>
                        <div style={infoStyle}>
                            <span style={labelStyle}><FaPhone style={{ marginRight: "8px", color: "#4c6ef5" }} />Contact:</span>
                            {user.contact}
                        </div>

                        <h3 style={{ color: "#4c6ef5", margin: "25px 0 15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                            Banking Details
                        </h3>

                        {user.bankDetails ? (
                            <div style={bankCardStyle}>
                                <div style={bankTitleStyle}>
                                    <FaUniversity style={{ marginRight: "10px" }} />
                                    {user.bankDetails.bankName || "Bank Details"}
                                </div>
                                
                                <div style={infoStyle}>
                                    <span style={{...labelStyle, color: "rgba(255, 255, 255, 0.9)", minWidth: "140px"}}>
                                        <FaCreditCard style={{ marginRight: "8px" }} />Account Number:
                                    </span>
                                    <span style={{color: "white"}}>
                                        {user.bankDetails.bankNumber || "Not provided"}
                                    </span>
                                </div>
                                <div style={infoStyle}>
                                    <span style={{...labelStyle, color: "rgba(255, 255, 255, 0.9)", minWidth: "140px"}}>
                                        <FaIdCard style={{ marginRight: "8px" }} />IFSC Code:
                                    </span>
                                    <span style={{color: "white"}}>
                                        {user.bankDetails.ifscCode || "Not provided"}
                                    </span>
                                </div>
                                <div style={infoStyle}>
                                    <span style={{...labelStyle, color: "rgba(255, 255, 255, 0.9)", minWidth: "140px"}}>
                                        <FaQrcode style={{ marginRight: "8px" }} />UPI ID:
                                    </span>
                                    <span style={{color: "white"}}>
                                        {user.bankDetails.upiId || "Not provided"}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p style={{color: "#777", fontStyle: "italic"}}>No banking details provided</p>
                        )}

                        <div style={{ textAlign: "center", marginTop: "30px" }} data-aos="fade-up">
                            <button 
                                onClick={() => setEditMode(true)} 
                                style={{
                                    ...buttonStyle,
                                    ...(hoverStates.editButton ? buttonHoverStyle : {})
                                }}
                                onMouseEnter={() => handleHover('editButton', true)}
                                onMouseLeave={() => handleHover('editButton', false)}
                            >
                                <FaEdit style={{ marginRight: "8px" }} /> Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;