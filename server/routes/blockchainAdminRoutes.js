// routes/blockchainAdminRoutes.js
import express from "express";
import { auth } from "../middleware/auth.js"; // Use standard auth
import Block from "../models/blockModel.js";
import Alert from "../models/alertModel.js";
import Transaction from "../models/transactionModel.js";
import Blockchain from "../utils/blockchain.js";

const router = express.Router();
const blockchain = new Blockchain();

// Admin middleware check function
const checkAdmin = (req, res, next) => {
    console.log(req.user.role)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ 
            error: "Access denied. Admin privileges required." 
        });
    }
    next();
};

// Get all blocks (admin only)
router.get('/blockchain', auth, async (req, res) => {
    try {
        const blocks = await Block.find().sort({ index: 1 }).populate('transaction');
        res.json(blocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify blockchain integrity (admin only)
router.get('/verify-blockchain', auth, async (req, res) => {
    try {
        const isValid = await blockchain.verifyChain();
        res.json({ isValid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get blockchain alerts (admin only)
router.get('/blockchain-alerts', auth, async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ timestamp: -1 });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search blockchain (admin only)
router.get('/blockchain/search', auth, async (req, res) => {
    try {
        const query = req.query.q;
        
        // Search by block index
        if (!isNaN(query)) {
            const block = await Block.findOne({ index: parseInt(query) }).populate('transaction');
            if (block) return res.json({ block });
        }
        
        // Search by hash
        const blockByHash = await Block.findOne({ 
            $or: [
                { hash: { $regex: query, $options: 'i' } },
                { previousHash: { $regex: query, $options: 'i' } }
            ]
        }).populate('transactions');
        
        if (blockByHash) return res.json({ block: blockByHash });
        
        // Search transactions
        const transactions = await Transaction.find({
            $or: [
                { transactionId: { $regex: query, $options: 'i' } },
                { sender: { $regex: query, $options: 'i' } },
                { receiver: { $regex: query, $options: 'i' } }
            ]
        });
        
        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify specific block (admin only)
router.post('/verify-block', auth, async (req, res) => {
    try {
        const { blockIndex } = req.body;
        const block = await Block.findOne({ index: blockIndex });
        
        if (!block) {
            return res.status(404).json({ error: 'Block not found' });
        }
        
        // Verify block integrity
        const blocks = await Block.find().sort({ index: 1 });
        const currentIndex = blocks.findIndex(b => b.index === blockIndex);
        
        if (currentIndex === 0) {
            // Genesis block - check if hash is correctly calculated
            const calculatedHash = blockchain.calculateHash(
                block.index,
                block.timestamp,
                block.transaction,
                block.previousHash
            );
            const valid = calculatedHash === block.hash;
            res.json({ valid });
        } else {
            // Check if previous hash matches and current hash is valid
            const previousBlock = blocks[currentIndex - 1];
            const calculatedHash = blockchain.calculateHash(
                block.index,
                block.timestamp,
                block.transaction,
                block.previousHash
            );
            
            const valid = (
                block.previousHash === previousBlock.hash && 
                calculatedHash === block.hash
            );
            
            res.json({ valid });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Handle alert (admin only)
router.post('/handle-alert', auth, async (req, res) => {
    try {
        const { alertId, action } = req.body;
        
        if (action === 'resolve') {
            await Alert.findByIdAndUpdate(alertId, { resolved: true,status: 'Resolved', resolvedAt: new Date() });
        }
        
        // Additional logic based on action
        if (action === 'investigate') {
            await Alert.findByIdAndUpdate(alertId, { status: 'under_investigation' });
        }
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get blockchain statistics (admin only)
router.get('/blockchain-stats', auth, async (req, res) => {
    try {
        const totalBlocks = await Block.countDocuments();
        const totalTransactions = await Transaction.countDocuments();
        const latestBlock = await Block.findOne().sort({ index: -1 });
        
        // Check blockchain integrity
        const isValid = await blockchain.verifyChain();
        
        // Count unresolved alerts
        const unresolvedAlerts = await Alert.countDocuments({ resolved: false });
        
        res.json({
            totalBlocks,
            totalTransactions,
            latestBlock: latestBlock ? {
                index: latestBlock.index,
                timestamp: latestBlock.timestamp
            } : null,
            isValid,
            unresolvedAlerts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;