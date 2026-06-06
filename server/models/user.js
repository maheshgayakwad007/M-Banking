import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isBanned: { type: Boolean, default: false },

    balance: { type: Number, default: 5000 } ,
    bankDetails: {
        bankName: { type: String, required: true },
        bankNumber: { type: String, required: true }, // account number
        ifscCode: { type: String, required: true },
        upiId: { type: String, required: true }
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
