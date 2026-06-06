import express from "express";
import { adminCredit, adminWithdraw, requestOtp } from "../controllers/adminController.js";
import { adminAuth, protect } from "../middleware/adminAuth.js";


const adminrouter = express.Router();

// ✅ Both middlewares in sequence
adminrouter.post("/credit/:userId", protect, adminAuth, adminCredit);
adminrouter.post("/withdraw/:userId", protect, adminAuth, adminWithdraw);
adminrouter.post("/otp/request",protect, adminAuth, requestOtp);

export default adminrouter;
