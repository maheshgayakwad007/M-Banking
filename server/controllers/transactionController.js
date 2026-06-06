import Transaction from "../models/transactionModel.js";
import User from "../models/user.js";
import Blockchain from "../utils/blockchain.js";
import Block from "../models/blockModel.js";
import Otp from "../models/otpModel.js";
import nodemailer from "nodemailer";
const blockchain = new Blockchain();

// OTP helpers
function generateOTP() {
  console.log("helo");
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// OTP DB helpers
async function setOTP(userId, type, otp, expiresAt) {
  // Upsert OTP for user/type
  await Otp.findOneAndUpdate(
    { user: userId, type },
    { otp, expiresAt, verified: false },
    { upsert: true, new: true }
  );
}

async function verifyAndConsumeOTP(userId, type, otp) {
  const entry = await Otp.findOne({ user: userId, type });
  if (
    entry &&
    entry.otp === otp &&
    entry.expiresAt > new Date() &&
    !entry.verified
  ) {
    entry.verified = true;
    await entry.save();
    return true;
  }
  return false;
}

async function isOTPVerified(userId, type) {
  const entry = await Otp.findOne({ user: userId, type });
  return entry && entry.verified && entry.expiresAt > new Date();
}

// 📤 Send Money (with OTP verification)
export const sendMoney = async (req, res) => {
  try {
    const { receiverId, amount, description, otp } = req.body;
    const senderId = req.user.id;

    // OTP check
    if (!(await isOTPVerified(senderId, "sendMoney"))) {
      return res.status(403).json({ error: "OTP not verified for send money" });
    }

    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ error: "You cannot send money to yourself" });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    // Generate transaction ID
    const uniqueId = `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    // Save transaction
    const sentTx = new Transaction({
      sender: senderId,
      receiver: receiverId,
      amount,
      description,
      type: "sent",
      transactionId: uniqueId,
    });

    const receivedTx = new Transaction({
      sender: senderId,
      receiver: receiverId,
      amount,
      description,
      type: "received",
      transactionId: uniqueId,
    });

    await sentTx.save();
    await receivedTx.save();

    // Add block to blockchain
    const block = await blockchain.addBlock({
      sender: senderId,
      receiver: receiverId,
      amount,
      description,
      transactionId: uniqueId,
      type: "transfer",
    });

    // Consume OTP after use
  await Otp.deleteOne({ user: senderId, type: "sendMoney" });

    res.json({
      message: "Transaction successful",
      transactionId: uniqueId,
      block,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// 💰 Withdraw Money (with OTP verification)
export const withdrawMoney = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, description, otpValue } = req.body;
    const otp=otpValue;
    console.log("🔹 Withdraw request received");
    console.log("➡️ userId:", userId);
    console.log("➡️ amount:", amount);
    console.log("➡️ otp provided:", otp);

    // OTP check
    if (!(await isOTPVerified(userId, "withdraw"))) {
      console.log("❌ OTP not verified or expired for withdraw");
      return res.status(403).json({ error: "OTP not verified for withdraw" });
    }
    console.log("✅ OTP verified for withdraw");

    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ error: "User not found" });
    }

    if (user.balance < Number(amount)) {
      console.log("❌ Insufficient balance. Current:", user.balance);
      return res.status(400).json({ error: "Insufficient balance" });
    }

    user.balance -= Number(amount);
    await user.save();
    console.log("✅ Balance updated. New balance:", user.balance);

    const transactionId = `TXN-${Date.now()}-${Math.floor(
      Math.random() * 100000
    )}`;

    const withdrawTx = new Transaction({
      sender: userId,
      receiver: userId,
      amount,
      description,
      type: "withdraw",
      transactionId,
    });
    await withdrawTx.save();
    console.log("✅ Transaction saved:", withdrawTx);

    // Add to blockchain
    const block = await blockchain.addBlock({
      sender: userId,
      receiver: userId,
      amount,
      description,
      transactionId,
      type: "withdraw",
    });
    console.log("✅ Block added to blockchain:", block);

    // Consume OTP after use
    await Otp.deleteOne({ user: userId, type: "withdraw" });
    console.log("✅ OTP deleted for user:", userId);

    res.json({
      message: "Amount withdrawn successfully",
      transactionId,
      block,
    });
  } catch (err) {
    console.error("❌ Error in withdrawMoney:", err);
    res.status(500).json({ error: err.message });
  }
};

// 💳 Credit Money (with OTP verification)
export const creditMoney = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, description, otp } = req.body;

    // OTP check
    if (!(await isOTPVerified(userId, "credit"))) {
      return res.status(403).json({ error: "OTP not verified for credit" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.balance += Number(amount);
    await user.save();

    const transactionId = `TXN-${Date.now()}-${Math.floor(
      Math.random() * 100000
    )}`;

    const creditTx = new Transaction({
      sender: userId,
      receiver: userId,
      amount,
      description,
      type: "credit",
      transactionId,
    });
    await creditTx.save();

    // Add to blockchain
    const block = await blockchain.addBlock({
      sender: userId,
      receiver: userId,
      amount,
      description,
      transactionId,
      type: "credit",
    });

    // Consume OTP after use
  await Otp.deleteOne({ user: userId, type: "credit" });

    res.json({ message: "Amount credited successfully", transactionId, block });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📜 Get Balance (with OTP verification)
export const getBalance = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// --- OTP endpoints ---
// Request OTP for an action
export const requestOTP = async (req, res) => {
  try {
    console.log("🔹 welcome to otp generation");
    console.log("➡️ body:", req.body);

    const { type } = req.body; // type: sendMoney, withdrawMoney, creditMoney, getBalance
    if (!["sendMoney", "withdraw", "credit", "getBalance"].includes(type)) {
      return res.status(400).json({ error: "Invalid OTP type" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
    await setOTP(req.user.id, type, otp, expiresAt);
    console.log("✅ OTP stored in DB:", otp, "for type:", type);

    // Get user email
    const user = await User.findById(req.user.id);
    if (!user || !user.email) {
      return res.status(400).json({ error: "User email not found" });
    }

    // Setup nodemailer transporter (use your SMTP config in production)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Your OTP Code",
      text: `Your OTP for ${type} is: ${otp}`,
    };
    try {
      const emailRes = await transporter.sendMail(mailOptions);
      console.log("✅ OTP email sent:", emailRes.response);
    } catch (emailErr) {
      console.error("❌ Nodemailer sendMail error:", emailErr);
      return res.status(500).json({ error: "Failed to send OTP email: " + emailErr.message });
    }

    res.json({ message: `OTP sent to your email for ${type}` });
  } catch (err) {
    console.error("❌ Error in requestOTP:", err);
    res.status(500).json({ error: err.message });
  }
};

// Verify OTP for an action
export const verifyOTP = async (req, res) => {
  try {
    const { type, otp } = req.body;
    console.log("🔹 OTP verification requested");
    console.log("➡️ type:", type, "➡️ otp:", otp);

    if (!["sendMoney", "withdraw", "credit", "getBalance"].includes(type)) {
      return res.status(400).json({ error: "Invalid OTP type" });
    }

    const userId = req.user.id;
    const isValid = await verifyAndConsumeOTP(userId, type, otp);

    if (isValid) {
      console.log("✅ OTP verified successfully");
      res.json({ message: "OTP verified" });
    } else {
      console.log("❌ Invalid or expired OTP");
      res.status(400).json({ error: "Invalid or expired OTP" });
    }
  } catch (err) {
    console.error("❌ Error in verifyOTP:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📜 Get History
export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    let transactions;
    if (user && user.role === "admin") {
      transactions = await Transaction.find()
        .populate("sender", "_id name email profilePic")
        .populate("receiver", "_id name email profilePic")
        .sort({ date: -1 });
    } else {
      transactions = await Transaction.find({
        $or: [
          { sender: userId, type: "sent" },
          { receiver: userId, type: "received" },
          { receiver: userId, type: "withdraw" },
          { receiver: userId, type: "credit" },
        ],
      })
        .populate("sender", "_id name email profilePic")
        .populate("receiver", "_id name email profilePic")
        .sort({ date: -1 });
    }

    const history = transactions.map((tx) => ({
      transactionId: tx.transactionId,
      sender: tx.sender,
      receiver: tx.receiver,
      amount: tx.amount,
      description: tx.description,
      date: tx.date,
      type: tx.type,
    }));

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getUserTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({
      $or: [
        { sender: userId, type: "sent" },
        { receiver: userId, type: "received" },
        { receiver: userId, type: "withdraw" },
        { receiver: userId, type: "credit" },
      ],
    })
      .populate("sender", "_id name email profilePic")
      .populate("receiver", "_id name email profilePic")
      .sort({ date: -1 });

    const history = transactions.map((tx) => ({
      transactionId: tx.transactionId,
      sender: tx.sender
        ? {
            _id: tx.sender._id,
            name: tx.sender.name,
            email: tx.sender.email,
            profilePic: tx.sender.profilePic
              ? tx.sender.profilePic.replace(/^.*[\\\/]/, "")
              : "",
          }
        : null,
      receiver: tx.receiver
        ? {
            _id: tx.receiver._id,
            name: tx.receiver.name,
            email: tx.receiver.email,
            profilePic: tx.receiver.profilePic
              ? tx.receiver.profilePic.replace(/^.*[\\\/]/, "")
              : "",
          }
        : null,
      amount: tx.amount,
      description: tx.description,
      date: tx.date,
      type: tx.type,
    }));

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// export const adminCredit = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { amount, description } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.balance += Number(amount);
//     await user.save();

//     const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
//     const tx = new Transaction({
//       sender: req.user.id, // admin
//       receiver: userId,
//       amount,
//       description,
//       type: "credit",
//       transactionId,
//     });
//     await tx.save();

//     res.json({ message: "Credited successfully", transactionId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const adminWithdraw = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { amount, description } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     if (user.balance < amount) {
//       return res.status(400).json({ error: "Insufficient balance" });
//     }

//     user.balance -= Number(amount);
//     await user.save();

//     const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
//     const tx = new Transaction({
//       sender: req.user.id, // admin
//       receiver: userId,
//       amount,
//       description,
//       type: "withdraw",
//       transactionId,
//     });
//     await tx.save();

//     res.json({ message: "Withdrawn successfully", transactionId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// ✅ Verify Blockchain Integrity
export const verifyBlockchain = async (req, res) => {
  try {
    const isValid = await blockchain.verifyChain();
    res.json({ blockchainValid: isValid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/transactionController.js
export const getMyBlocks = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch blocks and populate user details
    const blocks = await Block.find({
      $or: [
        { "transaction.sender": userId },
        { "transaction.receiver": userId },
      ],
    })
      .populate("transaction.sender", "name email") // Adjust fields as needed
      .populate("transaction.receiver", "name email") // Adjust fields as needed
      .sort({ index: 1 });

    res.json(blocks);
  } catch (err) {
    console.error("Error fetching user blocks:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const tamperBlock = async (req, res) => {
  try {
    const blockIndex = parseInt(req.params.index);
    const block = await Block.findOne({ index: blockIndex });

    if (!block) {
      return res.status(404).json({ error: "Block not found" });
    }

    // Store original state for restoration
    if (!req.session.originalBlocks) {
      req.session.originalBlocks = {};
    }
    req.session.originalBlocks[blockIndex] = JSON.parse(
      JSON.stringify(block.toObject())
    );

    // Tamper with the block data
    block.transaction.amount = block.transaction.amount + 100; // Change amount
    block.hash = "tampered-" + block.hash.substring(0, 10); // Change hash

    await block.save();

    res.json({ message: "Block tampered for demonstration", block });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const restoreBlockchain = async (req, res) => {
  try {
    if (!req.session.originalBlocks) {
      return res.json({ message: "No blocks to restore" });
    }

    for (const [index, originalBlock] of Object.entries(
      req.session.originalBlocks
    )) {
      await Block.findOneAndUpdate({ index: parseInt(index) }, originalBlock);
    }

    req.session.originalBlocks = {};
    res.json({ message: "Blockchain restored to original state" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addDemoBlock = async (req, res) => {
  try {
    // Create a demo transaction
    const demoTransaction = {
      sender: req.user.id,
      receiver: req.user.id, // Send to self for demo
      amount: Math.floor(Math.random() * 100) + 1,
      description: "Demo transaction",
      transactionId: "DEMO-" + Date.now(),
      type: "demo",
    };

    const newBlock = await blockchain.addBlock(demoTransaction);
    res.json({ message: "Demo block added", block: newBlock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
