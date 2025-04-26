const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

console.log('chatController loaded:', chatController);
console.log('getChatHistory function:', chatController.getChatHistory);

// Get chat history between two users for a specific product
router.get('/history/:userId/:otherUserId/:productId', chatController.getChatHistory);

// Send a message and get automated response
router.post('/send', chatController.sendMessage);

// Get all chat conversations for a user
router.get('/conversations/:userId', chatController.getUserConversations);

module.exports = router;
