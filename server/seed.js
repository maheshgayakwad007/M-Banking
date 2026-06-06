import mongoose from "mongoose";
import User from "./models/User.js"; // adjust path if needed

const MONGO_URI = "mongodb://127.0.0.1:27017/MBANK"; // change if needed

const seedUsers = [
  {
    name: "Basavaraj",
    email: "basava@gmail.com",
    contact: "9876543210",
    profilePic: "",
    password: "123456", // ideally hash this in real apps
    role: "user",
    isBanned: false,
    balance: 5000,
    bankDetails: {
      bankName: "State Bank of India",
      bankNumber: "123456789012",
      ifscCode: "SBIN0001234",
      upiId: "basava@upi"
    }
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    contact: "9123456780",
    profilePic: "",
    password: "admin123",
    role: "admin",
    isBanned: false,
    balance: 10000,
    bankDetails: {
      bankName: "HDFC Bank",
      bankNumber: "987654321098",
      ifscCode: "HDFC0005678",
      upiId: "admin@upi"
    }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await User.deleteMany(); // clears existing users
    console.log("Old users removed");

    await User.insertMany(seedUsers);
    console.log("Users seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();