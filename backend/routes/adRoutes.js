const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");
const upload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

// ✅ POST - Upload Ad or Product with Images
// ✅ POST - Upload Ad or Product with Images
router.post("/", upload.array("photos", 10), async (req, res) => {
  console.log("POST /api/ads called");
  try {
    // Process the ad data
    const adData = req.body;

    // Use a simpler approach for Cloudinary uploads
    const uploadedImages = [];
    
    // Use the Cloudinary Node.js SDK's built-in functionality
    for (const file of req.files) {
      try {
        // Convert buffer to base64
        const base64Data = file.buffer.toString('base64');
        const dataURI = `data:${file.mimetype};base64,${base64Data}`;
        
        // Upload to Cloudinary without specifying a folder
        const result = await cloudinary.uploader.upload(dataURI);
        uploadedImages.push(result.secure_url);
      } catch (err) {
        console.error("Error uploading to Cloudinary:", err);
      }
    }

    // Create new ad with image URLs
    const newAd = new Ad({ 
      ...adData, 
      photos: uploadedImages,
      name: adData.name || "Anonymous",
      phone: adData.phone || "0000000000"
    });
    
    await newAd.save();
    res.status(201).json({ message: "Ad posted successfully", ad: newAd });
  } catch (error) {
    console.error("Error posting ad:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


// ✅ GET - Fetch All Ads
router.get("/", async (req, res) => {
  console.log("GET /api/ads called");
  try {
    const ads = await Ad.find({});
    res.json(ads);
  } catch (error) {
    console.error("Error fetching ad:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
