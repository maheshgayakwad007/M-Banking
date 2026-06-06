// import React, { useEffect, useState } from 'react';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import axios from 'axios';

// // Register ChartJS components
// ChartJS.register(
//     ArcElement,
//     Tooltip,
//     Legend,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title
// );

// const TransactionAnalytics = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [balance, setBalance] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const token = localStorage.getItem("token");

//     // Fetch all required data
//     const fetchData = async () => {
//         try {
//             setLoading(true);

//             // Fetch transactions
//             const transactionsRes = await axios.get(
//                 "http://localhost:8000/api/transactions/history",
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             // Fetch current balance
//             const balanceRes = await axios.get(
//                 "http://localhost:8000/api/transactions/balance",
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setTransactions(transactionsRes.data);
//             setBalance(balanceRes.data.balance);
            
//         } catch (err) {
//             console.error("Failed to fetch data:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     // Process transaction data for visualization
//     const processTransactionData = () => {
//         const typeMap = {
//             received: { label: 'Received', color: '#4CAF50' },
//             sent: { label: 'Sent', color: '#F44336' },
//             withdraw: { label: 'Withdrawn', color: '#9C27B0' },
//             credit: { label: 'Credited', color: '#2196F3' }
//         };

//         // Calculate summary totals
//         const summary = Object.keys(typeMap).reduce((acc, type) => {
//             acc[type] = transactions
//                 .filter(tx => tx.type === type)
//                 .reduce((sum, tx) => sum + tx.amount, 0);
//             return acc;
//         }, {});

//         // Group by month
//         const monthlyData = transactions.reduce((acc, tx) => {
//             const date = new Date(tx.date);
//             const monthYear = `${date.getFullYear()}-${date.getMonth()}`;

//             if (!acc[monthYear]) {
//                 acc[monthYear] = {
//                     label: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
//                     ...Object.fromEntries(Object.keys(typeMap).map(type => [type, 0]))
//                 };
//             }

//             acc[monthYear][tx.type] += tx.amount;
//             return acc;
//         }, {});

//         return { summary, monthlyData: Object.values(monthlyData), typeMap };
//     };

//     const { summary, monthlyData, typeMap } = processTransactionData();

//     // Pie Chart Data
//     const pieData = {
//         labels: Object.values(typeMap).map(t => t.label),
//         datasets: [{
//             data: Object.keys(typeMap).map(type => summary[type]),
//             backgroundColor: Object.values(typeMap).map(t => t.color),
//             borderWidth: 1
//         }]
//     };

//     // Bar Chart Data
//     const barData = {
//         labels: monthlyData.map(m => m.label),
//         datasets: Object.keys(typeMap).map(type => ({
//             label: typeMap[type].label,
//             data: monthlyData.map(m => m[type]),
//             backgroundColor: typeMap[type].color
//         }))
//     };

//     if (loading) return <div>Loading transaction data...</div>;

//     return (
//         <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//             <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Transaction Dashboard</h1>

            

//             {/* Summary Cards */}
//             <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '15px',
//                 margin: '20px 0',
//                 width: '100%'
//             }}>
//                 {Object.entries(typeMap).map(([type, { label, color }]) => (
//                     <div
//                         key={type}
//                         style={{
//                             background: `${color}10`,
//                             padding: '15px',
//                             borderRadius: '12px',
//                             textAlign: 'center',
//                             borderLeft: `5px solid ${color}`,
//                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//                             transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//                             cursor: 'pointer'
//                         }}
//                         onMouseEnter={(e) => {
//                             e.currentTarget.style.transform = 'translateY(-3px)';
//                             e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
//                         }}
//                         onMouseLeave={(e) => {
//                             e.currentTarget.style.transform = 'none';
//                             e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
//                         }}
//                     >
//                         <h3 style={{
//                             margin: '0 0 8px 0',
//                             color: color,
//                             fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
//                             fontWeight: '600'
//                         }}>
//                             {label}
//                         </h3>
//                         <p style={{
//                             fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
//                             fontWeight: '700',
//                             margin: 0,
//                             color: color,
//                             letterSpacing: '0.5px'
//                         }}>
//                             {['sent', 'withdraw'].includes(type) ? '-' : '+'}
//                             ₹{summary[type].toLocaleString('en-IN')}
//                         </p>
//                         <div style={{
//                             marginTop: '8px',
//                             fontSize: '12px',
//                             color: '#666',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center'
//                         }}>
//                             <span style={{
//                                 display: 'inline-flex',
//                                 alignItems: 'center',
//                                 padding: '3px 6px',
//                                 borderRadius: '12px',
//                                 background: `${color}20`,
//                                 color: color,
//                                 fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)'
//                             }}>
//                                 {type === 'received' && 'Incoming'}
//                                 {type === 'sent' && 'Outgoing'}
//                                 {type === 'withdraw' && 'Deduction'}
//                                 {type === 'credit' && 'Deposit'}
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Charts Container - Side by Side */}
//             <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '30px',
//                 marginBottom: '30px'
//             }}>
//                 {/* Charts Row */}
//                 <div style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     gap: '30px',
//                     flexWrap: 'wrap'
//                 }}>
//                     {/* Pie Chart */}
//                     <div style={{
//                         flex: '1',
//                         minWidth: '300px',
//                         backgroundColor: '#fff',
//                         borderRadius: '12px',
//                         padding: '20px',
//                         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
//                     }}>
//                         <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginTop: 0 }}>
//                             Transaction Distribution
//                         </h2>
//                         <div style={{ height: '400px' }}>
//                             <Pie
//                                 data={pieData}
//                                 options={{
//                                     responsive: true,
//                                     maintainAspectRatio: false,
//                                     plugins: {
//                                         tooltip: {
//                                             callbacks: {
//                                                 label: (context) => {
//                                                     return `${context.label}: ₹${context.raw.toLocaleString()}`;
//                                                 }
//                                             }
//                                         },
//                                         legend: {
//                                             position: 'bottom',
//                                             labels: {
//                                                 boxWidth: 15,
//                                                 padding: 20,
//                                                 font: {
//                                                     size: window.innerWidth < 600 ? 10 : 12
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     {/* Bar Chart */}
//                     <div style={{
//                         flex: '2',
//                         minWidth: '300px',
//                         backgroundColor: '#fff',
//                         borderRadius: '12px',
//                         padding: '20px',
//                         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
//                     }}>
//                         <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginTop: 0 }}>
//                             Monthly Trends
//                         </h2>
//                         <div style={{ height: '400px' }}>
//                             <Bar
//                                 data={barData}
//                                 options={{
//                                     responsive: true,
//                                     maintainAspectRatio: false,
//                                     scales: {
//                                         y: {
//                                             beginAtZero: true,
//                                             title: {
//                                                 display: true,
//                                                 text: 'Amount (₹)',
//                                                 font: {
//                                                     size: window.innerWidth < 600 ? 10 : 12
//                                                 }
//                                             },
//                                             ticks: {
//                                                 font: {
//                                                     size: window.innerWidth < 600 ? 8 : 10
//                                                 }
//                                             }
//                                         },
//                                         x: {
//                                             title: {
//                                                 display: true,
//                                                 text: 'Month',
//                                                 font: {
//                                                     size: window.innerWidth < 600 ? 10 : 12
//                                                 }
//                                             },
//                                             ticks: {
//                                                 font: {
//                                                     size: window.innerWidth < 600 ? 8 : 10
//                                                 }
//                                             }
//                                         }
//                                     },
//                                     plugins: {
//                                         tooltip: {
//                                             callbacks: {
//                                                 label: (context) => {
//                                                     return `${context.dataset.label}: ₹${context.raw.toLocaleString()}`;
//                                                 }
//                                             }
//                                         },
//                                         legend: {
//                                             position: 'bottom',
//                                             labels: {
//                                                 boxWidth: 15,
//                                                 padding: 20,
//                                                 font: {
//                                                     size: window.innerWidth < 600 ? 10 : 12
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TransactionAnalytics;
import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import axios from 'axios';
import { FaMoneyBillWave } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const TransactionAnalytics = () => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    // Fetch all required data
    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch transactions
            const transactionsRes = await axios.get(
                "http://localhost:8000/api/transactions/history",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Fetch current balance
            const balanceRes = await axios.get(
                "http://localhost:8000/api/transactions/balance",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTransactions(transactionsRes.data);
            setBalance(balanceRes.data.balance);
            
        } catch (err) {
            console.error("Failed to fetch data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Process transaction data for visualization
    const processTransactionData = () => {
        const typeMap = {
            received: { label: 'Received', color: '#4CAF50' },
            sent: { label: 'Sent', color: '#F44336' },
            withdraw: { label: 'Withdrawn', color: '#9C27B0' },
            credit: { label: 'Credited', color: '#2196F3' }
        };

        // Calculate summary totals
        const summary = Object.keys(typeMap).reduce((acc, type) => {
            acc[type] = transactions
                .filter(tx => tx.type === type)
                .reduce((sum, tx) => sum + tx.amount, 0);
            return acc;
        }, {});

        // Group by month
        const monthlyData = transactions.reduce((acc, tx) => {
            const date = new Date(tx.date);
            const monthYear = `${date.getFullYear()}-${date.getMonth()}`;

            if (!acc[monthYear]) {
                acc[monthYear] = {
                    label: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
                    ...Object.fromEntries(Object.keys(typeMap).map(type => [type, 0]))
                };
            }

            acc[monthYear][tx.type] += tx.amount;
            return acc;
        }, {});

        return { summary, monthlyData: Object.values(monthlyData), typeMap };
    };

    const { summary, monthlyData, typeMap } = processTransactionData();

    // Pie Chart Data
    const pieData = {
        labels: Object.values(typeMap).map(t => t.label),
        datasets: [{
            data: Object.keys(typeMap).map(type => summary[type]),
            backgroundColor: Object.values(typeMap).map(t => t.color),
            borderWidth: 1
        }]
    };

    // Bar Chart Data
    const barData = {
        labels: monthlyData.map(m => m.label),
        datasets: Object.keys(typeMap).map(type => ({
            label: typeMap[type].label,
            data: monthlyData.map(m => m[type]),
            backgroundColor: typeMap[type].color
        }))
    };

    if (loading) return <div>Loading transaction data...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Transaction Dashboard</h1>

            {/* Balance Card */}
            <div style={{
                background: 'linear-gradient(135deg, #2d4b91ff 0%, #1e293b 100%)',
                borderRadius: '15px',
                padding: '25px',
                color: 'white',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(106, 17, 203, 0.3)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-80px',
                    right: '30px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h3 style={{ 
                            margin: '0 0 10px 0',
                            fontWeight: '400',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <FaMoneyBillWave style={{ marginRight: '10px' }} />
                            Current Balance
                        </h3>
                        <h1 style={{ 
                            margin: '0',
                            fontSize: '2.5rem',
                            fontWeight: '700'
                        }}>
                            ₹{balance.toLocaleString()}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                margin: '20px 0',
                width: '100%'
            }}>
                {Object.entries(typeMap).map(([type, { label, color }]) => (
                    <div
                        key={type}
                        style={{
                            background: `${color}10`,
                            padding: '15px',
                            borderRadius: '12px',
                            textAlign: 'center',
                            borderLeft: `5px solid ${color}`,
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                        }}
                    >
                        <h3 style={{
                            margin: '0 0 8px 0',
                            color: color,
                            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                            fontWeight: '600'
                        }}>
                            {label}
                        </h3>
                        <p style={{
                            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                            fontWeight: '700',
                            margin: 0,
                            color: color,
                            letterSpacing: '0.5px'
                        }}>
                            {['sent', 'withdraw'].includes(type) ? '-' : '+'}
                            ₹{summary[type].toLocaleString('en-IN')}
                        </p>
                        <div style={{
                            marginTop: '8px',
                            fontSize: '12px',
                            color: '#666',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '3px 6px',
                                borderRadius: '12px',
                                background: `${color}20`,
                                color: color,
                                fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)'
                            }}>
                                {type === 'received' && 'Incoming'}
                                {type === 'sent' && 'Outgoing'}
                                {type === 'withdraw' && 'Deduction'}
                                {type === 'credit' && 'Deposit'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Container - Side by Side */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                marginBottom: '30px'
            }}>
                {/* Charts Row */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '30px',
                    flexWrap: 'wrap'
                }}>
                    {/* Pie Chart */}
                    <div style={{
                        flex: '1',
                        minWidth: '300px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginTop: 0 }}>
                            Transaction Distribution
                        </h2>
                        <div style={{ height: '400px' }}>
                            <Pie
                                data={pieData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: (context) => {
                                                    return `${context.label}: ₹${context.raw.toLocaleString()}`;
                                                }
                                            }
                                        },
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                boxWidth: 15,
                                                padding: 20,
                                                font: {
                                                    size: window.innerWidth < 600 ? 10 : 12
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div style={{
                        flex: '2',
                        minWidth: '300px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginTop: 0 }}>
                            Monthly Trends
                        </h2>
                        <div style={{ height: '400px' }}>
                            <Bar
                                data={barData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: 'Amount (₹)',
                                                font: {
                                                    size: window.innerWidth < 600 ? 10 : 12
                                                }
                                            },
                                            ticks: {
                                                font: {
                                                    size: window.innerWidth < 600 ? 8 : 10
                                                }
                                            }
                                        },
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Month',
                                                font: {
                                                    size: window.innerWidth < 600 ? 10 : 12
                                                }
                                            },
                                            ticks: {
                                                font: {
                                                    size: window.innerWidth < 600 ? 8 : 10
                                                }
                                            }
                                        }
                                    },
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: (context) => {
                                                    return `${context.dataset.label}: ₹${context.raw.toLocaleString()}`;
                                                }
                                            }
                                        },
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                boxWidth: 15,
                                                padding: 20,
                                                font: {
                                                    size: window.innerWidth < 600 ? 10 : 12
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionAnalytics;