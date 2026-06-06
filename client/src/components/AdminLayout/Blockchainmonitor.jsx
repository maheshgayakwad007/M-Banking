import { useState, useEffect } from 'react';
import axios from 'axios';
import './BlockchainMonitor.css';

export default function BlockchainMonitor() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [chainValid, setChainValid] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlockchainData();
    
    if (autoRefresh) {
      const interval = setInterval(fetchBlockchainData, 10000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchBlockchainData = async () => {
    try {
      setError(null);
      // Try both possible token storage locations
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }
      
      console.log("Fetching blockchain data with token:", token.substring(0, 20) + "...");
      
      const [blocksRes, verifyRes, alertsRes, statsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/admin/blockchain", {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error("Error fetching blocks:", err.response?.data || err.message);
          return { data: [] };
        }),
        axios.get("http://localhost:8000/api/admin/verify-blockchain", {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error("Error verifying blockchain:", err.response?.data || err.message);
          return { data: { isValid: false } };
        }),
        axios.get("http://localhost:8000/api/admin/blockchain-alerts", {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error("Error fetching alerts:", err.response?.data || err.message);
          return { data: [] };
        }),
        axios.get("http://localhost:8000/api/admin/blockchain-stats", {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
          console.error("Error fetching stats:", err.response?.data || err.message);
          return { data: {} };
        })
      ]);
      
      console.log("Blocks response:", blocksRes.data);
      console.log("Verify response:", verifyRes.data);
      console.log("Alerts response:", alertsRes.data);
      console.log("Stats response:", statsRes.data);
      
      setBlocks(blocksRes.data || []);
      setChainValid(verifyRes.data?.isValid);
      setAlerts(alertsRes.data || []);
      setStats(statsRes.data || {});
    } catch (err) {
      console.error("Unexpected error fetching blockchain data:", err);
      setError("Failed to load blockchain data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const searchBlockchain = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8000/api/admin/blockchain/search?q=${searchQuery}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.block) {
        setSelectedBlock(res.data.block);
      } else if (res.data.transactions && res.data.transactions.length > 0) {
        alert(`Found ${res.data.transactions.length} transactions matching your search`);
      } else {
        alert("No results found for your search query");
      }
    } catch (err) {
      console.error("Error searching blockchain:", err);
      alert("No results found for your search query");
    }
  };

  const verifyBlockIntegrity = async (blockIndex) => {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8000/api/admin/verify-block`,
        { blockIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(res.data.valid ? 
        `Block #${blockIndex} integrity verified successfully` : 
        `Block #${blockIndex} integrity check failed!`
      );
      
      // Refresh data after verification
      fetchBlockchainData();
    } catch (err) {
      console.error("Error verifying block:", err);
      alert("Error verifying block integrity");
    }
  };

  const handleTamperAlert = async (alertId, action) => {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/admin/handle-alert`,
        { alertId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh alerts
      fetchBlockchainData();
    } catch (err) {
      console.error("Error handling alert:", err);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchBlockchain();
    }
  };

  // Calculate alert counts for dashboard
  const getAlertCounts = () => {
    const unresolvedAlerts = alerts.filter(a => !a.resolved && a.status !== 'Resolved').length;
    const underInvestigationAlerts = alerts.filter(a => a.status === 'under_investigation').length;
    const resolvedAlerts = alerts.filter(a => a.resolved || a.status === 'Resolved').length;
    
    return {
      unresolved: unresolvedAlerts,
      underInvestigation: underInvestigationAlerts,
      resolved: resolvedAlerts
    };
  };

  const alertCounts = getAlertCounts();

  if (loading) {
    return (
      <div className="blockchain-monitor-loading">
        <div className="loading-spinner"></div>
        <p>Loading Blockchain Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blockchain-monitor-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchBlockchainData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="blockchain-monitor">
      <div className="monitor-header">
        <h1>Blockchain Monitoring Dashboard</h1>
        <div className="header-controls">
          <div className="auto-refresh">
            <label>
              <input 
                type="checkbox" 
                checked={autoRefresh} 
                onChange={() => setAutoRefresh(!autoRefresh)} 
              />
              Auto Refresh
            </label>
          </div>
          <button onClick={fetchBlockchainData} className="refresh-btn">
            Refresh Now
          </button>
        </div>
      </div>

      <div className="monitor-overview">
        <div className="overview-card">
          <h3>Total Blocks</h3>
          <p className="overview-value">{stats.totalBlocks || blocks.length || 0}</p>
        </div>
        <div className="overview-card">
          <h3>Total Transactions</h3>
          <p className="overview-value">{stats.totalTransactions || 0}</p>
        </div>
        <div className="overview-card">
          <h3>Chain Status</h3>
          <p style={{backgroundColor:'white'}} className={`overview-value ${chainValid ? 'status-valid' : 'status-invalid'}`}>
            {chainValid ? 'Valid' : 'Compromised'}
          </p>
        </div>
        <div className="overview-card">
          <h3>Unresolved Alerts</h3>
          <p className="overview-value">{alertCounts.unresolved}</p>
        </div>
        <div className="overview-card">
          <h3>Under Investigation</h3>
          <p className="overview-value">{alertCounts.underInvestigation}</p>
        </div>
        <div className="overview-card">
          <h3>Resolved Alerts</h3>
          <p className="overview-value">{alertCounts.resolved}</p>
        </div>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by block index, hash, or transaction ID..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchKeyPress}
          />
          <button onClick={searchBlockchain}>Search</button>
        </div>
      </div>

      <div className="monitor-content">
        <div className="blockchain-visualization">
          <h2>Blockchain Visualization {blocks.length > 0 && `(${blocks.length} blocks)`}</h2>
          
          {blocks.length === 0 ? (
            <div className="no-blocks-message">
              <p>No blocks found in the blockchain.</p>
              <p>This could be because:</p>
              <ul>
                <li>No transactions have been made yet</li>
                <li>The blockchain database is empty</li>
                <li>There's an issue with the API connection</li>
              </ul>
            </div>
          ) : (
            <div className="blocks-container">
              {blocks.map((block, index) => (
                <div key={block._id || block.hash || index} className="block-wrapper">
                  {index > 0 && <div className="block-connector"></div>}
                  <div 
                    className={`block-item ${selectedBlock && selectedBlock.index === block.index ? 'selected' : ''}`}
                    onClick={() => setSelectedBlock(block)}
                  >
                    <div className="block-header">
                      <span className="block-index">#{block.index}</span>
                      {block.index === 0 && <span className="genesis-label">Genesis</span>}
                    </div>
                    <div className="block-hash">
                      {block.hash ? `${block.hash.substring(0, 12)}...${block.hash.substring(block.hash.length - 6)}` : 'No hash'}
                    </div>
                    <div className="block-timestamp">
                      {block.timestamp ? new Date(block.timestamp).toLocaleTimeString() : 'No timestamp'}
                    </div>
                    <button 
                      className="verify-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        verifyBlockIntegrity(block.index);
                      }}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="details-panel">
          {selectedBlock ? (
            <div className="block-details">
              <h2>Block #{selectedBlock.index} Details</h2>
              <div className="detail-section">
                <h3>Block Information</h3>
                <div className="detail-row">
                  <span>Hash:</span>
                  <span className="hash-value">{selectedBlock.hash || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <span>Previous Hash:</span>
                  <span className="hash-value">{selectedBlock.previousHash || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <span>Timestamp:</span>
                  <span>{selectedBlock.timestamp ? new Date(selectedBlock.timestamp).toLocaleString() : 'N/A'}</span>
                </div>
              </div>

              {selectedBlock.transaction && (
                <div className="detail-section">
                  <h3>Transaction</h3>
                  <div className="detail-row">
                    <span>Transaction ID:</span>
                    <span>{selectedBlock.transaction.transactionId || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span>Sender:</span>
                    <span>{selectedBlock.transaction.sender || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span>Receiver:</span>
                    <span>{selectedBlock.transaction.receiver || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span>Amount:</span>
                    <span className="amount">{selectedBlock.transaction.amount || 'N/A'}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <h3>Select a block to view details</h3>
              <p>{blocks.length > 0 ? 
                "Click on any block in the visualization to see its details here" : 
                "No blocks available to display"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="alerts-panel">
        <h2>Tamper Detection Alerts</h2>
        {alerts.length > 0 ? (
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert._id} className={`alert-item ${alert.resolved || alert.status === 'resolved' ? 'resolved' : 
                                              alert.status === 'under investigation' ? 'investigating' : 'active'}`}>
                <div className="alert-content">
                  <div className="alert-title">{alert.title}</div>
                  <div className="alert-description">{alert.description}</div>
                  <div className="alert-meta">
                    <span>Block: #{alert.blockIndex}</span>
                    <span>Detected: {alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'N/A'}</span>
                    <span className={`alert-status ${alert.status || (alert.resolved ? 'resolved' : 'unresolved')}`}>
                      Status: {alert.status || (alert.resolved ? 'Resolved' : 'Unresolved')}
                    </span>
                  </div>
                </div>
                {!(alert.resolved || alert.status === 'resolved' || alert.status === 'under investigation') && (
                  <div className="alert-actions">
                    <button 
                      className="resolve-btn"
                      onClick={() => handleTamperAlert(alert._id, 'resolve')}
                    >
                      Mark Resolved
                    </button>
                    <button 
                      className="investigate-btn"
                      onClick={() => handleTamperAlert(alert._id, 'investigate')}
                    >
                      Investigate
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-alerts">
            <p>No active alerts. Blockchain integrity is maintained.</p>
          </div>
        )}
      </div>
    </div>
  );
}