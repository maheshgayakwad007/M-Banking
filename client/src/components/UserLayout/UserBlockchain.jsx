// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./BlockchainDemo.css";

// export default function BlockchainDemo() {
//   const [blocks, setBlocks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBlock, setSelectedBlock] = useState(null);
//   const [chainValid, setChainValid] = useState(null);
//   const [showDemo, setShowDemo] = useState(true);
//   const [tamperedBlockIndex, setTamperedBlockIndex] = useState(null);
//   const [animatingBlock, setAnimatingBlock] = useState(null);

//   useEffect(() => {
//     fetchBlocks();
//     verifyChain();
//   }, []);

//   const fetchBlocks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:8000/api/transactions/my", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBlocks(res.data);
//     } catch (err) {
//       console.error("Error fetching blocks:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyChain = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:8000/api/transactions/verify", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setChainValid(res.data.blockchainValid);
      
//       // Visual feedback for verification
//       if (res.data.blockchainValid) {
//         document.querySelectorAll('.block-card').forEach(block => {
//           block.classList.add('verifying');
//         });
        
//         setTimeout(() => {
//           document.querySelectorAll('.block-card').forEach(block => {
//             block.classList.remove('verifying');
//             block.classList.add('verified');
//           });
//         }, 500);
        
//         setTimeout(() => {
//           document.querySelectorAll('.block-card').forEach(block => {
//             block.classList.remove('verified');
//           });
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Error verifying chain:", err);
//     }
//   };

//   const simulateTampering = async (blockIndex) => {
//     try {
//       const token = localStorage.getItem("token");
//       setTamperedBlockIndex(blockIndex);
      
//       // Visual feedback for tampering
//       const blockElement = document.querySelector(`.block-card[data-index="${blockIndex}"]`);
//       if (blockElement) {
//         blockElement.classList.add('tampering');
//         setTimeout(() => blockElement.classList.remove('tampering'), 1000);
//       }
      
//       await axios.post(`http://localhost:8000/api/transactions/demo/tamper/${blockIndex}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       await fetchBlocks();
//       await verifyChain();

//       setTimeout(async () => {
//         await axios.post(`http://localhost:8000/api/transactions/demo/restore`, {}, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setTamperedBlockIndex(null);
//         await fetchBlocks();
//         await verifyChain();
//       }, 5000);
//     } catch (err) {
//       console.error("Error simulating tampering:", err);
//       setTamperedBlockIndex(blockIndex);
//       setChainValid(false);

//       setTimeout(() => {
//         setTamperedBlockIndex(null);
//         setChainValid(true);
//       }, 5000);
//     }
//   };

//   const addDemoBlock = async () => {
//     try {
//       setAnimatingBlock(blocks.length);
//       const token = localStorage.getItem("token");
//       await axios.post(`http://localhost:8000/api/transactions/demo/add`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       await fetchBlocks();
//       await verifyChain();
      
//       setTimeout(() => {
//         setAnimatingBlock(null);
//       }, 1000);
//     } catch (err) {
//       console.error("Error adding demo block:", err);
//       await fetchBlocks();
//       setAnimatingBlock(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner">
//           <div className="blockchain-spinner"></div>
//         </div>
//         <p>Loading blockchain data...</p>
//       </div>
//     );
//   }

//   return (
   
//     <div className="app-container">
//       <div className="header">
//         <div className="title-section">
//           <h1>
//             <span className="icon-blockchain">⛓️</span>
//             Blockchain Demonstration
//           </h1>
//           <p>Interactive demonstration of blockchain technology</p>
//         </div>

//         <div className="actions">
//           <button 
//             className={`btn-toggle ${showDemo ? 'active' : ''}`}
//             onClick={() => setShowDemo(!showDemo)}
//           >
//             <span className="icon">👁️</span>
//             {showDemo ? "Hide Demo" : "Show Demo"}
//           </button>
//           <button className="btn-green" onClick={addDemoBlock}>
//             <span className="icon">➕</span>
//             Add Demo Block
//           </button>
//           <button className="btn-purple" onClick={verifyChain}>
//             <span className="icon">✓</span>
//             Verify Chain
//           </button>
//         </div>

//         {chainValid !== null && (
//           <div className={`status ${chainValid ? "valid" : "invalid"}`}>
//             <span className="status-icon">{chainValid ? "✅" : "❌"}</span>
//             {chainValid ? "Blockchain is valid" : "Blockchain has been tampered with!"}
//           </div>
//         )}
//       </div>

//       {showDemo && (
//         <div className="info-card">
//           <h2>
//             <span className="icon">ℹ️</span>
//             How Blockchain Works
//           </h2>
//           <div className="instructions">
//             <div className="instruction">
//               <span className="number">1</span>
//               Click on any block to view details
//             </div>
//             <div className="instruction">
//               <span className="number">2</span>
//               Use "Tamper with Block" to simulate modification
//             </div>
//             <div className="instruction">
//               <span className="number">3</span>
//               Verify Chain to check integrity
//             </div>
//             <div className="instruction">
//               <span className="number">4</span>
//               Tampering invalidates the chain
//             </div>
//           </div>
//         </div>
//       )}

//       {blocks.length === 0 ? (
//         <div className="empty-state">
//           <div className="empty-icon">📭</div>
//           <h3>No blocks found</h3>
//           <p>Your transaction history will appear here once you make transactions.</p>
//           <button onClick={addDemoBlock}>
//             <span className="icon">➕</span>
//             Add Demo Block
//           </button>
//         </div>
//       ) : (
//         <div className="blockchain-container">
//           <div className="chain-line"></div>
//           <div className="blockchain-view">
//             {blocks.map((block, index) => (
//               <div
//                 key={block.hash}
//                 data-index={block.index}
//                 className={`block-card ${selectedBlock === block.index ? "selected" : ""} ${tamperedBlockIndex === block.index ? "tampered" : ""} ${animatingBlock === block.index ? "new-block" : ""}`}
//                 onClick={() => setSelectedBlock(selectedBlock === block.index ? null : block.index)}
//               >
//                 <div className="block-header">
//                   <h3>
//                     {block.index === 0 ? (
//                       <>🌱 Genesis Block</>
//                     ) : (
//                       <><span className="icon-block">◻️</span> Block #{block.index}</>
//                     )}
//                   </h3>
//                   <div className="block-actions">
//                     <button 
//                       className="btn-tamper" 
//                       onClick={(e) => { e.stopPropagation(); simulateTampering(block.index); }}
//                       title="Tamper with this block"
//                     >
//                       <span className="icon">⚠️</span>
//                       Tamper
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="block-content">
//                   <div className="hash-display">
//                     <label>Hash:</label>
//                     <code>{block.hash.substring(0, 20)}...</code>
//                     <button className="btn-copy" title="Copy hash">
//                       <span className="icon">📋</span>
//                     </button>
//                   </div>
                  
//                   <div className="transaction-info">
//                     <label>Transaction:</label>
//                     <span>{block.transaction.transactionId}</span>
//                   </div>
                  
//                   {block.previousHash && (
//                     <div className="previous-hash">
//                       <label>Previous Hash:</label>
//                       <code>{block.previousHash.substring(0, 16)}...</code>
//                     </div>
//                   )}
//                 </div>
                
//                 {selectedBlock === block.index && (
//                   <div className="block-details">
//                     <h4>Block Details</h4>
//                     <pre>{JSON.stringify(block, null, 2)}</pre>
//                     <button 
//                       className="btn-close-details"
//                       onClick={(e) => { e.stopPropagation(); setSelectedBlock(null); }}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./BlockchainDemo.css";

export default function BlockchainDemo() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [chainValid, setChainValid] = useState(null);
  const [showDemo, setShowDemo] = useState(true);
  const [tamperedBlockIndex, setTamperedBlockIndex] = useState(null);
  const [animatingBlock, setAnimatingBlock] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
    
    fetchBlocks();
    verifyChain();
  }, []);

  const fetchBlocks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/transactions/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlocks(res.data);
    } catch (err) {
      console.error("Error fetching blocks:", err);
    } finally {
      setLoading(false);
    }
  };

  const verifyChain = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/transactions/verify", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChainValid(res.data.blockchainValid);
      
      // Visual feedback for verification
      if (res.data.blockchainValid) {
        document.querySelectorAll('.block-card').forEach(block => {
          block.classList.add('verifying');
        });
        
        setTimeout(() => {
          document.querySelectorAll('.block-card').forEach(block => {
            block.classList.remove('verifying');
            block.classList.add('verified');
          });
        }, 500);
        
        setTimeout(() => {
          document.querySelectorAll('.block-card').forEach(block => {
            block.classList.remove('verified');
          });
        }, 2000);
      }
    } catch (err) {
      console.error("Error verifying chain:", err);
    }
  };

  const simulateTampering = async (blockIndex) => {
    try {
      const token = localStorage.getItem("token");
      setTamperedBlockIndex(blockIndex);
      
      // Visual feedback for tampering
      const blockElement = document.querySelector(`.block-card[data-index="${blockIndex}"]`);
      if (blockElement) {
        blockElement.classList.add('tampering');
        setTimeout(() => blockElement.classList.remove('tampering'), 1000);
      }
      
      await axios.post(`http://localhost:8000/api/transactions/demo/tamper/${blockIndex}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      await fetchBlocks();
      await verifyChain();

      setTimeout(async () => {
        await axios.post(`http://localhost:8000/api/transactions/demo/restore`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTamperedBlockIndex(null);
        await fetchBlocks();
        await verifyChain();
      }, 5000);
    } catch (err) {
      console.error("Error simulating tampering:", err);
      setTamperedBlockIndex(blockIndex);
      setChainValid(false);

      setTimeout(() => {
        setTamperedBlockIndex(null);
        setChainValid(true);
      }, 5000);
    }
  };

  const addDemoBlock = async () => {
    try {
      setAnimatingBlock(blocks.length);
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8000/api/transactions/demo/add`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchBlocks();
      await verifyChain();
      
      setTimeout(() => {
        setAnimatingBlock(null);
      }, 1000);
    } catch (err) {
      console.error("Error adding demo block:", err);
      await fetchBlocks();
      setAnimatingBlock(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner">
          <div className="blockchain-spinner"></div>
        </div>
        <p>Loading blockchain data...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header" data-aos="fade-up">
        <div className="title-section">
          <h1>
            <span className="icon-blockchain">⛓️</span>
            Blockchain Demonstration
          </h1>
          <p>Interactive demonstration of blockchain technology</p>
        </div>

        <div className="actions">
          <button 
            className={`btn-toggle ${showDemo ? 'active' : ''}`}
            onClick={() => setShowDemo(!showDemo)}
          >
            <span className="icon">👁️</span>
            {showDemo ? "Hide Demo" : "Show Demo"}
          </button>
          <button className="btn-green" onClick={addDemoBlock}>
            <span className="icon">➕</span>
            Add Demo Block
          </button>
          <button className="btn-purple" onClick={verifyChain}>
            <span className="icon">✓</span>
            Verify Chain
          </button>
        </div>

        {chainValid !== null && (
          <div className={`status ${chainValid ? "valid" : "invalid"}`}>
            <span className="status-icon">{chainValid ? "✅" : "❌"}</span>
            {chainValid ? "Blockchain is valid" : "Blockchain has been tampered with!"}
          </div>
        )}
      </div>

      {showDemo && (
        <div className="info-card" data-aos="fade-up">
          <h2>
            <span className="icon">ℹ️</span>
            How Blockchain Works
          </h2>
          <div className="instructions">
            <div className="instruction">
              <span className="number">1</span>
              Click on any block to view details
            </div>
            <div className="instruction">
              <span className="number">2</span>
              Use "Tamper with Block" to simulate modification
            </div>
            <div className="instruction">
              <span className="number">3</span>
              Verify Chain to check integrity
            </div>
            <div className="instruction">
              <span className="number">4</span>
              Tampering invalidates the chain
            </div>
          </div>
        </div>
      )}

      {blocks.length === 0 ? (
        <div className="empty-state" data-aos="zoom-in">
          <div className="empty-icon">📭</div>
          <h3>No blocks found</h3>
          <p>Your transaction history will appear here once you make transactions.</p>
          <button onClick={addDemoBlock}>
            <span className="icon">➕</span>
            Add Demo Block
          </button>
        </div>
      ) : (
        <div className="blockchain-container">
          <div className="chain-line"></div>
          <div className="blockchain-view">
            {blocks.map((block, index) => (
              <div
                key={block.hash}
                data-index={block.index}
                className={`block-card ${selectedBlock === block.index ? "selected" : ""} ${tamperedBlockIndex === block.index ? "tampered" : ""} ${animatingBlock === block.index ? "new-block" : ""}`}
                onClick={() => setSelectedBlock(selectedBlock === block.index ? null : block.index)}
               // data-aos="fade-up"
                // data-aos-delay={index * 100}
              >
                <div className="block-header">
                  <h3>
                    {block.index === 0 ? (
                      <>🌱 Genesis Block</>
                    ) : (
                      <><span className="icon-block">◻️</span> Block #{block.index}</>
                    )}
                  </h3>
                  <div className="block-actions">
                    <button 
                      className="btn-tamper" 
                      onClick={(e) => { e.stopPropagation(); simulateTampering(block.index); }}
                      title="Tamper with this block"
                    >
                      <span className="icon">⚠️</span>
                      Tamper
                    </button>
                  </div>
                </div>
                
                <div className="block-content">
                  <div className="hash-display">
                    <label>Hash:</label>
                    <code>{block.hash.substring(0, 20)}...</code>
                    <button className="btn-copy" title="Copy hash">
                      <span className="icon">📋</span>
                    </button>
                  </div>
                  
                  <div className="transaction-info">
                    <label>Transaction:</label>
                    <span>{block.transaction.transactionId}</span>
                  </div>
                  
                  {block.previousHash && (
                    <div className="previous-hash">
                      <label>Previous Hash:</label>
                      <code>{block.previousHash.substring(0, 16)}...</code>
                    </div>
                  )}
                </div>
                
                {selectedBlock === block.index && (
                  <div className="block-details">
                    <h4>Block Details</h4>
                    <pre>{JSON.stringify(block, null, 2)}</pre>
                    <button 
                      className="btn-close-details"
                      onClick={(e) => { e.stopPropagation(); setSelectedBlock(null); }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}