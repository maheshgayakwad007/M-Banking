// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Modal,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Chip,
//   CircularProgress,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import PeopleIcon from "@mui/icons-material/People";
// import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import BlockIcon from "@mui/icons-material/Block";
// import SecurityIcon from "@mui/icons-material/Security";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import AddIcon from "@mui/icons-material/Add";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import { keyframes } from "@emotion/react";

// // Animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;
// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// // Card styles
// const cardStyle = {
//   minWidth: 220,
//   cursor: "pointer",
//   transition: "all 0.3s ease",
//   animation: `${fadeIn} 0.5s ease forwards`,
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
//     animation: `${pulse} 0.5s ease`,
//   },
// };

// // Modal style
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%",
//   maxWidth: 800,
//   maxHeight: "80vh",
//   overflow: "auto",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 3,
//   animation: `${fadeIn} 0.3s ease forwards`,
// };

// // Dashboard Cards Config (with modalType mapping)
// const statCards = [
//   { key: "totalUsers", label: "Total Users", icon: <PeopleIcon />, color: "#1976d2", modalType: "users" },
//   { key: "totalTransactions", label: "Total Transactions", icon: <SwapHorizIcon />, color: "#2e7d32", modalType: "transactions" },
//   { key: "totalBalance", label: "Total Balance", icon: <AccountBalanceIcon />, color: "#ed6c02", modalType: "balance" },
//   { key: "bannedUsers", label: "Banned Users", icon: <BlockIcon />, color: "#d32f2f", modalType: "banned" },
//   { key: "admins", label: "Admins", icon: <SecurityIcon />, color: "#9c27b0", modalType: "admins" },
//   { key: "totalWithdrawn", label: "Total Withdrawn", icon: <AccountBalanceWalletIcon />, color: "#f57c00", modalType: "withdraw" },
//   { key: "totalCredited", label: "Total Credited", icon: <AddIcon />, color: "#7b1fa2", modalType: "credit" },
// ];

// // Custom chart components
// const BarChart = ({ data, labels, colors, height = 250 }) => {
//   const maxValue = Math.max(...data.map(item => item.value));
  
//   return (
//     <div style={{ 
//       display: 'flex', 
//       alignItems: 'flex-end', 
//       height, 
//       gap: '12px', 
//       padding: '20px 10px',
//       justifyContent: 'center'
//     }}>
//       {data.map((item, index) => (
//         <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <div style={{ 
//             width: '40px', 
//             height: `${(item.value / maxValue) * 85}%`, 
//             backgroundColor: colors[index % colors.length],
//             borderRadius: '6px 6px 0 0',
//             position: 'relative',
//             transition: 'height 0.5s ease'
//           }}>
//             <span style={{
//               position: 'absolute',
//               top: '-25px',
//               left: '50%',
//               transform: 'translateX(-50%)',
//               fontSize: '12px',
//               fontWeight: 'bold'
//             }}>
//               {item.value.toLocaleString()}
//             </span>
//           </div>
//           <div style={{ 
//             marginTop: '8px', 
//             fontSize: '12px', 
//             textAlign: 'center',
//             fontWeight: 'bold',
//             maxWidth: '70px',
//             color: '#555'
//           }}>
//             {item.name}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const PieChart = ({ data, colors, size = 200 }) => {
//   const total = data.reduce((sum, item) => sum + item.value, 0);
//   let accumulatedPercentage = 0;
  
//   return (
//     <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
//       <svg width={size} height={size} viewBox="0 0 100 100">
//         {data.map((item, index) => {
//           const percentage = (item.value / total) * 100;
//           const dashArray = `${percentage} ${100 - percentage}`;
//           const dashOffset = -accumulatedPercentage;
//           accumulatedPercentage += percentage;
          
//           return (
//             <circle
//               key={index}
//               cx="50"
//               cy="50"
//               r="45"
//               fill="none"
//               stroke={colors[index % colors.length]}
//               strokeWidth="10"
//               strokeDasharray={dashArray}
//               strokeDashoffset={dashOffset}
//               transform="rotate(-90 50 50)"
//             />
//           );
//         })}
//       </svg>
      
//       <div style={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         textAlign: 'center',
//         fontSize: '14px',
//         fontWeight: 'bold',
//         color: '#333'
//       }}>
//         Total
//         <div style={{ fontSize: '16px' }}>{total.toLocaleString()}</div>
//       </div>
      
//       <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
//         {data.map((item, index) => (
//           <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
//             <div style={{
//               width: '12px',
//               height: '12px',
//               backgroundColor: colors[index % colors.length],
//               marginRight: '5px',
//               borderRadius: '2px'
//             }}></div>
//             {item.name} ({Math.round((item.value / total) * 100)}%)
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTransactions: 0,
//     totalBalance: 0,
//     bannedUsers: 0,
//     admins: 0,
//     totalWithdrawn: 0,
//     totalCredited: 0,
//   });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [modalData, setModalData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [tabValue, setTabValue] = useState(0);

//   useEffect(() => {
//     fetchStats();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // Fetch Stats
//   const fetchStats = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Session expired. Please login again.");
//       window.location.href = "/login";
//       return;
//     }

//     setLoading(true);
//     try {
//       const usersRes = await axios.get("http://localhost:8000/api/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const txRes = await axios.get("http://localhost:8000/api/transactions/history", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const transactions = txRes.data;

//       setStats({
//         totalUsers: usersRes.data.length,
//         totalTransactions: transactions.length,
//         totalBalance: usersRes.data.reduce((sum, u) => sum + (u.balance || 0), 0),
//         bannedUsers: usersRes.data.filter((u) => u.isBanned).length,
//         admins: usersRes.data.filter((u) => u.role === "admin").length,
//         totalWithdrawn: transactions.filter((tx) => tx.type === "withdraw").reduce((s, tx) => s + (tx.amount || 0), 0),
//         totalCredited: transactions.filter((tx) => tx.type === "credit").reduce((s, tx) => s + (tx.amount || 0), 0),
//       });
//     } catch (err) {
//       alert("Session expired or unauthorized. Please login again.");
//       window.location.href = "/login";
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Refresh Buttonā
//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchStats();
//   };

//   // Tab Change Handler
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   // Open Modal with Proper Type
//   const handleOpenModal = async (type) => {
//     setModalType(type);
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Session expired. Please login again.");
//       window.location.href = "/login";
//       return;
//     }

//     let data = [];
//     try {
//       if (["users", "banned", "admins", "balance"].includes(type)) {
//         const res = await axios.get("http://localhost:8000/api/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
        
//         if (type === "users") data = res.data;
//         else if (type === "banned") data = res.data.filter((u) => u.isBanned);
//         else if (type === "admins") data = res.data.filter((u) => u.role === "admin");
//         else if (type === "balance") data = res.data.sort((a, b) => (b.balance || 0) - (a.balance || 0));
//       } else {
//         const res = await axios.get("http://localhost:8000/api/transactions/history", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (type === "transactions") data = res.data;
//         else data = res.data.filter((tx) => tx.type === type);
//       }

//       setModalData(data);
//       setModalOpen(true);
//     } catch (err) {
//       alert("Session expired or unauthorized. Please login again.");
//       window.location.href = "/login";
//     }
//   };

//   const handleCloseModal = () => setModalOpen(false);

//   // Modal Titles
//   const getModalTitle = () => {
//     const titles = {
//       users: "All Users",
//       transactions: "All Transactions",
//       banned: "Banned Users",
//       admins: "Admin Users",
//       balance: "User Balances (Highest to Lowest)",
//       withdraw: "Withdrawn Transactions",
//       credit: "Credited Transactions",
//     };
//     return titles[modalType] || "Details";
//   };

//   // Currency Formatter
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2,
//     }).format(amount);
//   };

//   // Prepare data for charts
//   const financialChartData = [
//     { name: "Balance", value: stats.totalBalance },
//     { name: "Withdrawn", value: stats.totalWithdrawn },
//     { name: "Credited", value: stats.totalCredited },
//   ];

//   const userDistributionData = [
//     { name: "Regular Users", value: stats.totalUsers - stats.bannedUsers - stats.admins },
//     { name: "Banned Users", value: stats.bannedUsers },
//     { name: "Admins", value: stats.admins },
//   ];

//   const financialColors = ["#1976d2", "#2e7d32", "#ed6c02"];
//   const userColors = ["#1976d2", "#d32f2f", "#9c27b0"];

//   // Loader
//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", flexDirection: "column", gap: 2 }}>
//         <CircularProgress size={60} />
//         <Typography variant="h6" color="textSecondary">
//           Loading dashboard data...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 4 }}>
//       {/* Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//           Admin Dashboard
//         </Typography>
//         <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh} disabled={refreshing}>
//           {refreshing ? "Refreshing..." : "Refresh Data"}
//         </Button>
//       </Box>

//       {/* Tabs for different sections */}
//       <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
//         <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
//           <Tab label="Overview" />
//           <Tab label="User Management" />
//           <Tab label="Financial Summary" />
//         </Tabs>
//       </Box>

//       {/* Stat Cards - conditionally rendered based on tab */}
//       <Grid container spacing={3}>
//         {tabValue === 0 && statCards.map((card, index) => (
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             key={card.key}
//             sx={{ animation: `${fadeIn} 0.5s ease ${index * 0.1}s forwards` }}
//           >
//             <Card
//               style={cardStyle}
//               onClick={() => handleOpenModal(card.modalType)}
//               sx={{
//                 borderLeft: `4px solid ${card.color}`,
//                 "&:hover": { borderLeft: `4px solid ${card.color}` },
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                   <Box sx={{ color: card.color, mr: 1 }}>{card.icon}</Box>
//                   <Typography variant="h6" color="textSecondary">
//                     {card.label}
//                   </Typography>
//                 </Box>
//                 <Typography variant="h4" sx={{ fontWeight: "bold", color: card.color }}>
//                   {["totalBalance", "totalWithdrawn", "totalCredited"].includes(card.key) 
//                     ? formatCurrency(stats[card.key]) 
//                     : stats[card.key]}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
        
//         {tabValue === 1 && (
//           <>
//             {statCards.filter(card => ["totalUsers", "bannedUsers", "admins"].includes(card.key))
//               .map((card, index) => (
//               <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 md={4}
//                 key={card.key}
//                 sx={{ animation: `${fadeIn} 0.5s ease ${index * 0.1}s forwards` }}
//               >
//                 <Card
//                   style={cardStyle}
//                   onClick={() => handleOpenModal(card.modalType)}
//                   sx={{
//                     borderLeft: `4px solid ${card.color}`,
//                     "&:hover": { borderLeft: `4px solid ${card.color}` },
//                   }}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                       <Box sx={{ color: card.color, mr: 1 }}>{card.icon}</Box>
//                       <Typography variant="h6" color="textSecondary">
//                         {card.label}
//                       </Typography>
//                     </Box>
//                     <Typography variant="h4" sx={{ fontWeight: "bold", color: card.color }}>
//                       {stats[card.key]}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </>
//         )}
        
//         {tabValue === 2 && (
//           <>
//             {statCards.filter(card => ["totalBalance", "totalWithdrawn", "totalCredited", "totalTransactions"].includes(card.key))
//               .map((card, index) => (
//               <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 md={4}
//                 key={card.key}
//                 sx={{ animation: `${fadeIn} 0.5s ease ${index * 0.1}s forwards` }}
//               >
//                 <Card
//                   style={cardStyle}
//                   onClick={() => handleOpenModal(card.modalType)}
//                   sx={{
//                     borderLeft: `4px solid ${card.color}`,
//                     "&:hover": { borderLeft: `4px solid ${card.color}` },
//                   }}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                       <Box sx={{ color: card.color, mr: 1 }}>{card.icon}</Box>
//                       <Typography variant="h6" color="textSecondary">
//                         {card.label}
//                       </Typography>
//                     </Box>
//                     <Typography variant="h4" sx={{ fontWeight: "bold", color: card.color }}>
//                       {["totalBalance", "totalWithdrawn", "totalCredited"].includes(card.key) 
//                         ? formatCurrency(stats[card.key]) 
//                         : stats[card.key]}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </>
//         )}
//       </Grid>

    
      
//       {/* Modal */}
//       <Modal 
//         open={modalOpen} 
//         onClose={handleCloseModal} 
//         closeAfterTransition
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backdropFilter: 'blur(3px)',
//         }}
//       >
//         <Box 
//           sx={{
//             position: 'relative',
//             width: '80%',
//             maxWidth: 800,
//             maxHeight: '80vh',
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             borderRadius: 2,
//             p: 3,
//             overflow: 'auto',
//             animation: `${fadeIn} 0.3s ease forwards`,
//           }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//               {getModalTitle()} ({modalData.length})
//             </Typography>
//             <IconButton onClick={handleCloseModal} sx={{ color: "text.secondary" }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Modal List */}
//           <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
//             {modalData.length === 0 ? (
//               <Typography variant="body1" sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
//                 No data available
//               </Typography>
//             ) : (
//               modalData.map((item) => (
//                 <ListItem
//                   key={item._id || item.transactionId}
//                   sx={{
//                     border: "1px solid #f0f0f0",
//                     borderRadius: 1,
//                     mb: 1,
//                     transition: "all 0.2s",
//                     "&:hover": { backgroundColor: "#f9f9f9" },
//                   }}
//                 >
//                   {["users", "banned", "admins", "balance"].includes(modalType) ? (
//                     <ListItemText
//                       primary={
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                             {item.name}
//                           </Typography>
//                           {item.isBanned && <Chip label="Banned" color="error" size="small" />}
//                           {item.role === "admin" && <Chip label="Admin" color="primary" size="small" />}
//                         </Box>
//                       }
//                       secondary={
//                         <Box sx={{ mt: 0.5 }}>
//                           <Typography variant="body2" color="textSecondary">
//                             Email: {item.email}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             Balance: {formatCurrency(item.balance || 0)}
//                           </Typography>
//                           {item.accountNumber && (
//                             <Typography variant="body2" color="textSecondary">
//                               Account: {item.accountNumber}
//                             </Typography>
//                           )}
//                         </Box>
//                       }
//                     />
//                   ) : (
//                     <ListItemText
//                       primary={
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                           <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                             {formatCurrency(item.amount)}
//                           </Typography>
//                           <Chip
//                             label={item.type}
//                             color={
//                               item.type === "sent"
//                                 ? "error"
//                                 : item.type === "received"
//                                 ? "success"
//                                 : item.type === "withdraw"
//                                 ? "warning"
//                                 : "primary"
//                             }
//                             size="small"
//                           />
//                         </Box>
//                       }
//                       secondary={
//                         <Box sx={{ mt: 0.5 }}>
//                           <Typography variant="body2" color="textSecondary">
//                             ID: {item.transactionId}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             Sender: {item.sender?.name || item.sender?.email || item.sender?._id || "N/A"}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             Receiver: {item.receiver?.name || item.receiver?.email || item.receiver?._id || "N/A"}
//                           </Typography>
//                           {item.timestamp && (
//                             <Typography variant="caption" color="textSecondary">
//                               Date: {new Date(item.timestamp).toLocaleString()}
//                             </Typography>
//                           )}
//                         </Box>
//                       }
//                     />
//                   )}
//                 </ListItem>
//               ))
//             )}
//           </List>

//           {/* Close Button */}
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//             <Button onClick={handleCloseModal} variant="contained" startIcon={<CloseIcon />}>
//               Close
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BlockIcon from "@mui/icons-material/Block";
import SecurityIcon from "@mui/icons-material/Security";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { keyframes } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create custom theme with the new color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6127B7", // Purple
      light: "#8B5BD9",
      dark: "#451A8A",
    },
    secondary: {
      main: "#2C27B7", // Deep blue
      light: "#5A55D9",
      dark: "#1E1A8A",
    },
    background: {
      default: "#F8F6FF",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Card styles
const cardStyle = {
  minWidth: 220,
  cursor: "pointer",
  transition: "all 0.3s ease",
  animation: `${fadeIn} 0.5s ease forwards`,
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(97, 39, 183, 0.1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(97, 39, 183, 0.2)",
    animation: `${pulse} 0.5s ease`,
  },
};

// Dashboard Cards Config (with modalType mapping)
const statCards = [
  { key: "totalUsers", label: "Total Users", icon: <PeopleIcon />, color: "#6127B7", modalType: "users" },
  { key: "totalTransactions", label: "Total Transactions", icon: <SwapHorizIcon />, color: "#2C27B7", modalType: "transactions" },
  { key: "totalBalance", label: "Total Balance", icon: <AccountBalanceIcon />, color: "#7E3FDB", modalType: "balance" },
  { key: "bannedUsers", label: "Banned Users", icon: <BlockIcon />, color: "#D32F2F", modalType: "banned" },
  { key: "admins", label: "Admins", icon: <SecurityIcon />, color: "#9C27B0", modalType: "admins" },
  { key: "totalWithdrawn", label: "Total Withdrawn", icon: <AccountBalanceWalletIcon />, color: "#4A22B5", modalType: "withdraw" },
  { key: "totalCredited", label: "Total Credited", icon: <AddIcon />, color: "#5E35B1", modalType: "credit" },
];

// Custom chart components
const BarChart = ({ data, labels, colors, height = 250 }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'flex-end', 
      height, 
      gap: '12px', 
      padding: '20px 10px',
      justifyContent: 'center'
    }}>
      {data.map((item, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: `${(item.value / maxValue) * 85}%`, 
            background: `linear-gradient(to top, ${alpha(colors[index % colors.length], 0.7)}, ${colors[index % colors.length]})`,
            borderRadius: '6px 6px 0 0',
            position: 'relative',
            transition: 'height 0.5s ease'
          }}>
            <span style={{
              position: 'absolute',
              top: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#6127B7'
            }}>
              {item.value.toLocaleString()}
            </span>
          </div>
          <div style={{ 
            marginTop: '8px', 
            fontSize: '12px', 
            textAlign: 'center',
            fontWeight: 'bold',
            maxWidth: '70px',
            color: '#555'
          }}>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

const PieChart = ({ data, colors, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulatedPercentage = 0;
  
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const dashArray = `${percentage} ${100 - percentage}`;
          const dashOffset = -accumulatedPercentage;
          accumulatedPercentage += percentage;
          
          return (
            <circle
              key={index}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={colors[index % colors.length]}
              strokeWidth="10"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)"
            />
          );
        })}
      </svg>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#6127B7'
      }}>
        Total
        <div style={{ fontSize: '16px' }}>{total.toLocaleString()}</div>
      </div>
      
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: colors[index % colors.length],
              marginRight: '5px',
              borderRadius: '2px'
            }}></div>
            {item.name} ({Math.round((item.value / total) * 100)}%)
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalBalance: 0,
    bannedUsers: 0,
    admins: 0,
    totalWithdrawn: 0,
    totalCredited: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch Stats
  const fetchStats = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    try {
      const usersRes = await axios.get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const txRes = await axios.get("http://localhost:8000/api/transactions/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const transactions = txRes.data;

      setStats({
        totalUsers: usersRes.data.length,
        totalTransactions: transactions.length,
        totalBalance: usersRes.data.reduce((sum, u) => sum + (u.balance || 0), 0),
        bannedUsers: usersRes.data.filter((u) => u.isBanned).length,
        admins: usersRes.data.filter((u) => u.role === "admin").length,
        totalWithdrawn: transactions.filter((tx) => tx.type === "withdraw").reduce((s, tx) => s + (tx.amount || 0), 0),
        totalCredited: transactions.filter((tx) => tx.type === "credit").reduce((s, tx) => s + (tx.amount || 0), 0),
      });
    } catch (err) {
      alert("Session expired or unauthorized. Please login again.");
      window.location.href = "/login";
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Refresh Button
  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  // Tab Change Handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Open Modal with Proper Type
  const handleOpenModal = async (type) => {
    setModalType(type);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return;
    }

    let data = [];
    try {
      if (["users", "banned", "admins", "balance"].includes(type)) {
        const res = await axios.get("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (type === "users") data = res.data;
        else if (type === "banned") data = res.data.filter((u) => u.isBanned);
        else if (type === "admins") data = res.data.filter((u) => u.role === "admin");
        else if (type === "balance") data = res.data.sort((a, b) => (b.balance || 0) - (a.balance || 0));
      } else {
        const res = await axios.get("http://localhost:8000/api/transactions/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (type === "transactions") data = res.data;
        else data = res.data.filter((tx) => tx.type === type);
      }

      setModalData(data);
      setModalOpen(true);
    } catch (err) {
      alert("Session expired or unauthorized. Please login again.");
      window.location.href = "/login";
    }
  };

  const handleCloseModal = () => setModalOpen(false);

  // Modal Titles
  const getModalTitle = () => {
    const titles = {
      users: "All Users",
      transactions: "All Transactions",
      banned: "Banned Users",
      admins: "Admin Users",
      balance: "User Balances (Highest to Lowest)",
      withdraw: "Withdrawn Transactions",
      credit: "Credited Transactions",
    };
    return titles[modalType] || "Details";
  };

  // Currency Formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Prepare data for charts
  const financialChartData = [
    { name: "Balance", value: stats.totalBalance },
    { name: "Withdrawn", value: stats.totalWithdrawn },
    { name: "Credited", value: stats.totalCredited },
  ];

  const userDistributionData = [
    { name: "Regular Users", value: stats.totalUsers - stats.bannedUsers - stats.admins },
    { name: "Banned Users", value: stats.bannedUsers },
    { name: "Admins", value: stats.admins },
  ];

  const financialColors = ["#6127B7", "#2C27B7", "#7E3FDB"];
  const userColors = ["#6127B7", "#D32F2F", "#9C27B0"];

  // Loader
  if (loading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "50vh", 
        flexDirection: "column", 
        gap: 2,
        background: "linear-gradient(135deg, #F8F6FF 0%, #F0EBFF 100%)"
      }}>
        <CircularProgress size={60} sx={{ color: "#6127B7" }} />
        <Typography variant="h6" color="#6127B7">
          Loading dashboard data...
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        p: 4, 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #F8F6FF 0%, #F0EBFF 100%)" 
      }}>
        {/* Header */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, 
            borderRadius: 3,
            mb: 4,
            animation: `${gradientShift} 10s ease infinite`,
            backgroundSize: "200% 200%"
          }}
        >
          <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}>
              Admin Dashboard
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<RefreshIcon />} 
              onClick={handleRefresh} 
              disabled={refreshing}
              sx={{ 
                backgroundColor: "white", 
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.9),
                }
              }}
            >
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </Toolbar>
        </AppBar>

        {/* Tabs for different sections */}
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mb: 3,
          backgroundColor: "white",
          borderRadius: 3,
          px: 2,
          boxShadow: "0 4px 12px rgba(97, 39, 183, 0.1)"
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="dashboard tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Overview" />
            <Tab label="User Management" />
            <Tab label="Financial Summary" />
          </Tabs>
        </Box>

        {/* Stat Cards - conditionally rendered based on tab */}
        <Grid container spacing={3}>
          {tabValue === 0 && statCards.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={card.key}
              sx={{ animation: `${fadeIn} 0.5s ease ${index * 0.1}s forwards` }}
            >
              <Card
                style={cardStyle}
                onClick={() => handleOpenModal(card.modalType)}
                sx={{
                  background: `linear-gradient(135deg, ${alpha(card.color, 0.1)} 0%, ${alpha(card.color, 0.05)} 100%)`,
                  border: `1px solid ${alpha(card.color, 0.2)}`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${alpha(card.color, 0.15)} 0%, ${alpha(card.color, 0.1)} 100%)`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box sx={{ 
                      color: "white", 
                      mr: 2, 
                      p: 1, 
                      borderRadius: 2,
                      backgroundColor: card.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {card.icon}
                    </Box>
                    <Typography variant="h6" color="textSecondary">
                      {card.label}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: card.color }}>
                    {["totalBalance", "totalWithdrawn", "totalCredited"].includes(card.key) 
                      ? formatCurrency(stats[card.key]) 
                      : stats[card.key]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
          {tabValue === 1 && (
            <>
              {statCards.filter(card => ["totalUsers", "bannedUsers", "admins"].includes(card.key))
                .map((card, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={card.key}
                  sx={{ animation: `${fadeIn} 0.5s ease ${index * 0.1}s forwards` }}
                >
                  <Card
                    style={cardStyle}
                    onClick={() => handleOpenModal(card.modalType)}
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(card.color, 0.1)} 0%, ${alpha(card.color, 0.05)} 100%)`,
                      border: `1px solid ${alpha(card.color, 0.2)}`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${alpha(card.color, 0.15)} 0%, ${alpha(card.color, 0.1)} 100%)`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box sx={{ 
                          color: "white", 
                          mr: 2, 
                          p: 1, 
                          borderRadius: 2,
                          backgroundColor: card.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {card.icon}
                        </Box>
                        <Typography variant="h6" color="textSecondary">
                          {card.label}
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: "bold", color: card.color }}>
                        {stats[card.key]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
          
          {tabValue === 2 && (
            <>
              {statCards.filter(card => ["totalBalance", "totalWithdrawn", "totalCredited", "totalTransactions"].includes(card.key))
                .map((card, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={card.key}
                  sx={{ animation: `${fadeIn} 0.5s ease ${index * 0.1}s forwards` }}
                >
                  <Card
                    style={cardStyle}
                    onClick={() => handleOpenModal(card.modalType)}
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(card.color, 0.1)} 0%, ${alpha(card.color, 0.05)} 100%)`,
                      border: `1px solid ${alpha(card.color, 0.2)}`,
                      "&:hover": {
                        background: `linear-gradient(135deg, ${alpha(card.color, 0.15)} 0%, ${alpha(card.color, 0.1)} 100%)`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box sx={{ 
                          color: "white", 
                          mr: 2, 
                          p: 1, 
                          borderRadius: 2,
                          backgroundColor: card.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {card.icon}
                        </Box>
                        <Typography variant="h6" color="textSecondary">
                          {card.label}
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: "bold", color: card.color }}>
                        {["totalBalance", "totalWithdrawn", "totalCredited"].includes(card.key) 
                          ? formatCurrency(stats[card.key]) 
                          : stats[card.key]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>

        {/* Charts Section */}
        {tabValue === 0 && (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: "0 8px 16px rgba(97, 39, 183, 0.1)",
                p: 2 
              }}>
                <Typography variant="h6" sx={{ p: 2, color: "#6127B7", fontWeight: "bold" }}>
                  Financial Overview
                </Typography>
                <BarChart 
                  data={financialChartData} 
                  colors={financialColors} 
                  height={300} 
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: "0 8px 16px rgba(97, 39, 183, 0.1)",
                p: 2 
              }}>
                <Typography variant="h6" sx={{ p: 2, color: "#6127B7", fontWeight: "bold" }}>
                  User Distribution
                </Typography>
                <PieChart 
                  data={userDistributionData} 
                  colors={userColors} 
                  size={250} 
                />
              </Card>
            </Grid>
          </Grid>
        )}
      
        {/* Modal */}
        <Modal 
          open={modalOpen} 
          onClose={handleCloseModal} 
          closeAfterTransition
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(3px)',
          }}
        >
          <Box 
            sx={{
              position: 'relative',
              width: '80%',
              maxWidth: 800,
              maxHeight: '80vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 3,
              p: 3,
              overflow: 'auto',
              animation: `${fadeIn} 0.3s ease forwards`,
              border: `1px solid ${alpha("#6127B7", 0.2)}`,
            }}
          >
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              mb: 2,
              pb: 2,
              borderBottom: `1px solid ${alpha("#6127B7", 0.1)}`
            }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#6127B7" }}>
                {getModalTitle()} ({modalData.length})
              </Typography>
              <IconButton 
                onClick={handleCloseModal} 
                sx={{ 
                  color: "#6127B7",
                  "&:hover": {
                    backgroundColor: alpha("#6127B7", 0.1)
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Modal List */}
            <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
              {modalData.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
                  No data available
                </Typography>
              ) : (
                modalData.map((item) => (
                  <ListItem
                    key={item._id || item.transactionId}
                    sx={{
                      border: `1px solid ${alpha("#6127B7", 0.1)}`,
                      borderRadius: 2,
                      mb: 1,
                      transition: "all 0.2s",
                      "&:hover": { 
                        backgroundColor: alpha("#6127B7", 0.03),
                        transform: "translateX(4px)"
                      },
                    }}
                  >
                    {["users", "banned", "admins", "balance"].includes(modalType) ? (
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#6127B7" }}>
                              {item.name}
                            </Typography>
                            {item.isBanned && <Chip label="Banned" color="error" size="small" />}
                            {item.role === "admin" && <Chip label="Admin" color="primary" size="small" />}
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="textSecondary">
                              Email: {item.email}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Balance: {formatCurrency(item.balance || 0)}
                            </Typography>
                            {item.accountNumber && (
                              <Typography variant="body2" color="textSecondary">
                                Account: {item.accountNumber}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    ) : (
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#6127B7" }}>
                              {formatCurrency(item.amount)}
                            </Typography>
                            <Chip
                              label={item.type}
                              color={
                                item.type === "sent"
                                  ? "error"
                                  : item.type === "received"
                                  ? "success"
                                  : item.type === "withdraw"
                                  ? "warning"
                                  : "primary"
                              }
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="textSecondary">
                              ID: {item.transactionId}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Sender: {item.sender?.name || item.sender?.email || item.sender?._id || "N/A"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Receiver: {item.receiver?.name || item.receiver?.email || item.receiver?._id || "N/A"}
                            </Typography>
                            {item.timestamp && (
                              <Typography variant="caption" color="textSecondary">
                                Date: {new Date(item.timestamp).toLocaleString()}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    )}
                  </ListItem>
                ))
              )}
            </List>

            {/* Close Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, pt: 2, borderTop: `1px solid ${alpha("#6127B7", 0.1)}` }}>
              <Button 
                onClick={handleCloseModal} 
                variant="contained" 
                startIcon={<CloseIcon />}
                sx={{
                  backgroundColor: "#6127B7",
                  "&:hover": {
                    backgroundColor: "#451A8A"
                  }
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;