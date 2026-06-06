import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    type: { type: String,   enum: ["sent", "received", "withdraw", "credit"], required: true },
    transactionId: { type: String, required: true }
});

export default mongoose.model("Transaction", transactionSchema);
