const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  location: String,
  propertyType: String,
});

const Rent = mongoose.model("Rent", rentSchema);
module.exports = Rent;
