const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
   category: { type: String, required: true },
   brand: String,
   model: String,
   year: String,
   kmDriven: String,
   adTitle: { type: String, required: true },
   description: String,
   price: { type: Number, required: true },
   photos: [String],
   state: String,
   name: { type: String, required: true },
   phone: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
});

const Ad = mongoose.model("Ad", adSchema);
module.exports = Ad;
