import User from "../models/user.js";
import Transaction from "../models/transactionModel.js";

import Otp from "../models/otpModel.js";
import nodemailer from "nodemailer";

// Generate random 6 digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(email, otp) {
  console.log("send otp is hit");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Transaction OTP",
      text: `Your OTP is: ${otp}`,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending mail:", error);
  }
}


// Request OTP
export const requestOtp = async (req, res) => {
  try {
    console.log("entered request otp with body",req.body)
    const { userId, type } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    console.log("otp :",otp,expiresAt)
    await Otp.findOneAndUpdate(
      { user: userId, type },
      { otp, expiresAt, verified: false },
      { upsert: true, new: true }
    );

    await sendOTP(user.email, otp);

    res.json({ message: "OTP sent to user email" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};


export const adminCredit = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, description, otp } = req.body;

    const record = await Otp.findOne({ user: userId, type: "credit" });
    if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.balance += Number(amount);
    await user.save();

    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    await Transaction.create({
      sender: req.user.id,
      receiver: userId,
      amount,
      description,
      type: "credit",
      transactionId,
    });

    record.verified = true;
    await record.save();

    res.json({ message: "Credited successfully", transactionId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const adminWithdraw = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, description, otp } = req.body;

    const record = await Otp.findOne({ user: userId, type: "withdraw" });
    if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    user.balance -= Number(amount);
    await user.save();

    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    await Transaction.create({
      sender: req.user.id,
      receiver: userId,
      amount,
      description,
      type: "withdraw",
      transactionId,
    });

    record.verified = true;
    await record.save();

    res.json({ message: "Withdrawn successfully", transactionId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
