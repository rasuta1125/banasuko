const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェア
app.use(cors());
app.use(express.json());

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'banasuko01',
    timestamp: new Date().toISOString()
  });
});

// 接続状態確認
app.get('/status', (req, res) => {
  res.json({
    success: true,
    connections: [
      {
        id: 'conn-1',
        type: 'database',
        status: 'connected',
        lastSeen: new Date().toISOString(),
        endpoint: process.env.DB_HOST || 'localhost'
      }
    ],
    overallStatus: 'healthy'
  });
});

// 接続確立
app.post('/connect', (req, res) => {
  const { connectionType, connectionData } = req.body;
  
  if (!connectionType || !['database', 'api', 'service'].includes(connectionType)) {
    return res.status(400).json({ 
      success: false, 
      error: '無効な接続タイプです' 
    });
  }
  
  const connectionResult = {
    success: true,
    connection: {
      id: `conn-${Date.now()}`,
      type: connectionType,
      status: 'connected',
      timestamp: new Date().toISOString(),
      data: connectionData || {}
    },
    message: 'banasuko01への接続が確立されました'
  };
  
  res.json(connectionResult);
});

// 接続切断
app.post('/disconnect', (req, res) => {
  const { connectionId } = req.body;
  
  if (!connectionId) {
    return res.status(400).json({ 
      success: false, 
      error: '接続IDが必要です' 
    });
  }
  
  const disconnectResult = {
    success: true,
    message: `接続 ${connectionId} が正常に切断されました`,
    timestamp: new Date().toISOString()
  };
  
  res.json(disconnectResult);
});

app.listen(PORT, () => {
  console.log(`Banasuko01 service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
