const mongoose = require('mongoose');
console.log('Loading chatController module...');

const ChatMessage = require('../models/chatMessage');
const ChatResponse = require('../models/chatResponse');
const User = require('../models/User');
const Products = require('../models/Products'); // Make sure this is correct

console.log('Models imported successfully');

// Get chat history between two users for a specific product
exports.getChatHistory = async (req, res) => {
  console.log('getChatHistory function called');
  try {
    const { userId, otherUserId, productId } = req.params;
    
    const messages = await ChatMessage.find({
      $or: [
        { sender: userId, receiver: otherUserId, productId },
        { sender: otherUserId, receiver: userId, productId }
      ]
    }).sort({ createdAt: 1 });
    
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

console.log('getChatHistory function exported');


// Send a message and get automated response if needed
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, productId, message } = req.body;
    
    // Save the user's message
    const newMessage = new ChatMessage({
      sender: senderId,
      receiver: receiverId,
      message: message,
      productId: productId,
      isRead: false,
      isAutomated: false
    });
    
    await newMessage.save();
    
    // Generate automated response based on message content
    let responseText = "Thanks for your message!";
    
    // Find a matching response from the database
    const keywords = message.toLowerCase().split(' ');
    const possibleResponses = await ChatResponse.find({ isActive: true });
    
    for (const response of possibleResponses) {
      const questionWords = response.question.toLowerCase().split(' ');
      
      // Check if any keywords match the question
      const hasMatch = keywords.some(word => 
        questionWords.some(qWord => 
          qWord.includes(word) || word.includes(qWord)
        )
      );
      
      if (hasMatch) {
        responseText = response.response;
        break;
      }
    }
    
    // Save the automated response
    const automatedResponse = new ChatMessage({
      sender: receiverId,
      receiver: senderId,
      message: responseText,
      productId: productId,
      isRead: false,
      isAutomated: true
    });
    
    await automatedResponse.save();
    
    // Return the response
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      response: responseText
    });
    
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({
      success: false,
      error: "Failed to send message"
    });
  }
};

// Get all chat conversations for a user
exports.getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find all unique conversations
    const conversations = await ChatMessage.aggregate([
      {
        $match: {
          $or: [{ sender: mongoose.Types.ObjectId(userId) }, { receiver: mongoose.Types.ObjectId(userId) }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", mongoose.Types.ObjectId(userId)] },
              { userId: "$receiver", productId: "$productId" },
              { userId: "$sender", productId: "$productId" }
            ]
          },
          lastMessage: { $first: "$message" },
          lastMessageDate: { $first: "$createdAt" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ["$receiver", mongoose.Types.ObjectId(userId)] },
                  { $eq: ["$isRead", false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id.productId",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $project: {
          _id: 0,
          otherUser: { $arrayElemAt: ["$user", 0] },
          product: { $arrayElemAt: ["$product", 0] },
          lastMessage: 1,
          lastMessageDate: 1,
          unreadCount: 1
        }
      }
    ]);
    
    return res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching user conversations:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
