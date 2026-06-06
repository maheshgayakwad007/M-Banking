import "./App.css";
import GuestLayout from "./components/GuestLAyout/GuestLayout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/GuestLAyout/Login";
import Register from "./components/GuestLAyout/Register";
import UserLayout from "./components/UserLayout/UserLayout";
import Profile from "./components/UserLayout/Profile";
import ChangePassword from "./components/UserLayout/ChangePassword";
import ForgotPassword from "./components/UserLayout/ForgotPassword";
import Transaction from "./components/UserLayout/Transaction";
import Home from "./components/GuestLAyout/Home";
import About from "./components/GuestLAyout/About";
import Services from "./components/GuestLAyout/Services";
import Contact from "./components/GuestLAyout/Conatct";
import Demo from "./components/GuestLAyout/Demo";
import TransactionVisualization from "./components/UserLayout/TransactionVisualization";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AllTransactions from "./components/AdminLayout/AllTransactions";
import UserBlockchain from "./components/UserLayout/UserBlockchain";
import BlockchainMonitor from "./components/AdminLayout/Blockchainmonitor";
import AdminDashboard from "./components/AdminLayout/AdminDashboard";
import ChartCardsRow from "./components/AdminLayout/ChartCardsRow";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="demo" element={<Demo />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Profile />} />
          <Route path="/user/profile" element={<Profile />} />
           <Route path="/user/blocks" element={<UserBlockchain />} />
          <Route path="/user/Transaction" element={<Transaction />} />
          <Route path="/user/TransactionVisualization" element={<TransactionVisualization />} />
          <Route path="/user/changepassword" element={<ChangePassword />} />          
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AllTransactions />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/changepassword" element={<ChangePassword />} />
          <Route path="/admin/Block" element={<BlockchainMonitor/>} />
          <Route path="/admin/AllTransactions" element={<AllTransactions />} />
          <Route path="/admin/Dashboard" element={<AdminDashboard/>} /> 
          <Route path="/admin/graph" element={<ChartCardsRow/>} />          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
