// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { Table, Button, Spin, message, Card, Avatar, Space, Typography } from 'antd';
// // import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';

// // const { Text, Title } = Typography;

// // const AllTransactions = () => {
// //     const [users, setUsers] = useState([]);
// //     const [transactions, setTransactions] = useState([]);
// //     const [selectedUser, setSelectedUser] = useState(null);
// //     const [loading, setLoading] = useState(false);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         fetchAllUsers();
// //     }, []);

// //     const fetchAllUsers = async () => {
// //         try {
// //             setLoading(true);
// //             const { data } = await axios.get('http://localhost:8000/api/users', {
// //                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
// //             }); setUsers(data);
// //             setLoading(false);
// //         } catch (err) {
// //             message.error('Failed to fetch users');
// //             setLoading(false);
// //         }
// //     };

// //     const fetchUserTransactions = async (userId) => {
// //         try {
// //             setLoading(true);
// //             const { data } = await axios.get(`http://localhost:8000/api/transactions/history/${userId}`);
// //             setTransactions(data);
// //             setLoading(false);
// //         } catch (err) {
// //             message.error('Failed to fetch transactions');
// //             setLoading(false);
// //         }
// //     };

// //     const handleUserClick = (user) => {
// //         setSelectedUser(user);
// //         fetchUserTransactions(user._id);
// //     };

// //     const columns = [
// //         {
// //             title: 'Profile',
// //             dataIndex: 'profilePic',
// //             key: 'profilePic',
// //             render: (pic, record) => (
// //                 <Avatar src={pic ? `http://localhost:8000/uploads/${pic}` : undefined} icon={!pic && <UserOutlined />} />
// //             ),
// //         },
// //         {
// //             title: 'Name',
// //             dataIndex: 'name',
// //             key: 'name',
// //         },
// //         {
// //             title: 'Email',
// //             dataIndex: 'email',
// //             key: 'email',
// //         },
// //         {
// //             title: 'Contact',
// //             dataIndex: 'contact',
// //             key: 'contact',
// //         },
// //         {
// //             title: 'Role',
// //             dataIndex: 'role',
// //             key: 'role',
// //             render: (role) => <Text>{role === 'admin' ? <span style={{color: 'red'}}>Admin</span> : role}</Text>,
// //         },
// //         {
// //             title: 'Balance',
// //             dataIndex: 'balance',
// //             key: 'balance',
// //             render: (balance) => `₹${balance.toFixed(2)}`,
// //         },
// //         {
// //             title: 'Action',
// //             key: 'action',
// //             render: (_, record) => (
// //                 <Space>
// //                     <Button type="primary" onClick={() => handleUserClick(record)}>
// //                         View Transactions
// //                     </Button>
// //                     {record.isBanned ? (
// //                         <Button danger onClick={() => handleBanUnban(record._id, false)}>
// //                             Unban
// //                         </Button>
// //                     ) : (
// //                         <Button danger onClick={() => handleBanUnban(record._id, true)}>
// //                             Ban
// //                         </Button>
// //                     )}
// //                 </Space>
// //             ),
// //         },
// //     ];

// //     // Ban/Unban user handler
// //     const handleBanUnban = async (userId, ban) => {
// //         setLoading(true);
// //         try {
// //             const url = `http://localhost:8000/api/users/${userId}/${ban ? 'ban' : 'unban'}`;
// //             await axios.put(url, {}, {
// //                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
// //             });
// //             message.success(ban ? 'User banned' : 'User unbanned');
// //             fetchAllUsers();
// //         } catch (err) {
// //             message.error('Failed to update user status');
// //         }
// //         setLoading(false);
// //     };

// //     // Helper to get absolute profile pic URL
// //     const getProfilePicUrl = (pic) => {
// //         if (!pic) return undefined;
// //         if (pic.startsWith('http')) return pic;
// //         // Use your backend URL here
// //         return `http://localhost:8000/uploads/${pic}`;
// //     };

// //     const transactionColumns = [
// //         {
// //             title: 'Transaction ID',
// //             dataIndex: 'transactionId',
// //             key: 'transactionId',
// //             render: (id) => <Text copyable>{id}</Text>,
// //         },
// //         {
// //             title: 'Amount',
// //             dataIndex: 'amount',
// //             key: 'amount',
// //             render: (amount) => (
// //                 <Text strong style={{ color: amount > 0 ? 'green' : 'red' }}>
// //                     {amount > 0 ? `+₹${amount}` : `-₹${Math.abs(amount)}`}
// //                 </Text>
// //             ),
// //         },
// //         {
// //             title: 'Type',
// //             dataIndex: 'type',
// //             key: 'type',
// //             render: (type) => (
// //                 <Text
// //                     style={{
// //                         color: type === 'credit' || type === 'received' ? 'green' : 'red',
// //                         textTransform: 'capitalize'
// //                     }}
// //                 >
// //                     {type}
// //                 </Text>
// //             ),
// //         },
// //         {
// //             title: 'Date',
// //             dataIndex: 'date',
// //             key: 'date',
// //             render: (date) => new Date(date).toLocaleString(),
// //         },
// //         {
// //             title: 'Description',
// //             dataIndex: 'description',
// //             key: 'description',
// //         },
// //         {
// //             title: 'Sender',
// //             key: 'sender',
// //             render: (_, record) => (
// //                 <Space>
// //                     <Avatar src={getProfilePicUrl(record.sender?.profilePic)} icon={!record.sender?.profilePic && <UserOutlined />} />
// //                     <Text>{record.sender?.name}</Text>
// //                 </Space>
// //             ),
// //         },
// //         {
// //             title: 'Receiver',
// //             key: 'receiver',
// //             render: (_, record) => (
// //                 <Space>
// //                     <Avatar src={getProfilePicUrl(record.receiver?.profilePic)} icon={!record.receiver?.profilePic && <UserOutlined />} />
// //                     <Text>{record.receiver?.name}</Text>
// //                 </Space>
// //             ),
// //         },
// //     ];

// //     if (loading) {
// //         return (
// //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //                 <Spin size="large" />
// //             </div>
// //         );
// //     }

// //     if (selectedUser) {
// //         return (
// //             <div style={{ padding: '20px' }}>
// //                 <Button
// //                     icon={<ArrowLeftOutlined />}
// //                     onClick={() => setSelectedUser(null)}
// //                     style={{ marginBottom: '20px' }}
// //                 >
// //                     Back to Users
// //                 </Button>

// //                 <Card
// //                     title={
// //                         <Space>
// //                             <Avatar
// //                                 size="large"
// //                                 src={selectedUser.profilePic ? `http://localhost:8000/uploads/${selectedUser.profilePic}` : <UserOutlined />}
// //                                 icon={!selectedUser.profilePic && <UserOutlined />}
// //                             />
// //                             <Title level={4} style={{ margin: 0 }}>
// //                                 {selectedUser.name}'s Transactions
// //                             </Title>
// //                         </Space>
// //                     }
// //                     extra={<Text strong>Balance: ₹{selectedUser.balance.toFixed(2)}</Text>}
// //                 >
// //                     <Table
// //                         columns={transactionColumns}
// //                         dataSource={transactions}
// //                         rowKey="_id"
// //                         pagination={{ pageSize: 10 }}
// //                     />
// //                 </Card>
// //             </div>
// //         );
// //     }

// //     // Filter out admin users
// //     const nonAdminUsers = users.filter(u => u.role !== 'admin');
// //     return (
// //         <div style={{ padding: '20px' }}>
// //             <Title level={2}>All Users</Title>
// //             <Table
// //                 columns={columns}
// //                 dataSource={nonAdminUsers}
// //                 rowKey="_id"
// //                 pagination={{ pageSize: 10 }}
// //             />
// //         </div>
// //     );
// // };

// // export default AllTransactions;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Table,
//   Button,
//   Spin,
//   message,
//   Card,
//   Avatar,
//   Space,
//   Typography,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
// } from "antd";
// import {
//   UserOutlined,
//   ArrowLeftOutlined,
//   PlusOutlined,
//   MinusOutlined,
// } from "@ant-design/icons";

// const { Text, Title } = Typography;

// const AllTransactions = () => {
//   const [users, setUsers] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalType, setModalType] = useState(""); // "credit" or "withdraw"
//   const [otpRequested, setOtpRequested] = useState(false); // ✅ OTP step tracking
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   const fetchAllUsers = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("http://localhost:8000/api/users", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setUsers(data);
//     } catch (err) {
//       message.error("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserTransactions = async (userId) => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `http://localhost:8000/api/transactions/history/${userId}`
//       );
//       setTransactions(data);
//     } catch (err) {
//       message.error("Failed to fetch transactions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//     fetchUserTransactions(user._id);
//   };

//   const handleBanUnban = async (userId, ban) => {
//     setLoading(true);
//     try {
//       const url = `http://localhost:8000/api/users/${userId}/${
//         ban ? "ban" : "unban"
//       }`;
//       await axios.put(
//         url,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       message.success(ban ? "User banned" : "User unbanned");
//       fetchAllUsers();
//     } catch (err) {
//       message.error("Failed to update user status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openTransactionModal = (type, user) => {
//     setModalType(type);
//     setSelectedUser(user);
//     form.resetFields();
//     setOtpRequested(false); // reset OTP flow every time modal opens
//     setModalVisible(true);
//   };

//   const handleTransaction = async () => {
//     try {
//       const values = await form.validateFields();
//       setLoading(true);

//       if (!otpRequested) {
//         // Step 1: Request OTP
//         await axios.post(
//           "http://localhost:8000/api/admincontrol/otp/request",
//           {
//             userId: selectedUser._id,
//             type: modalType,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         message.success("OTP sent to user's email. Enter OTP below.");
//         setOtpRequested(true); // show OTP field
//         setLoading(false);
//         return;
//       }

//       // Step 2: Confirm transaction with OTP
//       await axios.post(
//         `http://localhost:8000/api/admincontrol/${modalType}/${selectedUser._id}`,
//         values,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       message.success(`${modalType} successful`);
//       fetchAllUsers();
//       setModalVisible(false);
//       setOtpRequested(false); // reset OTP state
//     } catch (err) {
//       message.error(err.response?.data?.error || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns = [
//     {
//       title: "Profile",
//       dataIndex: "profilePic",
//       key: "profilePic",
//       render: (pic, record) => (
//         <Avatar
//           src={pic ? `http://localhost:8000/uploads/${pic}` : undefined}
//           icon={!pic && <UserOutlined />}
//         />
//       ),
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Balance",
//       dataIndex: "balance",
//       key: "balance",
//       render: (balance) => `₹${balance.toFixed(2)}`,
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space>
//           <Button type="primary" onClick={() => handleUserClick(record)}>
//             View
//           </Button>
//           <Button
//             icon={<PlusOutlined />}
//             onClick={() => openTransactionModal("credit", record)}
//           >
//             Credit
//           </Button>
//           <Button
//             danger
//             icon={<MinusOutlined />}
//             onClick={() => openTransactionModal("withdraw", record)}
//           >
//             Withdraw
//           </Button>
//           {record.isBanned ? (
//             <Button danger onClick={() => handleBanUnban(record._id, false)}>
//               Unban
//             </Button>
//           ) : (
//             <Button danger onClick={() => handleBanUnban(record._id, true)}>
//               Ban
//             </Button>
//           )}
//         </Space>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "100px" }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <Title level={2}>All Users</Title>
//       <Table
//         columns={columns}
//         dataSource={users.filter((u) => u.role !== "admin")}
//         rowKey="_id"
//       />

//       <Modal
//         title={`${
//           modalType === "credit" ? "Credit" : "Withdraw"
//         } Money for ${selectedUser?.name}`}
//         open={modalVisible}
//         onCancel={() => {
//           setModalVisible(false);
//           setOtpRequested(false);
//         }}
//         onOk={handleTransaction}
//         okText={!otpRequested ? "Send OTP" : modalType === "credit" ? "Credit" : "Withdraw"}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="amount"
//             label="Amount"
//             rules={[{ required: true, message: "Enter amount" }]}
//           >
//             <InputNumber min={1} style={{ width: "100%" }} />
//           </Form.Item>

//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: "Enter description" }]}
//           >
//             <Input.TextArea rows={3} />
//           </Form.Item>

//           {otpRequested && (
//             <Form.Item
//               name="otp"
//               label="OTP"
//               rules={[{ required: true, message: "Enter OTP" }]}
//             >
//               <Input />
//             </Form.Item>
//           )}
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default AllTransactions;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Spin,
  message,
  Card,
  Avatar,
  Space,
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
import {
  UserOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const AllTransactions = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalUser, setModalUser] = useState(null); // Separate state for modal user
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "credit" or "withdraw"
  const [otpRequested, setOtpRequested] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(data);
    } catch (err) {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTransactions = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/transactions/history/${userId}`
      );
      setTransactions(data);
    } catch (err) {
      message.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserTransactions(user._id);
  };

  const handleBanUnban = async (userId, ban) => {
    setLoading(true);
    try {
      const url = `http://localhost:8000/api/users/${userId}/${
        ban ? "ban" : "unban"
      }`;
      await axios.put(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      message.success(ban ? "User banned" : "User unbanned");
      fetchAllUsers();
    } catch (err) {
      message.error("Failed to update user status");
    } finally {
      setLoading(false);
    }
  };

  const openTransactionModal = (type, user, e) => {
    // Add event parameter and prevent propagation
    if (e) {
      e.stopPropagation();
    }
    setModalType(type);
    setModalUser(user); // Use separate state for modal user
    form.resetFields();
    setOtpRequested(false);
    setModalVisible(true);
  };

  const handleTransaction = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (!otpRequested) {
        // Step 1: Request OTP
        await axios.post(
          "http://localhost:8000/api/admincontrol/otp/request",
          {
            userId: modalUser._id, // Use modalUser instead of selectedUser
            type: modalType,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        message.success("OTP sent to user's email. Enter OTP below.");
        setOtpRequested(true);
        setLoading(false);
        return;
      }

      // Step 2: Confirm transaction with OTP
      await axios.post(
        `http://localhost:8000/api/admincontrol/${modalType}/${modalUser._id}`, // Use modalUser instead of selectedUser
        values,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      message.success(`${modalType} successful`);
      fetchAllUsers();
      setModalVisible(false);
      setOtpRequested(false);
      
      // If we're currently viewing this user's transactions, refresh them
      if (selectedUser && selectedUser._id === modalUser._id) {
        fetchUserTransactions(selectedUser._id);
      }
    } catch (err) {
      message.error(err.response?.data?.error || "Failed");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get absolute profile pic URL
  const getProfilePicUrl = (pic) => {
    if (!pic) return undefined;
    if (pic.startsWith('http')) return pic;
    return `http://localhost:8000/uploads/${pic}`;
  };

  const transactionColumns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (id) => <Text copyable>{id}</Text>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Text strong style={{ color: amount > 0 ? 'green' : 'red' }}>
          {amount > 0 ? `+₹${amount}` : `-₹${Math.abs(amount)}`}
        </Text>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Text
          style={{
            color: type === 'credit' || type === 'received' ? 'green' : 'red',
            textTransform: 'capitalize'
          }}
        >
          {type}
        </Text>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Sender',
      key: 'sender',
      render: (_, record) => (
        <Space>
          <Avatar src={getProfilePicUrl(record.sender?.profilePic)} icon={!record.sender?.profilePic && <UserOutlined />} />
          <Text>{record.sender?.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Receiver',
      key: 'receiver',
      render: (_, record) => (
        <Space>
          <Avatar src={getProfilePicUrl(record.receiver?.profilePic)} icon={!record.receiver?.profilePic && <UserOutlined />} />
          <Text>{record.receiver?.name}</Text>
        </Space>
      ),
    },
  ];

  const userColumns = [
    {
      title: "Profile",
      dataIndex: "profilePic",
      key: "profilePic",
      render: (pic, record) => (
        <Avatar
          src={pic ? `http://localhost:8000/uploads/${pic}` : undefined}
          icon={!pic && <UserOutlined />}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Text>{role === 'admin' ? <span style={{color: 'red'}}>Admin</span> : role}</Text>,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => `₹${balance.toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleUserClick(record)}>
            View Transactions
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={(e) => openTransactionModal("credit", record, e)}
          >
            Credit
          </Button>
          <Button
            danger
            icon={<MinusOutlined />}
            onClick={(e) => openTransactionModal("withdraw", record, e)}
          >
            Withdraw
          </Button>
          {record.isBanned ? (
            <Button danger onClick={() => handleBanUnban(record._id, false)}>
              Unban
            </Button>
          ) : (
            <Button danger onClick={() => handleBanUnban(record._id, true)}>
              Ban
            </Button>
          )}
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin size="large" />
      </div>
    );
  }

  // Show transaction view if a user is selected
  if (selectedUser) {
    return (
      <div style={{ padding: '20px' }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => setSelectedUser(null)}
          style={{ marginBottom: '20px' }}
        >
          Back to Users
        </Button>

        <Card
          title={
            <Space>
              <Avatar
                size="large"
                src={selectedUser.profilePic ? `http://localhost:8000/uploads/${selectedUser.profilePic}` : <UserOutlined />}
                icon={!selectedUser.profilePic && <UserOutlined />}
              />
              <Title level={4} style={{ margin: 0 }}>
                {selectedUser.name}'s Transactions
              </Title>
            </Space>
          }
          extra={
            <Space>
              <Text strong>Balance: ₹{selectedUser.balance.toFixed(2)}</Text>
              <Button
                icon={<PlusOutlined />}
                onClick={() => openTransactionModal("credit", selectedUser)}
              >
                Credit
              </Button>
              <Button
                danger
                icon={<MinusOutlined />}
                onClick={() => openTransactionModal("withdraw", selectedUser)}
              >
                Withdraw
              </Button>
            </Space>
          }
        >
          <Table
            columns={transactionColumns}
            dataSource={transactions}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
  }

  // Filter out admin users
  const nonAdminUsers = users.filter(u => u.role !== 'admin');
  
  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>All Users</Title>
      <Table
        columns={userColumns}
        dataSource={nonAdminUsers}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={`${
          modalType === "credit" ? "Credit" : "Withdraw"
        } Money for ${modalUser?.name}`}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setOtpRequested(false);
        }}
        onOk={handleTransaction}
        okText={!otpRequested ? "Send OTP" : modalType === "credit" ? "Credit" : "Withdraw"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Enter amount" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Enter description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          {otpRequested && (
            <Form.Item
              name="otp"
              label="OTP"
              rules={[{ required: true, message: "Enter OTP" }]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AllTransactions;