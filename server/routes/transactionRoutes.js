import express from "express";
import { sendMoney, getBalance, tamperBlock, restoreBlockchain, addDemoBlock, getHistory, verifyBlockchain, getMyBlocks, withdrawMoney, creditMoney, getUserTransactions, requestOTP, verifyOTP,  } from "../controllers/transactionController.js";
import { auth } from "../middleware/auth.js";

const transactionrouter = express.Router();

// OTP endpoints (require auth)
transactionrouter.post("/otp/request", auth, requestOTP);
transactionrouter.post("/otp/verify", auth, verifyOTP);

transactionrouter.post("/send", auth, sendMoney);
transactionrouter.get("/balance", auth, getBalance);
transactionrouter.get("/history", auth, getHistory);
transactionrouter.get("/history/:userId", getUserTransactions);

transactionrouter.post("/withdraw", auth, withdrawMoney);
transactionrouter.post("/credit", auth, creditMoney);
//  block routes
transactionrouter.get("/my", auth, getMyBlocks);
transactionrouter.get("/verify", auth, verifyBlockchain);
transactionrouter.post("/demo/tamper/:index", auth, tamperBlock);
// transactionrouter.post("/credit/:userId", protect, adminAuth, adminCredit);
// transactionrouter.post("/withdraw/:userId",protect, adminAuth, adminWithdraw);
transactionrouter.post("/demo/restore", auth, restoreBlockchain);
transactionrouter.post("/demo/add", auth, addDemoBlock);

export default transactionrouter;
