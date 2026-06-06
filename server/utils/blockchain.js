// import crypto from "crypto";
// import Block from "../models/blockModel.js";

// export default class Blockchain {
//   async getLastBlock() {
//     const lastBlock = await Block.findOne().sort({ index: -1 });
//     return lastBlock;
//   }

//   calculateHash(index, timestamp, transaction, previousHash) {
//     return crypto
//       .createHash("sha256")
//       .update(index + timestamp + JSON.stringify(transaction) + previousHash)
//       .digest("hex");
//   }

//   async addBlock(transaction) {
//     const lastBlock = await this.getLastBlock();
//     const index = lastBlock ? lastBlock.index + 1 : 0;
//     const previousHash = lastBlock ? lastBlock.hash : "0";
//     const timestamp = new Date();
//     const hash = this.calculateHash(index, timestamp, transaction, previousHash);

//     const newBlock = new Block({
//       index,
//       timestamp,
//       transaction,
//       previousHash,
//       hash
//     });

//     await newBlock.save();
//     return newBlock;
//   }

//   async verifyChain() {
//     const blocks = await Block.find().sort({ index: 1 });
//     for (let i = 1; i < blocks.length; i++) {
//       const prevBlock = blocks[i - 1];
//       const current = blocks[i];

//       const recalculatedHash = this.calculateHash(
//         current.index,
//         current.timestamp,
//         current.transaction,
//         current.previousHash
//       );

//       if (current.hash !== recalculatedHash || current.previousHash !== prevBlock.hash) {
//         return false;
//       }
//     }
//     return true;
//   }
// }
import crypto from "crypto";
import Block from "../models/blockModel.js";
import Alert from "../models/alertModel.js";

export default class Blockchain {
  async getLastBlock() {
    const lastBlock = await Block.findOne().sort({ index: -1 });
    return lastBlock;
  }

  calculateHash(index, timestamp, transaction, previousHash) {
    return crypto
      .createHash("sha256")
      .update(index + timestamp + JSON.stringify(transaction) + previousHash)
      .digest("hex");
  }

  async addBlock(transaction) {
    const lastBlock = await this.getLastBlock();
    const index = lastBlock ? lastBlock.index + 1 : 0;
    const previousHash = lastBlock ? lastBlock.hash : "0";
    const timestamp = new Date();
    const hash = this.calculateHash(index, timestamp, transaction, previousHash);

    const newBlock = new Block({
      index,
      timestamp,
      transaction,
      previousHash,
      hash
    });

    await newBlock.save();
    return newBlock;
  }

  async verifyChain() {
  const blocks = await Block.find().sort({ index: 1 });
  let isValid = true;

  for (let i = 1; i < blocks.length; i++) {
    const prevBlock = blocks[i - 1];
    const current = blocks[i];

    const recalculatedHash = this.calculateHash(
      current.index,
      current.timestamp,
      current.transaction,
      current.previousHash
    );

    if (current.hash !== recalculatedHash || current.previousHash !== prevBlock.hash) {
      // Check if an alert for this block index already exists
      const existingAlert = await Alert.findOne({ blockIndex: current.index });

      if (!existingAlert) {
        await Alert.create({
          title: "Blockchain Tampering Detected",
          description: `Block #${current.index} has been tampered with. Hash mismatch detected.`,
          blockIndex: current.index,
          severity: "high"
        });
      }

      isValid = false;
    }
  }

  return isValid;
}

}