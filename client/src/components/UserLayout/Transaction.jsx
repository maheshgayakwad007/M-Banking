
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { 
//   FaCheckCircle, 
//   FaMoneyBillWave, 
//   FaExchangeAlt, 
//   FaHistory, 
//   FaTimes, 
//   FaUser, 
//   FaArrowUp, 
//   FaArrowDown,
//   FaPlus,
//   FaMinus,
//   FaSearch
// } from "react-icons/fa";
// import Modal from 'react-modal';
// import { format } from 'date-fns';
// import { enUS } from 'date-fns/locale'; // Updated import
// import TransactionAnalytics from "./TransactionVisualization";

// Modal.setAppElement('#root');


// const Transaction = () => {
//     const [balance, setBalance] = useState(0);
//     const [users, setUsers] = useState([]);
//     const [transactions, setTransactions] = useState([]);
//     const [filteredTransactions, setFilteredTransactions] = useState([]);
//     const [receiverId, setReceiverId] = useState("");
//     const [amount, setAmount] = useState("");
//     const [description, setDescription] = useState("");
//     const [message, setMessage] = useState({ text: "", isError: false });
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [groupedTransactions, setGroupedTransactions] = useState([]);
//     const [activeTab, setActiveTab] = useState('all');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [actionModalIsOpen, setActionModalIsOpen] = useState(false);
//     const [actionType, setActionType] = useState('');


//         // Actual withdraw after OTP
//     const doWithdraw = async ({ amount, description }) => {
//         try {
//             console.log("withdraw",amount,description,otpValue)
//             const res = await axios.post(
//                 "http://localhost:8000/api/transactions/withdraw",
//                 { amount, description,otpValue },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setMessage({ text: res.data.message, isError: false });
//             fetchBalance();
//             fetchHistory();
//         } catch (err) {
//             setMessage({ text: err.response?.data?.error || "Withdraw failed", isError: true });
//         }
//     };

//     // Actual credit after OTP
//     const doCredit = async ({ amount, description }) => {
//         try {
//             const res = await axios.post(
//                 "http://localhost:8000/api/transactions/credit",
//                 { amount, description },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setMessage({ text: res.data.message, isError: false });
//             fetchBalance();
//             fetchHistory();
//         } catch (err) {
//             setMessage({ text: err.response?.data?.error || "Credit failed", isError: true });
//         }
//     };
//     // OTP state
//     const [otpModalOpen, setOtpModalOpen] = useState(false);
//     const [otpType, setOtpType] = useState("");
//     const [otpValue, setOtpValue] = useState("");
//     const [otpServer, setOtpServer] = useState(""); // For demo only
//     const [otpVerified, setOtpVerified] = useState(false);
//     const [pendingAction, setPendingAction] = useState(null);
//     const [otpError, setOtpError] = useState("");

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         AOS.init({
//             duration: 800,
//             once: true
//         });
//         fetchBalance();
//         fetchUsers();
//         fetchHistory();
//     }, []);

//     const fetchBalance = async () => {
//         try {
//             const res = await axios.get("http://localhost:8000/api/transactions/balance", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setBalance(res.data.balance);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const res = await axios.get("http://localhost:8000/api/users", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUsers(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const fetchHistory = async () => {
//         try {
//             const res = await axios.get("http://localhost:8000/api/transactions/history", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setTransactions(res.data);
//             groupTransactionsByUser(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const groupTransactionsByUser = (txns) => {
//         const userMap = new Map();

//         txns.forEach(tx => {
//             if (tx.type === "withdraw" || tx.type === "credit") return;

//             const otherUser = tx.type === "received" ? tx.sender : tx.receiver;
//             const userId = otherUser._id;

//             if (!userMap.has(userId)) {
//                 userMap.set(userId, {
//                     user: otherUser,
//                     transactions: [],
//                     totalAmount: 0,
//                     lastInteraction: new Date(tx.date)
//                 });
//             }

//             const userGroup = userMap.get(userId);
//             userGroup.transactions.push(tx);
//             userGroup.totalAmount += tx.type === "received" ? tx.amount : -tx.amount;

//             if (new Date(tx.date) > new Date(userGroup.lastInteraction)) {
//                 userGroup.lastInteraction = tx.date;
//             }
//         });

//         const grouped = Array.from(userMap.values()).sort((a, b) => 
//             new Date(b.lastInteraction) - new Date(a.lastInteraction)
//         );

//         setGroupedTransactions(grouped);
//     };

//     // OTP-protected send money
//     const handleSendMoney = async (e) => {
//         e.preventDefault();
//         if (!receiverId || !amount) {
//             setMessage({ text: "Please select a receiver and enter an amount", isError: true });
//             return;
//         }
//         setPendingAction({
//             type: 'sendMoney',
//             data: { receiverId, amount: Number(amount), description }
//         });
//         await requestOtp('sendMoney');
//     };

//     // OTP request helper
//     const requestOtp = async (type) => {
//         setOtpType(type);
//         setOtpModalOpen(true);
//         setOtpValue("");
//         setOtpVerified(false);
//         setOtpError("");
//         try {
//             const res = await axios.post("http://localhost:8000/api/transactions/otp/request", { type }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setOtpServer(res.data.otp); // For demo only
//         } catch (err) {
//             setOtpError("Failed to send OTP");
//         }
//     };

//     // OTP verify helper
//     const verifyOtp = async () => {
//         setOtpError("");
//         try {
//             await axios.post("http://localhost:8000/api/transactions/otp/verify", { type: otpType, otp: otpValue }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setOtpVerified(true);
//             setOtpModalOpen(false);
//             // Run pending action
//             if (pendingAction) {
//                 if (pendingAction.type === 'sendMoney') {
//                     await doSendMoney(pendingAction.data);
//                 } else if (pendingAction.type === 'withdraw') {
//                     await doWithdraw(pendingAction.data);
//                 } else if (pendingAction.type === 'credit') {
//                     await doCredit(pendingAction.data);
//                 }
//                 setPendingAction(null);
//             }
//         } catch (err) {
//             setOtpError("Invalid or expired OTP");
//         }
//     };

//     // Actual send money after OTP
//     const doSendMoney = async ({ receiverId, amount, description }) => {
//         try {
//             const res = await axios.post(
//                 "http://localhost:8000/api/transactions/send",
//                 { receiverId, amount, description },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setReceiverId("");
//             setAmount("");
//             setDescription("");
//             fetchBalance();
//             fetchHistory();
//             setMessage({ text: "Money sent successfully!", isError: false });
//         } catch (err) {
//             setMessage({ 
//                 text: err.response?.data?.error || "Error sending money", 
//                 isError: true 
//             });
//         }
//     };

//     const viewUserTransactions = (userGroup) => {
//         setFilteredTransactions(userGroup.transactions);
//         setSelectedUser(userGroup.user);
//         setModalIsOpen(true);
//     };

//     const openActionModal = (type) => {
//         setActionType(type);
//         setActionModalIsOpen(true);
//     };

//     const filteredHistory = transactions.filter(tx => {
//         if (activeTab === 'all') return true;
//         if (activeTab === 'sent') return tx.type === 'sent';
//         if (activeTab === 'received') return tx.type === 'received';
//         if (activeTab === 'actions') return tx.type === 'withdraw' || tx.type === 'credit';
//         return true;
//     }).filter(tx => {
//         if (!searchTerm) return true;

//         const searchLower = searchTerm.toLowerCase();
//         if (tx.type === 'sent' || tx.type === 'received') {
//             const otherUser = tx.type === 'received' ? tx.sender : tx.receiver;
//             return (
//                 otherUser.name.toLowerCase().includes(searchLower) ||
//                 otherUser.email.toLowerCase().includes(searchLower) ||
//                 tx.amount.toString().includes(searchTerm) ||
//                 tx.description?.toLowerCase().includes(searchLower));
//         } else {
//             return (
//                 tx.amount.toString().includes(searchTerm) ||
//                 tx.description?.toLowerCase().includes(searchLower) ||
//                 tx.type.toLowerCase().includes(searchLower));
//         }
//     });

//     const modalStyles = {
//         content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             transform: 'translate(-50%, -50%)',
//             width: '90%',
//             maxWidth: '500px',
//             maxHeight: '80vh',
//             borderRadius: '12px',
//             padding: '0',
//             overflow: 'hidden',
//             border: 'none',
//             boxShadow: '0 5px 30px rgba(0,0,0,0.3)',
//             backgroundColor: '#ffffff'
//         },
//         overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 1000
//         }
//     };

//     // OTP-protected withdraw/credit form
//     // ActionForm now uses parent's helpers via props
//     const ActionForm = ({ type, onClose }) => {
//         const [amount, setAmount] = useState("");
//         const [description, setDescription] = useState("");
//         const [localMessage, setLocalMessage] = useState("");

//         // OTP flow for withdraw/credit
//         const handleSubmit = async (e) => {
//             e.preventDefault();
//             if (!amount) {
//                 setLocalMessage("Please enter an amount");
//                 return;
//             }
//             setPendingAction({
//                 type,
//                 data: { amount: Number(amount), description }
//             });
//             await requestOtp(type);
//         };

//         useEffect(() => {
//             if (otpVerified && pendingAction && (pendingAction.type === type)) {
//                 if (type === 'withdraw') {
//                     doWithdraw(pendingAction.data);
//                 } else if (type === 'credit') {
//                     doCredit(pendingAction.data);
//                 }
//                 setPendingAction(null);
//             }
//             // eslint-disable-next-line
//         }, [otpVerified]);

//         return (
//             <div style={{ padding: '25px' }}>
//                 <h3 style={{ 
//                     display: 'flex', 
//                     alignItems: 'center',
//                     color: type === 'withdraw' ? '#e74c3c' : '#2ecc71',
//                     marginBottom: '20px'
//                 }}>
//                     {type === 'withdraw' ? (
//                         <FaMinus style={{ marginRight: '10px' }} />
//                     ) : (
//                         <FaPlus style={{ marginRight: '10px' }} />
//                     )}
//                     {type === 'withdraw' ? 'Withdraw Money' : 'Credit Money'}
//                 </h3>
//                 <form onSubmit={handleSubmit}>
//                     <div style={{ marginBottom: '15px' }}>
//                         <label style={{ 
//                             display: 'block', 
//                             marginBottom: '5px', 
//                             fontWeight: '500',
//                             color: '#555'
//                         }}>
//                             Amount (₹)
//                         </label>
//                         <input
//                             type="number"
//                             placeholder="Enter amount"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             style={{
//                                 width: '100%',
//                                 padding: '12px 15px',
//                                 borderRadius: '8px',
//                                 border: '1px solid #ddd',
//                                 fontSize: '16px',
//                                 transition: 'all 0.3s',
//                                 ':focus': {
//                                     borderColor: type === 'withdraw' ? '#e74c3c' : '#2ecc71',
//                                     outline: 'none',
//                                     boxShadow: `0 0 0 3px ${type === 'withdraw' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(46, 204, 113, 0.2)'}`
//                                 }
//                             }}
//                             required
//                         />
//                     </div>
//                     <div style={{ marginBottom: '20px' }}>
//                         <label style={{ 
//                             display: 'block', 
//                             marginBottom: '5px', 
//                             fontWeight: '500',
//                             color: '#555'
//                         }}>
//                             Description (Optional)
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Enter description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             style={{
//                                 width: '100%',
//                                 padding: '12px 15px',
//                                 borderRadius: '8px',
//                                 border: '1px solid #ddd',
//                                 fontSize: '16px',
//                                 transition: 'all 0.3s',
//                                 ':focus': {
//                                     borderColor: type === 'withdraw' ? '#e74c3c' : '#2ecc71',
//                                     outline: 'none',
//                                     boxShadow: `0 0 0 3px ${type === 'withdraw' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(46, 204, 113, 0.2)'}`
//                                 }
//                             }}
//                         />
//                     </div>
//                     <button 
//                         type="submit"
//                         style={{
//                             width: '100%',
//                             padding: '14px',
//                             borderRadius: '8px',
//                             border: 'none',
//                             backgroundColor: type === 'withdraw' ? '#e74c3c' : '#2ecc71',
//                             color: 'white',
//                             fontSize: '16px',
//                             fontWeight: '600',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s',
//                             ':hover': {
//                                 backgroundColor: type === 'withdraw' ? '#c0392b' : '#27ae60',
//                                 transform: 'translateY(-2px)'
//                             }
//                         }}
//                     >
//                         {type === 'withdraw' ? 'Withdraw' : 'Credit'}
//                     </button>
//                     {localMessage && (
//                         <div style={{ 
//                             marginTop: '15px',
//                             padding: '10px',
//                             borderRadius: '5px',
//                             backgroundColor: localMessage.includes('successful') ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
//                             color: localMessage.includes('successful') ? '#27ae60' : '#e74c3c',
//                             textAlign: 'center',
//                             fontWeight: '500'
//                         }}>
//                             {localMessage}
//                         </div>
//                     )}
//                 </form>
//             </div>
//         );
//     };
//     // OTP Modal
//     const OtpModal = () => (
//         <Modal
//             isOpen={otpModalOpen}
//             onRequestClose={() => setOtpModalOpen(false)}
//             style={modalStyles}
//             contentLabel="OTP Verification"
//         >
//             <div style={{ padding: 30 }}>
//                 <h3 style={{ marginBottom: 20 }}>Enter OTP</h3>
//                 <p style={{ marginBottom: 10 }}>An OTP has been sent to your registered contact.</p>
//                 <input
//                     type="text"
//                     value={otpValue}
//                     onChange={e => setOtpValue(e.target.value)}
//                     placeholder="Enter OTP"
//                     style={{
//                         width: '100%',
//                         padding: '12px 15px',
//                         borderRadius: '8px',
//                         border: '1px solid #ddd',
//                         fontSize: '16px',
//                         marginBottom: 15
//                     }}
//                 />
//                 {/* For demo: show OTP */}
//                 {otpServer && (
//                     <div style={{ color: '#888', fontSize: 13, marginBottom: 10 }}>Demo OTP: <b>{otpServer}</b></div>
//                 )}
//                 {otpError && (
//                     <div style={{ color: 'red', marginBottom: 10 }}>{otpError}</div>
//                 )}
//                 <button
//                     onClick={verifyOtp}
//                     style={{
//                         width: '100%',
//                         padding: '12px',
//                         borderRadius: '8px',
//                         border: 'none',
//                         backgroundColor: '#6a11cb',
//                         color: 'white',
//                         fontSize: '16px',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         marginBottom: 10
//                     }}
//                 >
//                     Verify OTP
//                 </button>
//                 <button
//                     onClick={() => setOtpModalOpen(false)}
//                     style={{
//                         width: '100%',
//                         padding: '10px',
//                         borderRadius: '8px',
//                         border: 'none',
//                         backgroundColor: '#eee',
//                         color: '#333',
//                         fontSize: '14px',
//                         fontWeight: '500',
//                         cursor: 'pointer'
//                     }}
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </Modal>
//     );

//     return (
//         <div style={{
//             maxWidth: '1200px',
//             margin: '40px auto',
//             padding: '0 20px',
//             fontFamily: "'Poppins', sans-serif"
//         }}>
//             {/* Balance Card */}
//             <div style={{
//                 background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
//                 borderRadius: '15px',
//                 padding: '25px',
//                 color: 'white',
//                 marginBottom: '30px',
//                 boxShadow: '0 10px 30px rgba(106, 17, 203, 0.3)',
//                 position: 'relative',
//                 overflow: 'hidden'
//             }} data-aos="fade-down">
//                 <div style={{
//                     position: 'absolute',
//                     top: '-50px',
//                     right: '-50px',
//                     width: '200px',
//                     height: '200px',
//                     borderRadius: '50%',
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                 }}></div>
//                 <div style={{
//                     position: 'absolute',
//                     bottom: '-80px',
//                     right: '30px',
//                     width: '150px',
//                     height: '150px',
//                     borderRadius: '50%',
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                 }}></div>

//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <div>
//                         <h3 style={{ 
//                             margin: '0 0 10px 0',
//                             fontWeight: '400',
//                             display: 'flex',
//                             alignItems: 'center'
//                         }}>
//                             <FaMoneyBillWave style={{ marginRight: '10px' }} />
//                             Current Balance
//                         </h3>
//                         <h1 style={{ 
//                             margin: '0',
//                             fontSize: '2.5rem',
//                             fontWeight: '700'
//                         }}>
//                             ₹{balance.toLocaleString()}
//                         </h1>
//                     </div>

//                     <div style={{ display: 'flex', gap: '15px', zIndex: 1 }}>
//                         <button 
//                             onClick={() => openActionModal('credit')}
//                             style={{
//                                 padding: '12px 20px',
//                                 borderRadius: '8px',
//                                 border: 'none',
//                                 backgroundColor: 'rgba(255,255,255,0.2)',
//                                 color: 'white',
//                                 fontSize: '14px',
//                                 fontWeight: '600',
//                                 cursor: 'pointer',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 transition: 'all 0.3s',
//                                 ':hover': {
//                                     backgroundColor: 'rgba(255,255,255,0.3)',
//                                     transform: 'translateY(-2px)'
//                                 }
//                             }}
//                         >
//                             <FaPlus style={{ marginRight: '8px' }} />
//                             Credit
//                         </button>
//                         <button 
//                             onClick={() => openActionModal('withdraw')}
//                             style={{
//                                 padding: '12px 20px',
//                                 borderRadius: '8px',
//                                 border: 'none',
//                                 backgroundColor: 'rgba(255,255,255,0.2)',
//                                 color: 'white',
//                                 fontSize: '14px',
//                                 fontWeight: '600',
//                                 cursor: 'pointer',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 transition: 'all 0.3s',
//                                 ':hover': {
//                                     backgroundColor: 'rgba(255,255,255,0.3)',
//                                     transform: 'translateY(-2px)'
//                                 }
//                             }}
//                         >
//                             <FaMinus style={{ marginRight: '8px' }} />
//                             Withdraw
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Send Money Section */}
//             <div style={{
//                 backgroundColor: 'white',
//                 borderRadius: '15px',
//                 padding: '25px',
//                 marginBottom: '30px',
//                 boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
//             }} data-aos="fade-up">
//                 <h3 style={{ 
//                     color: '#6a11cb',
//                     marginBottom: '20px',
//                     display: 'flex',
//                     alignItems: 'center'
//                 }}>
//                     <FaExchangeAlt style={{ marginRight: '10px' }} />
//                     Send Money
//                 </h3>

//                 {message.text && (
//                     <div style={{
//                         padding: '12px',
//                         borderRadius: '6px',
//                         marginBottom: '20px',
//                         backgroundColor: message.isError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)',
//                         color: message.isError ? '#e74c3c' : '#2ecc71',
//                         borderLeft: `4px solid ${message.isError ? '#e74c3c' : '#2ecc71'}`,
//                         fontWeight: '500'
//                     }}>
//                         {message.text}
//                     </div>
//                 )}

//                 <form onSubmit={handleSendMoney}>
//                     <div style={{ marginBottom: '20px' }}>
//                         <label style={{ 
//                             display: 'block', 
//                             marginBottom: '8px', 
//                             fontWeight: '500',
//                             color: '#555'
//                         }}>
//                             Select Receiver
//                         </label>
//                         <select
//                             value={receiverId}
//                             onChange={(e) => setReceiverId(e.target.value)}
//                             style={{
//                                 width: '100%',
//                                 padding: '12px 15px',
//                                 borderRadius: '8px',
//                                 border: '1px solid #ddd',
//                                 fontSize: '16px',
//                                 appearance: 'none',
//                                 backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
//                                 backgroundRepeat: 'no-repeat',
//                                 backgroundPosition: 'right 10px center',
//                                 backgroundSize: '20px',
//                                 transition: 'all 0.3s',
//                                 ':focus': {
//                                     borderColor: '#6a11cb',
//                                     outline: 'none',
//                                     boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
//                                 }
//                             }}
//                             required
//                         >
//                             <option value="">Select a user</option>
//                             {users
//                                 .filter(u => u.role !== 'admin' && u._id !== JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id)
//                                 .map((user) => (
//                                     <option key={user._id} value={user._id}>
//                                         {user.name} ({user.email})
//                                     </option>
//                                 ))}
//                         </select>
//                     </div>

//                     <div style={{ marginBottom: '20px' }}>
//                         <label style={{ 
//                             display: 'block', 
//                             marginBottom: '8px', 
//                             fontWeight: '500',
//                             color: '#555'
//                         }}>
//                             Amount (₹)
//                         </label>
//                         <input
//                             type="number"
//                             placeholder="Enter amount"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             style={{
//                                 width: '100%',
//                                 padding: '12px 15px',
//                                 borderRadius: '8px',
//                                 border: '1px solid #ddd',
//                                 fontSize: '16px',
//                                 transition: 'all 0.3s',
//                                 ':focus': {
//                                     borderColor: '#6a11cb',
//                                     outline: 'none',
//                                     boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
//                                 }
//                             }}
//                             required
//                         />
//                     </div>

//                     <div style={{ marginBottom: '25px' }}>
//                         <label style={{ 
//                             display: 'block', 
//                             marginBottom: '8px', 
//                             fontWeight: '500',
//                             color: '#555'
//                         }}>
//                             Description (Optional)
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Enter description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             style={{
//                                 width: '100%',
//                                 padding: '12px 15px',
//                                 borderRadius: '8px',
//                                 border: '1px solid #ddd',
//                                 fontSize: '16px',
//                                 transition: 'all 0.3s',
//                                 ':focus': {
//                                     borderColor: '#6a11cb',
//                                     outline: 'none',
//                                     boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
//                                 }
//                             }}
//                         />
//                     </div>

//                     <button 
//                         type="submit"
//                         style={{
//                             width: '100%',
//                             padding: '14px',
//                             borderRadius: '8px',
//                             border: 'none',
//                             backgroundColor: '#6a11cb',
//                             color: 'white',
//                             fontSize: '16px',
//                             fontWeight: '600',
//                             cursor: 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             transition: 'all 0.3s',
//                             ':hover': {
//                                 backgroundColor: '#2575fc',
//                                 transform: 'translateY(-2px)',
//                                 boxShadow: '0 5px 15px rgba(106, 17, 203, 0.3)'
//                             }
//                         }}
//                     >
//                         <FaExchangeAlt style={{ marginRight: '10px' }} />
//                         Send Money
//                     </button>
//                 </form>
//             </div>

//             {/* Transaction History Section */}
//             <div style={{
//                 backgroundColor: 'white',
//                 borderRadius: '15px',
//                 padding: '25px',
//                 boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
//             }} data-aos="fade-up">
//                 <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center',
//                     marginBottom: '20px',
//                     flexWrap: 'wrap',
//                     gap: '15px'
//                 }}>
//                     <h3 style={{ 
//                         color: '#6a11cb',
//                         margin: '0',
//                         display: 'flex',
//                         alignItems: 'center'
//                     }}>
//                         <FaHistory style={{ marginRight: '10px' }} />
//                         Transaction History
//                     </h3>

//                     <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//                         <div style={{ position: 'relative' }}>
//                             <input
//                                 type="text"
//                                 placeholder="Search transactions..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 style={{
//                                     padding: '10px 15px 10px 40px',
//                                     borderRadius: '8px',
//                                     border: '1px solid #ddd',
//                                     fontSize: '14px',
//                                     transition: 'all 0.3s',
//                                     ':focus': {
//                                         borderColor: '#6a11cb',
//                                         outline: 'none',
//                                         boxShadow: '0 0 0 3px rgba(106, 17, 203, 0.2)'
//                                     }
//                                 }}
//                             />
//                             <FaSearch style={{
//                                 position: 'absolute',
//                                 left: '15px',
//                                 top: '50%',
//                                 transform: 'translateY(-50%)',
//                                 color: '#999'
//                             }} />
//                         </div>

//                         <div style={{
//                             display: 'flex',
//                             borderRadius: '8px',
//                             border: '1px solid #eee',
//                             overflow: 'hidden',
//                             backgroundColor: '#f8f9fa'
//                         }}>
//                             <button
//                                 onClick={() => setActiveTab('all')}
//                                 style={{
//                                     padding: '8px 15px',
//                                     border: 'none',
//                                     backgroundColor: activeTab === 'all' ? '#6a11cb' : 'transparent',
//                                     color: activeTab === 'all' ? 'white' : '#555',
//                                     fontSize: '14px',
//                                     cursor: 'pointer',
//                                     transition: 'all 0.3s'
//                                 }}
//                             >
//                                 All
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('sent')}
//                                 style={{
//                                     padding: '8px 15px',
//                                     border: 'none',
//                                     backgroundColor: activeTab === 'sent' ? '#e74c3c' : 'transparent',
//                                     color: activeTab === 'sent' ? 'white' : '#555',
//                                     fontSize: '14px',
//                                     cursor: 'pointer',
//                                     transition: 'all 0.3s'
//                                 }}
//                             >
//                                 Sent
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('received')}
//                                 style={{
//                                     padding: '8px 15px',
//                                     border: 'none',
//                                     backgroundColor: activeTab === 'received' ? '#2ecc71' : 'transparent',
//                                     color: activeTab === 'received' ? 'white' : '#555',
//                                     fontSize: '14px',
//                                     cursor: 'pointer',
//                                     transition: 'all 0.3s'
//                                 }}
//                             >
//                                 Received
//                             </button>
//                             <button
//                                 onClick={() => setActiveTab('actions')}
//                                 style={{
//                                     padding: '8px 15px',
//                                     border: 'none',
//                                     backgroundColor: activeTab === 'actions' ? '#3498db' : 'transparent',
//                                     color: activeTab === 'actions' ? 'white' : '#555',
//                                     fontSize: '14px',
//                                     cursor: 'pointer',
//                                     transition: 'all 0.3s'
//                                 }}
//                             >
//                                 Actions
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Grouped Transactions (User Cards) */}
//                 {activeTab === 'all' && (
//                     <div style={{ marginBottom: '30px' }}>
//                         <h4 style={{ 
//                             color: '#6a11cb',
//                             marginBottom: '15px',
//                             display: 'flex',
//                             alignItems: 'center'
//                         }}>
//                             <FaUser style={{ marginRight: '10px' }} />
//                             Recent Contacts
//                         </h4>

//                         {groupedTransactions.length === 0 ? (
//                             <p style={{ textAlign: 'center', color: '#999' }}>No recent transactions with other users</p>
//                         ) : (
//                             <div style={{
//                                 display: 'grid',
//                                 gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                                 gap: '15px'
//                             }}>
//                                 {groupedTransactions.map((group) => (
//                                     <div 
//                                         key={group.user._id}
//                                         onClick={() => viewUserTransactions(group)}
//                                         style={{
//                                             backgroundColor: '#f8f9fa',
//                                             borderRadius: '10px',
//                                             padding: '15px',
//                                             cursor: 'pointer',
//                                             transition: 'all 0.3s',
//                                             border: '1px solid #eee',
//                                             ':hover': {
//                                                 transform: 'translateY(-3px)',
//                                                 boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
//                                                 borderColor: '#6a11cb'
//                                             }
//                                         }}
//                                     >
//                                         <div style={{ 
//                                             display: 'flex', 
//                                             alignItems: 'center',
//                                             marginBottom: '10px'
//                                         }}>
//                                             <div style={{
//                                                 width: '50px',
//                                                 height: '50px',
//                                                 borderRadius: '50%',
//                                                 backgroundColor: group.user.profilePic ? 'transparent' : '#6a11cb',
//                                                 color: group.user.profilePic ? 'inherit' : 'white',
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                                 marginRight: '15px',
//                                                 backgroundImage: group.user.profilePic ? `url(http://localhost:8000/uploads/${group.user.profilePic})` : 'none',
//                                                 backgroundSize: 'cover',
//                                                 backgroundPosition: 'center'
//                                             }}>
//                                                 {!group.user.profilePic && group.user.name.charAt(0).toUpperCase()}
//                                             </div>
//                                             <div>
//                                                 <h4 style={{ 
//                                                     margin: '0 0 5px 0',
//                                                     color: '#333'
//                                                 }}>
//                                                     {group.user.name}
//                                                 </h4>
//                                                 <p style={{ 
//                                                     margin: '0',
//                                                     color: '#666',
//                                                     fontSize: '14px'
//                                                 }}>
//                                                     {group.user.email}
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         <div style={{ 
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center'
//                                         }}>
//                                             <div>
//                                                 <p style={{ 
//                                                     margin: '0',
//                                                     color: '#999',
//                                                     fontSize: '13px'
//                                                 }}>
//                                                     Last transaction
//                                                 </p>
//                                                 <p style={{ 
//                                                     margin: '5px 0 0 0',
//                                                     color: '#666',
//                                                     fontSize: '14px'
//                                                 }}>
//                                                     {format(new Date(group.lastInteraction), 'MMM d, yyyy h:mm a')}
//                                                 </p>
//                                             </div>

//                                             <div style={{
//                                                 fontSize: '18px',
//                                                 fontWeight: '600',
//                                                 color: group.totalAmount > 0 ? '#2ecc71' : '#e74c3c'
//                                             }}>
//                                                 {group.totalAmount > 0 ? '+' : ''}
//                                                 ₹{Math.abs(group.totalAmount).toLocaleString()}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Transaction List */}
//                 <div>
//                     {filteredHistory.length === 0 ? (
//                         <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No transactions found</p>
//                     ) : (
//                         <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
//                             {filteredHistory.map((tx) => {
//                                 const isReceived = tx.type === 'received';
//                                 const isSent = tx.type === 'sent';
//                                 const isWithdraw = tx.type === 'withdraw';
//                                 const isCredit = tx.type === 'credit';

//                                 const otherUser = isReceived ? tx.sender : isSent ? tx.receiver : null;

//                                 return (
//                                     <div 
//                                         key={tx._id}
//                                         style={{
//                                             padding: '15px',
//                                             marginBottom: '15px',
//                                             borderRadius: '10px',
//                                             backgroundColor: '#f8f9fa',
//                                             borderLeft: `4px solid ${
//                                                 isReceived ? '#2ecc71' : 
//                                                 isSent ? '#e74c3c' : 
//                                                 isCredit ? '#3498db' : 
//                                                 '#9b59b6'
//                                             }`,
//                                             transition: 'all 0.3s',
//                                             ':hover': {
//                                                 transform: 'translateY(-2px)',
//                                                 boxShadow: '0 5px 10px rgba(0,0,0,0.05)'
//                                             }
//                                         }}
//                                     >
//                                         <div style={{ 
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             marginBottom: '10px'
//                                         }}>
//                                             <div style={{ display: 'flex', alignItems: 'center' }}>
//                                                 {otherUser && (
//                                                     <div style={{
//                                                         width: '40px',
//                                                         height: '40px',
//                                                         borderRadius: '50%',
//                                                         backgroundColor: otherUser.profilePic ? 'transparent' : '#6a11cb',
//                                                         color: otherUser.profilePic ? 'inherit' : 'white',
//                                                         display: 'flex',
//                                                         alignItems: 'center',
//                                                         justifyContent: 'center',
//                                                         marginRight: '12px',
//                                                         backgroundImage: otherUser.profilePic ? `url(http://localhost:8000/uploads/${otherUser.profilePic})` : 'none',
//                                                         backgroundSize: 'cover',
//                                                         backgroundPosition: 'center'
//                                                     }}>
//                                                         {!otherUser.profilePic && otherUser.name.charAt(0).toUpperCase()}
//                                                     </div>
//                                                 )}

//                                                 <div>
//                                                     <h4 style={{ 
//                                                         margin: '0',
//                                                         fontSize: '16px',
//                                                         color: '#333'
//                                                     }}>
//                                                         {isReceived && `Received from ${otherUser?.name}`}
//                                                         {isSent && `Sent to ${otherUser?.name}`}
//                                                         {isWithdraw && 'Withdrawn money'}
//                                                         {isCredit && 'Credited money'}
//                                                     </h4>
//                                                     <p style={{ 
//                                                         margin: '5px 0 0 0',
//                                                         fontSize: '13px',
//                                                         color: '#999'
//                                                     }}>
//                                                         {format(new Date(tx.date), 'MMM d, yyyy h:mm a', { locale: enUS })}
//                                                     </p>
//                                                 </div>
//                                             </div>

//                                             <div style={{
//                                                 fontSize: '18px',
//                                                 fontWeight: '600',
//                                                 color: isReceived || isCredit ? '#2ecc71' : '#e74c3c'
//                                             }}>
//                                                 {(isReceived || isCredit) ? '+' : '-'}
//                                                 ₹{tx.amount.toLocaleString()}
//                                             </div>
//                                         </div>

//                                         {tx.description && (
//                                             <p style={{ 
//                                                 margin: '10px 0 0 0',
//                                                 color: '#666',
//                                                 fontSize: '14px'
//                                             }}>
//                                                 {tx.description}
//                                             </p>
//                                         )}

//                                         <div style={{ 
//                                             marginTop: '10px',
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center'
//                                         }}>
//                                             <small style={{ 
//                                                 color: '#999',
//                                                 fontSize: '12px'
//                                             }}>
//                                                 <strong>Transaction ID:</strong> {tx.transactionId || tx._id}
//                                             </small>

//                                             {otherUser && (
//                                                 <button 
//                                                     onClick={() => viewUserTransactions({
//                                                         user: otherUser,
//                                                         transactions: transactions.filter(t => 
//                                                             (t.sender?._id === otherUser._id && t.type === 'received') || 
//                                                             (t.receiver?._id === otherUser._id && t.type === 'sent')
//                                                         )
//                                                     })}
//                                                     style={{
//                                                         backgroundColor: 'transparent',
//                                                         border: 'none',
//                                                         color: '#6a11cb',
//                                                         fontSize: '12px',
//                                                         cursor: 'pointer',
//                                                         textDecoration: 'underline',
//                                                         padding: '0'
//                                                     }}
//                                                 >
//                                                     View all transactions
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* User Transactions Modal */}
//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={() => setModalIsOpen(false)}
//                 style={modalStyles}
//                 contentLabel="User Transactions"
//             >
//                 <div style={{
//                     padding: '20px',
//                     borderBottom: '1px solid #eee',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     backgroundColor: '#f8f9fa',
//                     position: 'sticky',
//                     top: 0,
//                     zIndex: 1
//                 }}>
//                     <h3 style={{ margin: 0 }}>Transaction History</h3>
//                     <button 
//                         style={{
//                             background: 'none',
//                             border: 'none',
//                             fontSize: '20px',
//                             cursor: 'pointer',
//                             color: '#666',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             width: '30px',
//                             height: '30px',
//                             borderRadius: '50%',
//                             transition: 'all 0.3s',
//                             ':hover': {
//                                 backgroundColor: '#eee'
//                             }
//                         }}
//                         onClick={() => setModalIsOpen(false)}
//                     >
//                         <FaTimes />
//                     </button>
//                 </div>

//                 {selectedUser && (
//                     <div style={{ 
//                         padding: '20px',
//                         borderBottom: '1px solid #eee',
//                         backgroundColor: '#fff'
//                     }}>
//                         <div style={{ 
//                             display: 'flex', 
//                             alignItems: 'center',
//                             marginBottom: '15px'
//                         }}>
//                             <div style={{
//                                 width: '60px',
//                                 height: '60px',
//                                 borderRadius: '50%',
//                                 backgroundColor: selectedUser.profilePic ? 'transparent' : '#6a11cb',
//                                 color: selectedUser.profilePic ? 'inherit' : 'white',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 marginRight: '15px',
//                                 backgroundImage: selectedUser.profilePic ? `url(http://localhost:8000/uploads/${selectedUser.profilePic})` : 'none',
//                                 backgroundSize: 'cover',
//                                 backgroundPosition: 'center'
//                             }}>
//                                 {!selectedUser.profilePic && selectedUser.name.charAt(0).toUpperCase()}
//                             </div>
//                             <div>
//                                 <h4 style={{ 
//                                     margin: '0 0 5px 0',
//                                     color: '#333'
//                                 }}>
//                                     {selectedUser.name}
//                                 </h4>
//                                 <p style={{ 
//                                     margin: '0',
//                                     color: '#666',
//                                     fontSize: '14px'
//                                 }}>
//                                     {selectedUser.email}
//                                 </p>
//                             </div>
//                         </div>

//                         <div style={{ 
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             backgroundColor: '#f8f9fa',
//                             borderRadius: '8px',
//                             padding: '15px'
//                         }}>
//                             <div style={{ textAlign: 'center' }}>
//                                 <div style={{ 
//                                     fontSize: '12px',
//                                     color: '#999',
//                                     marginBottom: '5px'
//                                 }}>
//                                     Total Transactions
//                                 </div>
//                                 <div style={{ 
//                                     fontSize: '18px',
//                                     fontWeight: '600',
//                                     color: '#6a11cb'
//                                 }}>
//                                     {filteredTransactions.length}
//                                 </div>
//                             </div>

//                             <div style={{ textAlign: 'center' }}>
//                                 <div style={{ 
//                                     fontSize: '12px',
//                                     color: '#999',
//                                     marginBottom: '5px'
//                                 }}>
//                                     Last Transaction
//                                 </div>
//                                 <div style={{ 
//                                     fontSize: '14px',
//                                     fontWeight: '500',
//                                     color: '#666'
//                                 }}>
//                                     {filteredTransactions.length > 0 ? 
//                                         format(new Date(filteredTransactions[0].date), 'MMM d, yyyy') : 
//                                         'N/A'}
//                                 </div>
//                             </div>

//                             <div style={{ textAlign: 'center' }}>
//                                 <div style={{ 
//                                     fontSize: '12px',
//                                     color: '#999',
//                                     marginBottom: '5px'
//                                 }}>
//                                     Net Amount
//                                 </div>
//                                 <div style={{ 
//                                     fontSize: '18px',
//                                     fontWeight: '600',
//                                     color: filteredTransactions.reduce((sum, tx) => 
//                                         sum + (tx.type === 'received' ? tx.amount : -tx.amount), 0) > 0 ? 
//                                         '#2ecc71' : '#e74c3c'
//                                 }}>
//                                     {filteredTransactions.reduce((sum, tx) => 
//                                         sum + (tx.type === 'received' ? tx.amount : -tx.amount), 0) > 0 ? '+' : ''}
//                                     ₹{Math.abs(filteredTransactions.reduce((sum, tx) => 
//                                         sum + (tx.type === 'received' ? tx.amount : -tx.amount), 0)).toLocaleString()}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <div style={{ 
//                     padding: '20px',
//                     maxHeight: 'calc(80vh - 200px)',
//                     overflowY: 'auto'
//                 }}>
//                     {filteredTransactions.length === 0 ? (
//                         <p style={{ 
//                             textAlign: 'center', 
//                             color: '#999',
//                             padding: '20px 0'
//                         }}>
//                             No transactions found with this user
//                         </p>
//                     ) : (
//                         filteredTransactions.map((tx) => (
//                             <div 
//                                 key={tx._id}
//                                 style={{
//                                     marginBottom: '15px',
//                                     padding: '15px',
//                                     borderRadius: '8px',
//                                     backgroundColor: tx.type === 'received' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
//                                     borderLeft: `4px solid ${tx.type === 'received' ? '#2ecc71' : '#e74c3c'}`
//                                 }}
//                             >
//                                 <div style={{ 
//                                     display: 'flex',
//                                     justifyContent: 'space-between',
//                                     alignItems: 'center',
//                                     marginBottom: '8px'
//                                 }}>
//                                     <div style={{ 
//                                         fontWeight: '600',
//                                         color: tx.type === 'received' ? '#2ecc71' : '#e74c3c'
//                                     }}>
//                                         {tx.type === 'received' ? 'Received' : 'Sent'}
//                                     </div>
//                                     <div style={{ 
//                                         fontWeight: '600',
//                                         color: tx.type === 'received' ? '#2ecc71' : '#e74c3c'
//                                     }}>
//                                         {tx.type === 'received' ? '+' : '-'}₹{tx.amount.toLocaleString()}
//                                     </div>
//                                 </div>

//                                 <div style={{ 
//                                     fontSize: '13px',
//                                     color: '#666',
//                                     marginBottom: '8px'
//                                 }}>
//                                     {format(new Date(tx.date), 'MMM d, yyyy h:mm a', { locale: enUS })}
//                                 </div>

//                                 {tx.description && (
//                                     <div style={{ 
//                                         fontSize: '14px',
//                                         color: '#555',
//                                         marginBottom: '8px'
//                                     }}>
//                                         {tx.description}
//                                     </div>
//                                 )}

//                                 <div style={{ 
//                                     fontSize: '12px',
//                                     color: '#999'
//                                 }}>
//                                     <strong>Transaction ID:</strong> {tx.transactionId || tx._id}
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </Modal>

//             {/* Withdraw/Credit Modal */}
//             <Modal
//                 isOpen={actionModalIsOpen}
//                 onRequestClose={() => setActionModalIsOpen(false)}
//                 style={modalStyles}
//                 contentLabel="Action Modal"
//             >
//                 {actionType && (
//                     <ActionForm 
//                         type={actionType} 
//                         onClose={() => setActionModalIsOpen(false)}
//                         fetchBalance={fetchBalance}
//                         fetchHistory={fetchHistory}
//                     />
//                 )}
//             </Modal>
//             <OtpModal />
//         </div>
//     );
// };

// export default Transaction;



import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    FaCheckCircle,
    FaMoneyBillWave,
    FaExchangeAlt,
    FaHistory,
    FaTimes,
    FaUser,
    FaArrowUp,
    FaArrowDown,
    FaPlus,
    FaMinus,
    FaSearch
} from "react-icons/fa";
import Modal from 'react-modal';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import TransactionAnalytics from "./TransactionVisualization";
import './Transaction.css';

Modal.setAppElement('#root');

const Transaction = () => {
    const [balance, setBalance] = useState(0);
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [receiverId, setReceiverId] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState({ text: "", isError: false });
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [groupedTransactions, setGroupedTransactions] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [actionModalIsOpen, setActionModalIsOpen] = useState(false);
    const [actionType, setActionType] = useState('');

    // OTP state
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [otpType, setOtpType] = useState("");
    const [otpValue, setOtpValue] = useState("");
    const [otpServer, setOtpServer] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [otpError, setOtpError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
        fetchBalance();
        fetchUsers();
        fetchHistory();
    }, []);

    const fetchBalance = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/transactions/balance", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBalance(res.data.balance);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/transactions/history", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransactions(res.data);
            groupTransactionsByUser(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const groupTransactionsByUser = (txns) => {
        const userMap = new Map();

        txns.forEach(tx => {
            if (tx.type === "withdraw" || tx.type === "credit") return;

            const otherUser = tx.type === "received" ? tx.sender : tx.receiver;
            const userId = otherUser._id;

            if (!userMap.has(userId)) {
                userMap.set(userId, {
                    user: otherUser,
                    transactions: [],
                    totalAmount: 0,
                    lastInteraction: new Date(tx.date)
                });
            }

            const userGroup = userMap.get(userId);
            userGroup.transactions.push(tx);
            userGroup.totalAmount += tx.type === "received" ? tx.amount : -tx.amount;

            if (new Date(tx.date) > new Date(userGroup.lastInteraction)) {
                userGroup.lastInteraction = tx.date;
            }
        });

        const grouped = Array.from(userMap.values()).sort((a, b) =>
            new Date(b.lastInteraction) - new Date(a.lastInteraction)
        );

        setGroupedTransactions(grouped);
    };

    // OTP-protected send money
    const handleSendMoney = async (e) => {
        e.preventDefault();
        if (!receiverId || !amount) {
            setMessage({ text: "Please select a receiver and enter an amount", isError: true });
            return;
        }
        setPendingAction({
            type: 'sendMoney',
            data: { receiverId, amount: Number(amount), description }
        });
        await requestOtp('sendMoney');
    };

    // OTP request helper
    const requestOtp = async (type) => {
        setOtpType(type);
        setOtpModalOpen(true);
        setOtpValue("");
        setOtpVerified(false);
        setOtpError("");
        try {
            const res = await axios.post("http://localhost:8000/api/transactions/otp/request", { type }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOtpServer(res.data.otp);
        } catch (err) {
            setOtpError("Failed to send OTP");
        }
    };

    // OTP verify helper
    const verifyOtp = async () => {
        setOtpError("");
        try {
            await axios.post("http://localhost:8000/api/transactions/otp/verify", { type: otpType, otp: otpValue }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOtpVerified(true);
            setOtpModalOpen(false);

            // Execute the pending action after OTP verification
            if (pendingAction) {
                if (pendingAction.type === 'sendMoney') {
                    await doSendMoney(pendingAction.data);
                } else if (pendingAction.type === 'withdraw') {
                    await doWithdraw(pendingAction.data);
                } else if (pendingAction.type === 'credit') {
                    await doCredit(pendingAction.data);
                }
                setPendingAction(null);
            }
        } catch (err) {
            setOtpError("Invalid or expired OTP");
        }
    };

    // Actual send money after OTP
    const doSendMoney = async ({ receiverId, amount, description }) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/transactions/send",
                { receiverId, amount, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReceiverId("");
            setAmount("");
            setDescription("");
            fetchBalance();
            fetchHistory();
            setMessage({ text: "Money sent successfully!", isError: false });
        } catch (err) {
            setMessage({
                text: err.response?.data?.error || "Error sending money",
                isError: true
            });
        }
    };

    // Actual withdraw after OTP
    const doWithdraw = async ({ amount, description }) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/transactions/withdraw",
                { amount, description, otpValue },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage({ text: res.data.message, isError: false });
            fetchBalance();
            fetchHistory();
            setActionModalIsOpen(false);
        } catch (err) {
            setMessage({ text: err.response?.data?.error || "Withdraw failed", isError: true });
        }
    };

    // Actual credit after OTP
    const doCredit = async ({ amount, description }) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/transactions/credit",
                { amount, description, otpValue },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage({ text: res.data.message, isError: false });
            fetchBalance();
            fetchHistory();
            setActionModalIsOpen(false);
        } catch (err) {
            setMessage({ text: err.response?.data?.error || "Credit failed", isError: true });
        }
    };

    const viewUserTransactions = (userGroup) => {
        setFilteredTransactions(userGroup.transactions);
        setSelectedUser(userGroup.user);
        setModalIsOpen(true);
    };

    const openActionModal = (type) => {
        setActionType(type);
        setActionModalIsOpen(true);
    };

    const filteredHistory = transactions.filter(tx => {
        if (activeTab === 'all') return true;
        if (activeTab === 'sent') return tx.type === 'sent';
        if (activeTab === 'received') return tx.type === 'received';
        if (activeTab === 'actions') return tx.type === 'withdraw' || tx.type === 'credit';
        return true;
    }).filter(tx => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        if (tx.type === 'sent' || tx.type === 'received') {
            const otherUser = tx.type === 'received' ? tx.sender : tx.receiver;
            return (
                otherUser.name.toLowerCase().includes(searchLower) ||
                otherUser.email.toLowerCase().includes(searchLower) ||
                tx.amount.toString().includes(searchTerm) ||
                tx.description?.toLowerCase().includes(searchLower));
        } else {
            return (
                tx.amount.toString().includes(searchTerm) ||
                tx.description?.toLowerCase().includes(searchLower) ||
                tx.type.toLowerCase().includes(searchLower));
        }
    });

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            borderRadius: '12px',
            padding: '0',
            overflow: 'hidden',
            border: 'none',
            boxShadow: '0 5px 30px rgba(0,0,0,0.3)',
            backgroundColor: '#ffffff'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        }
    };

    // ActionForm component for withdraw/credit
    const ActionForm = ({ type, onClose }) => {
        const [localAmount, setLocalAmount] = useState("");
        const [localDescription, setLocalDescription] = useState("");
        const [localMessage, setLocalMessage] = useState("");

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!localAmount) {
                setLocalMessage("Please enter an amount");
                return;
            }
            setPendingAction({
                type,
                data: { amount: Number(localAmount), description: localDescription }
            });
            await requestOtp(type);
        };

        return (
            <div className="action-form">
                <h3 className={`action-form-title ${type}`}>
                    {type === 'withdraw' ? (
                        <><FaMinus /> Withdraw Money</>
                    ) : (
                        <><FaPlus /> Credit Money</>
                    )}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Amount (₹)</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={localAmount}
                            onChange={(e) => setLocalAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <input
                            type="text"
                            placeholder="Enter description"
                            value={localDescription}
                            onChange={(e) => setLocalDescription(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`action-button ${type}`}
                    >
                        {type === 'withdraw' ? 'Withdraw' : 'Credit'}
                    </button>
                    {localMessage && (
                        <div className={`message ${localMessage.includes('successful') ? 'success' : 'error'}`}>
                            {localMessage}
                        </div>
                    )}
                </form>
            </div>
        );
    };

    // OTP Modal
    const OtpModal = () => (
        <Modal
            isOpen={otpModalOpen}
            onRequestClose={() => {
                setOtpModalOpen(false);
                setOtpValue("");
                setOtpError("");
            }}
            style={modalStyles}
            contentLabel="OTP Verification"
        >
            <div className="otp-modal">
                <h3>Enter OTP</h3>
                <p>An OTP has been sent to your registered contact.</p>
                <input
                    type="tel"
                    value={otpValue}
                    onChange={e => setOtpValue(e.target.value.replace(/\D/g, ""))} // Only digits
                    placeholder="Enter OTP"
                    className="otp-input"
                    maxLength={6}
                    autoFocus
                    style={{width:"90%"}}
                />
                {otpServer && (
                    <div className="demo-otp">Demo OTP: <b>{otpServer}</b></div>
                )}
                {otpError && (
                    <div className="otp-error">{otpError}</div>
                )}
                <button
                    onClick={verifyOtp}
                    className="verify-button"
                >
                    Verify OTP
                </button>
                <button
                    onClick={() => {
                        setOtpModalOpen(false);
                        setOtpValue("");
                        setOtpError("");
                    }}
                    className="cancel-button"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );

    return (
        <div className="transaction-container">
            {/* Balance Card */}
            <div className="balance-card" data-aos="fade-down">
                <div className="balance-bubble top"></div>
                <div className="balance-bubble bottom"></div>

                <div className="balance-content">
                    <div>
                        <h3>
                            <FaMoneyBillWave />
                            Current Balance
                        </h3>
                        <h1>₹{balance.toLocaleString()}</h1>
                    </div>

                    {/* <div className="balance-actions">
                        <button 
                            onClick={() => openActionModal('credit')}
                            className="balance-action-btn"
                        >
                            <FaPlus />
                            Credit
                        </button>
                        <button 
                            onClick={() => openActionModal('withdraw')}
                            className="balance-action-btn"
                        >
                            <FaMinus />
                            Withdraw
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Send Money Section */}
            <div className="send-money-section" data-aos="fade-up">
                <h3>
                    <FaExchangeAlt />
                    Send Money
                </h3>

                {message.text && (
                    <div className={`message ${message.isError ? 'error' : 'success'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSendMoney}>
                    <div className="form-group">
                        <label>Select Receiver</label>
                        <select
                            value={receiverId}
                            onChange={(e) => setReceiverId(e.target.value)}
                            required
                        >
                            <option value="">Select a user</option>
                            {users
                                .filter(u => u.role !== 'admin' && u._id !== JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id)
                                .map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Amount (₹)</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="send-money-btn">
                        <FaExchangeAlt />
                        Send Money
                    </button>
                </form>
            </div>

            {/* Transaction History Section */}
            <div className="transaction-history" data-aos="fade-up">
                <div className="history-header">
                    <h3>
                        <FaHistory />
                        Transaction History
                    </h3>

                    <div className="history-controls">
                        <div className="search-container">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="tab-buttons">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={activeTab === 'all' ? 'active' : ''}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveTab('sent')}
                                className={activeTab === 'sent' ? 'active' : ''}
                            >
                                Sent
                            </button>
                            <button
                                onClick={() => setActiveTab('received')}
                                className={activeTab === 'received' ? 'active' : ''}
                            >
                                Received
                            </button>
                            <button
                                onClick={() => setActiveTab('actions')}
                                className={activeTab === 'actions' ? 'active' : ''}
                            >
                                Actions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grouped Transactions (User Cards) */}
                {activeTab === 'all' && (
                    <div className="grouped-transactions">
                        <h4>
                            <FaUser />
                            Recent Contacts
                        </h4>

                        {groupedTransactions.length === 0 ? (
                            <p className="no-data">No recent transactions with other users</p>
                        ) : (
                            <div className="user-cards">
                                {groupedTransactions.map((group) => (
                                    <div
                                        key={group.user._id}
                                        onClick={() => viewUserTransactions(group)}
                                        className="user-card"
                                    >
                                        <div className="user-info">
                                            <div className="user-avatar">
                                                {!group.user.profilePic ?
                                                    group.user.name.charAt(0).toUpperCase() :
                                                    <img src={`http://localhost:8000/uploads/${group.user.profilePic}`} alt={group.user.name} />
                                                }
                                            </div>
                                            <div>
                                                <h4>{group.user.name}</h4>
                                                <p>{group.user.email}</p>
                                            </div>
                                        </div>

                                        <div className="user-transaction-info">
                                            <div>
                                                <p>Last transaction</p>
                                                <p>{format(new Date(group.lastInteraction), 'MMM d, yyyy h:mm a')}</p>
                                            </div>

                                            <div className={`amount ${group.totalAmount > 0 ? 'positive' : 'negative'}`}>
                                                {group.totalAmount > 0 ? '+' : ''}
                                                ₹{Math.abs(group.totalAmount).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Transaction List */}
                <div className="transaction-list">
                    {filteredHistory.length === 0 ? (
                        <p className="no-data">No transactions found</p>
                    ) : (
                        <div className="transaction-items">
                            {filteredHistory.map((tx) => {
                                const isReceived = tx.type === 'received';
                                const isSent = tx.type === 'sent';
                                const isWithdraw = tx.type === 'withdraw';
                                const isCredit = tx.type === 'credit';

                                const otherUser = isReceived ? tx.sender : isSent ? tx.receiver : null;

                                return (
                                    <div
                                        key={tx._id}
                                        className={`transaction-item ${tx.type}`}
                                    >
                                        <div className="transaction-header">
                                            <div className="transaction-user">
                                                {otherUser && (
                                                    <div className="user-avatar small">
                                                        {!otherUser.profilePic ?
                                                            otherUser.name.charAt(0).toUpperCase() :
                                                            <img src={`http://localhost:8000/uploads/${otherUser.profilePic}`} alt={otherUser.name} />
                                                        }
                                                    </div>
                                                )}

                                                <div>
                                                    <h4>
                                                        {isReceived && `Received from ${otherUser?.name}`}
                                                        {isSent && `Sent to ${otherUser?.name}`}
                                                        {isWithdraw && 'Withdrawn money'}
                                                        {isCredit && 'Credited money'}
                                                    </h4>
                                                    <p>{format(new Date(tx.date), 'MMM d, yyyy h:mm a', { locale: enUS })}</p>
                                                </div>
                                            </div>

                                            <div className={`transaction-amount ${isReceived || isCredit ? 'positive' : 'negative'}`}>
                                                {(isReceived || isCredit) ? '+' : '-'}
                                                ₹{tx.amount.toLocaleString()}
                                            </div>
                                        </div>

                                        {tx.description && (
                                            <p className="transaction-description">
                                                {tx.description}
                                            </p>
                                        )}

                                        <div className="transaction-footer">
                                            <small>
                                                <strong>Transaction ID:</strong> {tx.transactionId || tx._id}
                                            </small>

                                            {otherUser && (
                                                <button
                                                    onClick={() => viewUserTransactions({
                                                        user: otherUser,
                                                        transactions: transactions.filter(t =>
                                                            (t.sender?._id === otherUser._id && t.type === 'received') ||
                                                            (t.receiver?._id === otherUser._id && t.type === 'sent')
                                                        )
                                                    })}
                                                    className="view-all-btn"
                                                >
                                                    View all transactions
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* User Transactions Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyles}
                contentLabel="User Transactions"
            >
                <div className="modal-header">
                    <h3>Transaction History</h3>
                    <button
                        className="close-modal-btn"
                        onClick={() => setModalIsOpen(false)}
                    >
                        <FaTimes />
                    </button>
                </div>

                {selectedUser && (
                    <div className="user-details">
                        <div className="user-profile">
                            <div className="user-avatar large">
                                {!selectedUser.profilePic ?
                                    selectedUser.name.charAt(0).toUpperCase() :
                                    <img src={`http://localhost:8000/uploads/${selectedUser.profilePic}`} alt={selectedUser.name} />
                                }
                            </div>
                            <div>
                                <h4>{selectedUser.name}</h4>
                                <p>{selectedUser.email}</p>
                            </div>
                        </div>

                        <div className="user-stats">
                            <div>
                                <div>Total Transactions</div>
                                <div>{filteredTransactions.length}</div>
                            </div>

                            <div>
                                <div>Last Transaction</div>
                                <div>
                                    {filteredTransactions.length > 0 ?
                                        format(new Date(filteredTransactions[0].date), 'MMM d, yyyy') :
                                        'N/A'}
                                </div>
                            </div>

                            <div>
                                <div>Net Amount</div>
                                <div className={`amount ${filteredTransactions.reduce((sum, tx) =>
                                    sum + (tx.type === 'received' ? tx.amount : -tx.amount), 0) > 0 ?
                                    'positive' : 'negative'}`}>
                                    {filteredTransactions.reduce((sum, tx) =>
                                        sum + (tx.type === 'received' ? tx.amount : -tx.amount), 0) > 0 ? '+' : ''}
                                    ₹{Math.abs(filteredTransactions.reduce((sum, tx) =>
                                        sum + (tx.type === 'received' ? tx.amount : -tx.amount), 0)).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="modal-transactions">
                    {filteredTransactions.length === 0 ? (
                        <p className="no-data">No transactions found with this user</p>
                    ) : (
                        filteredTransactions.map((tx) => (
                            <div
                                key={tx._id}
                                className={`transaction-detail ${tx.type}`}
                            >
                                <div className="detail-header">
                                    <div className={`type ${tx.type}`}>
                                        {tx.type === 'received' ? 'Received' : 'Sent'}
                                    </div>
                                    <div className={`amount ${tx.type}`}>
                                        {tx.type === 'received' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                    </div>
                                </div>

                                <div className="detail-date">
                                    {format(new Date(tx.date), 'MMM d, yyyy h:mm a', { locale: enUS })}
                                </div>

                                {tx.description && (
                                    <div className="detail-description">
                                        {tx.description}
                                    </div>
                                )}

                                <div className="detail-id">
                                    <strong>Transaction ID:</strong> {tx.transactionId || tx._id}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Modal>

            {/* Withdraw/Credit Modal */}
            <Modal
                isOpen={actionModalIsOpen}
                onRequestClose={() => setActionModalIsOpen(false)}
                style={modalStyles}
                contentLabel="Action Modal"
            >
                {actionType && (
                    <ActionForm
                        type={actionType}
                        onClose={() => setActionModalIsOpen(false)}
                    />
                )}
            </Modal>

            <OtpModal />
        </div>
    );
};

export default Transaction;