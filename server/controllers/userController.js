import User from "../models/user.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// // Register user

export const register = async (req, res) => {
  try {
    const { name, email, contact, password, bankName, bankNumber, ifscCode, upiId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePic = req.file ? req.file.filename : "";

    const user = new User({
      name,
      email,
      contact,
      profilePic,
      password: hashedPassword,
      bankDetails: { bankName, bankNumber, ifscCode, upiId }
    });

    await user.save();

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD  
      }
    });

    // Professional welcome email template
    await transporter.sendMail({
      from: `"ChainPay" <${process.env.EMAIL}>`,
      to: email,
      subject: "Welcome to ChainPay - Your Blockchain Payment Gateway",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e5eb; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 30px; text-align: center;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWd8zv3fU4KDMOpVYc_mI8ePVOnmMFKooXQ&s" alt="ChainPay Logo" style="height: 50px;"/>
            <h1 style="color: white; margin-top: 20px; font-size: 24px;">Welcome to the Future of Payments</h1>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #1e293b; margin-top: 0;">Hello ${name},</h2>
            
            <p style="color: #475569; line-height: 1.6;">
              Thank you for joining <strong>ChainPay</strong> - where traditional banking meets blockchain technology for secure, transparent transactions.
            </p>
            
            <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <h3 style="color: #2563eb; margin-top: 0;">Your Account Details:</h3>
              <p style="margin: 5px 0; color: #475569;">
                <strong>Email:</strong> ${email}<br>
                <strong>Registered UPI ID:</strong> ${upiId}<br>
                <strong>Bank Linked:</strong> ${bankName} (****${bankNumber.toString().slice(-4)})
              </p>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              With ChainPay, you can now:
            </p>
            <ul style="color: #475569; padding-left: 20px;">
              <li>Make instant blockchain-secured payments</li>
              <li>Track immutable transaction history</li>
              <li>Enjoy decentralized finance benefits</li>
              <li>Experience bank-grade security with crypto transparency</li>
            </ul>
            
            
            
            <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
              <strong>Security Tip:</strong> Your password is securely hashed using bcrypt and we never store plain text credentials. 
              All transactions are cryptographically signed and recorded on-chain.
            </p>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">© ${new Date().getFullYear()} ChainPay. All rights reserved.</p>
            <p style="margin: 5px 0 0;">
              <a href="${process.env.CLIENT_URL}/privacy" style="color: #2563eb; text-decoration: none;">Privacy Policy</a> | 
              <a href="${process.env.CLIENT_URL}/terms" style="color: #2563eb; text-decoration: none;">Terms of Service</a>
            </p>
          </div>
        </div>
      `
    });

    res.json({ 
      message: "Registration successful! Welcome email sent", 
      user: {
        name: user.name,
        email: user.email,
        upiId: user.bankDetails.upiId
      } 
    });
  } catch (err) {
    console.error(error.message);
    console.error("Registration error:", err);
    res.status(500).json({ 
      error: "Registration failed",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.isBanned) return res.status(403).json({ error: "Your account has been banned. Contact support." });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Ban user
export const banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Send ban notification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    await transporter.sendMail({
      from: `ChainPay <${process.env.EMAIL}>`,
      to: user.email,
      subject: "Account Banned - ChainPay",
      html: `<div style='font-family:sans-serif;padding:24px;'>
        <h2 style='color:#d33;'>Your ChainPay account has been banned</h2>
        <p>Hello ${user.name},</p>
        <p>Your account has been banned by the administrator. You will not be able to log in or access your account.</p>
        <p>If you believe this is a mistake, please contact support.</p>
        <p style='color:#888;font-size:12px;'>ChainPay Team</p>
      </div>`
    });

    res.json({ message: "User banned successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unban user
export const unbanUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: false }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Send unban notification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    await transporter.sendMail({
      from: `ChainPay <${process.env.EMAIL}>`,
      to: user.email,
      subject: "Account Unbanned - ChainPay",
      html: `<div style='font-family:sans-serif;padding:24px;'>
        <h2 style='color:#2563eb;'>Your ChainPay account has been unbanned</h2>
        <p>Hello ${user.name},</p>
        <p>Your account has been unbanned by the administrator. You may now log in and access your account again.</p>
        <p>If you have any questions, please contact support.</p>
        <p style='color:#888;font-size:12px;'>ChainPay Team</p>
      </div>`
    });

    res.json({ message: "User unbanned successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const updates = req.body;

        if (req.file) updates.profilePic = req.file.filename;
        if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
        res.json({ message: "User updated successfully", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//change password
export const changePassword = async (req, res) => {
    try {
        // console.log("🔐 Change password request received");

        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;

        //console.log("📦 Request body:", { oldPassword, newPassword });
        //console.log("👤 User ID from token:", userId);

        const user = await User.findById(userId);
        if (!user) {
          //  console.log("❌ User not found");
            return res.status(404).json({ error: "User not found" });
        }

        //console.log("✅ User found:", user.email || user.username || user._id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        //console.log("🔍 Password match result:", isMatch);

        if (!isMatch) {
            console.log("❌ Old password does not match");
            return res.status(400).json({ error: "Old password is incorrect" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        //console.log("🔑 New password hashed");

        user.password = hashedNewPassword;
        await user.save();

        //console.log("✅ Password updated successfully");

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("🔥 Error changing password:", err);
        res.status(500).json({ error: err.message });
    }
};



//ForgotPassword

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Generate 4-digit random password
        const tempPassword = Math.floor(1000 + Math.random() * 9000).toString();

        // Hash and save
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        user.password = hashedPassword;
        console.log(tempPassword);
        await user.save();

        // Setup nodemailer transporter
        
        // console.log(process.env.EMAIL);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Your Gmail
                
                pass: process.env.EMAIL_PASSWORD  // App Password
            }
            
        });

        // Email options
       const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Your ChainPay Temporary Access Credentials",
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="padding: 30px 0; border-bottom: 1px solid #eaeaea;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 600;">ChainPay Security Notification</h1>
      </div>
      
      <div style="padding: 30px 0;">
        <p style="margin-bottom: 16px; line-height: 1.5;">Hello,</p>
        
        <p style="margin-bottom: 16px; line-height: 1.5;">
          As requested, here are your temporary access credentials for ChainPay:
        </p>
        
        <div style="background-color: #f9f9f9; padding: 16px; border-radius: 4px; margin: 20px 0; border: 1px solid #eaeaea;">
          <p style="margin: 0; font-family: monospace; font-size: 15px;">
            Temporary Password: <strong>${tempPassword}</strong>
          </p>
        </div>
        
        <p style="margin-bottom: 16px; line-height: 1.5;">
          <strong style="color: #d33;">Important Security Notice:</strong>
        </p>
        
        <ul style="margin: 16px 0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">This password is set as your account password </li>
          <li style="margin-bottom: 8px;">You must change it immediately after logging in</li>
          <li style="margin-bottom: 8px;">Never share your credentials with anyone</li>
        </ul>
        
        
      </div>
      
      <div style="padding: 20px 0; border-top: 1px solid #eaeaea; font-size: 12px; color: #666;">
        <p style="margin: 0;">For security reasons, this temporary password will expire in 24 hours.</p>
        <p style="margin: 8px 0 0;">If you didn't request this, please contact our support team immediately.</p>
      </div>
    </div>
  `
};

        await transporter.sendMail(mailOptions);

        res.json({ message: "Temporary password sent to your email" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err);
    }
};


export const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
