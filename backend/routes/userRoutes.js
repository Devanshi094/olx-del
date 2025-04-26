const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth"); // Authentication middleware

// Get user profile (add this if you don't have it)
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile - KEEP ONLY THIS PUT ROUTE
router.put("/:id", auth, async (req, res) => {
  const { username, email, phone, location, bio } = req.body;

  // Build user object
  const userFields = {};
  if (username) userFields.username = username;
  if (email) userFields.email = email;
  if (phone) userFields.phone = phone;
  if (location) userFields.location = location;
  if (bio) userFields.bio = bio;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Make sure user owns profile
    // IMPORTANT: Convert both IDs to strings for comparison
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
