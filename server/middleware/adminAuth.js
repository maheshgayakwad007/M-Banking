// middleware/adminAuth.js
export const adminAuth = (req, res, next) => {
  try {
    // Check if user exists and has admin role
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: "Access denied. Admin privileges required.",
        message: "Your account doesn't have permission to access this resource"
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error in admin authentication" });
  }
};

import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to req
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
          return res.status(401).json({ error: "User not found" });
        }

        next();
      } catch (error) {
        return res.status(401).json({ error: "Not authorized, token failed" });
      }
    }

    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error in authentication" });
  }
};
