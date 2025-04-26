const mongoose = require('mongoose');

const chatResponseSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  response: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['general', 'price', 'product', 'meeting', 'custom'],
    default: 'general'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Pre-populate with common responses
chatResponseSchema.statics.initializeResponses = async function() {
  const defaultResponses = [
    { question: "Is it still available?", response: "Yes, it's still available.", category: "general" },
    { question: "Let's meet up?", response: "Sure, I'm available on weekends. When would you like to meet?", category: "meeting" },
    { question: "What is the location?", response: "I'm located in Bangalore, near MG Road.", category: "meeting" },
    { question: "Can you share pictures?", response: "I've just uploaded more pictures to the listing. Please check.", category: "product" },
    { question: "What's the condition?", response: "It's in excellent condition, barely used.", category: "product" },
    { question: "Any warranty left?", response: "Yes, it has 6 months of warranty remaining.", category: "product" },
    { question: "Why are you selling?", response: "I'm upgrading to a newer model.", category: "general" },
    { question: "Is price negotiable?", response: "There's a little room for negotiation, what's your offer?", category: "price" },
    { question: "How old is it?", response: "It's about 1 year old.", category: "product" },
    { question: "Any damages?", response: "No damages, it's in perfect working condition.", category: "product" }
  ];

  const count = await this.countDocuments();
  if (count === 0) {
    await this.insertMany(defaultResponses);
    console.log('Default chat responses initialized');
  }
};

const ChatResponse = mongoose.model('ChatResponse', chatResponseSchema);

module.exports = ChatResponse;
