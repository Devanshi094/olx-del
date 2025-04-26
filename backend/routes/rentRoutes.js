const express = require("express");
const router = express.Router();
const Rent = require("../models/Rent"); // Import MongoDB Model

// API Route to handle form submission
router.post("/", async (req, res) => {
  try {
    const newRent = new Rent(req.body);
    await newRent.save();
    res.status(201).json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
