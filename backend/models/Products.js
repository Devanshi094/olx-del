const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: String,
  description: String,
  location: String,
  images: {
    type: [String], // Array to store multiple image URLs
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
