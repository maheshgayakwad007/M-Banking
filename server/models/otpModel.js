import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["sendMoney", "withdraw", "credit", "getBalance"], required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false }
});

otpSchema.index({ user: 1, type: 1 }, { unique: true });

export default mongoose.model("Otp", otpSchema);
