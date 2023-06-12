const express = require('express');
const jwt = require('jsonwebtoken');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const router = express.Router();
const adapter = new FileSync('db.json');
const db = low(adapter);

// Middleware för att autentisera JWT-token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    
    req.user = user;
    next();
  });
};

// GET /api/channels/:channelId/messages
router.get('/channels/:channelId/messages', authenticateToken, (req, res) => {
  const channelId = req.params.channelId;
  const messages = db.get('channels')
                    .find({ id: channelId })
                    .get('messages')
                    .value();

  res.json({ messages: messages });
});

// POST /api/channels/:channelId/messages
router.post('/channels/:channelId/messages', authenticateToken, (req, res) => {
  const channelId = req.params.channelId;
  const message = req.body.message;

  // Spara meddelandet i databasen
  db.get('channels')
    .find({ id: channelId })
    .get('messages')
    .push({ text: message, timestamp: Date.now(), userId: req.user.id })
    .write();

  res.json({ message: message });
});

// POST /api/users/:userId/messages
router.post('/users/:userId/messages', authenticateToken, (req, res) => {
  const userId = req.params.userId;
  const message = req.body.message;

  // Spara meddelandet i databasen
  db.get('directMessages')
    .push({ text: message, timestamp: Date.now(), senderId: req.user.id, receiverId: userId })
    .write();

  res.json({ message: message });
});

// GET /api/users/:userId/messages
router.get('/users/:userId/messages', authenticateToken, (req, res) => {
  const userId = req.params.userId;
  const messages = db.get('directMessages')
                    .filter(message => message.senderId === req.user.id && message.receiverId === userId)
                    .value();

  res.json({ messages: messages });
});

module.exports = router;
