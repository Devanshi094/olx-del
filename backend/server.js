const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const adRoutes = require("./routes/adRoutes");
const productsRoutes = require("./routes/productsRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const chatbotRoutes = require("./routes/chatbotRoutes");
const rentRoutes = require("./routes/rentRoutes");
const chatRoutes = require('./routes/chatRoutes');
const ChatResponse = require('./models/chatResponse');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ Cloudinary Config
require("./config/cloudinary");

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/olx", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/ads", adRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/rent", rentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);

(async () => {
  try {
    await ChatResponse.initializeResponses();
  } catch (error) {
    console.error('Error initializing chat responses:', error);
  }
})();

// ✅ Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});