const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

// Dummy chatbot responses (will replace later with AI model)
const responses = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! Need any help?",
    "how are you": "I'm just a bot, but I'm here to help!",
    
    // Buying & Selling
    "buy": "You can browse products on our marketplace! Check out the latest listings.",
    "sell": "You can list your product on our platform! Just go to the 'Post Ad' section.",
    "how to sell": "Click on 'Post Ad', fill in product details, upload images, and submit!",
    "how to buy": "Browse listings, click on a product, and contact the seller.",
    "negotiate": "You can negotiate with sellers by sending them a message.",
    
    // Account & Authentication
    "sign up": "You can create an account by clicking on 'Sign Up' at the top right.",
    "log in": "Click on 'Log In' and enter your credentials to access your account.",
    "forgot password": "Click on 'Forgot Password' and follow the instructions to reset it.",
    "update profile": "Go to 'My Account' and update your profile details.",
    
    // Payments & Transactions
    "payment methods": "Payment methods depend on the seller. You can discuss this with them.",
    "safe payment": "Always prefer secure payment methods and avoid sharing personal details.",
    "refund policy": "Since we are a marketplace, refunds depend on the seller’s policies.",
    "cash on delivery": "Some sellers may allow cash on delivery. You can check with them.",
    
    // Safety & Security
    "scam": "Beware of too-good-to-be-true deals. Never share personal or financial details.",
    "report scam": "If you suspect fraud, report the listing using the 'Report' button.",
    "blocked account": "If your account is blocked, contact support for assistance.",
    
    // Contact & Support
    "customer support": "You can reach our support team at support@del.com.",
    "contact": "You can find our contact details on the 'Contact Us' page.",
    "business inquiry": "For business inquiries, email us at business@del.com.",
    
    // Default response
    "default": "I'm not sure how to respond to that. Can you rephrase?"
  };
  

// Chatbot API with chat history storage
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message is required!" });
  }

  const reply = responses[message.toLowerCase()] || responses["default"];

  try {
    // Save chat to MongoDB
    const chat = new Chat({ userMessage: message, botResponse: reply });
    await chat.save();

    res.json({ reply });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ reply: "Error saving chat history." });
  }
});

// Fetch chat history
router.get("/history", async (req, res) => {
    try {
      const chatHistory = await Chat.find().sort({ timestamp: -1 }).limit(20);
      res.json(chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Error fetching chat history." });
    }
  });
  

module.exports = router;
