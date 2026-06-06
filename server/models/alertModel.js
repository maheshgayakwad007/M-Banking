import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  blockIndex: {
    type: Number,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  resolved: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['new', 'under_investigation', 'resolved'],
    default: 'new'
  },
  resolvedAt: {
    type: Date
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Alert", alertSchema);