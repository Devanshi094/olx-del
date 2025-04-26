const Ad = require("../models/Ad");
const cloudinary = require("../config/cloudinary");

// ✅ Get all ads
exports.getAds = async (req, res) => {
  try {
    const category = req.query.category;
    const query = category && category !== "All" ? { category } : {};
    const ads = await Ad.find(query);
    res.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ message: "Error fetching ads" });
  }
};

// ✅ Get ad by ID
exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ad" });
  }
};

// ✅ Create new ad with Cloudinary Upload
exports.createAd = async (req, res) => {
  try {
    const {
      category,
      brand,
      model,
      year,
      kmDriven,
      adTitle,
      description,
      price,
      state,
      name,
      phone,
    } = req.body;

    // Check required fields
    if (!category || !adTitle || !price || !name || !phone) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    console.log("Uploading images to Cloudinary...");

    // ✅ Upload photos to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "olx-ads",
        });
        return result.secure_url;
      })
    );

    // ✅ Create a new ad with Cloudinary URLs
    const newAd = new Ad({
      category,
      brand,
      model,
      year,
      kmDriven,
      adTitle,
      description,
      price,
      photos: uploadedImages, // Array of URLs
      state,
      name,
      phone,
    });

    await newAd.save();
    res.status(201).json({ success: true, message: "Ad posted successfully!", ad: newAd });
  } catch (error) {
    console.error("Error creating ad:", error);
    res.status(400).json({ success: false, message: "Error creating ad" });
  }
};

// ✅ Update an ad
exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAd) return res.status(404).json({ message: "Ad not found" });
    res.json(updatedAd);
  } catch (error) {
    res.status(400).json({ message: "Error updating ad" });
  }
};

// ✅ Delete an ad
exports.deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) return res.status(404).json({ message: "Ad not found" });
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ad" });
  }
};
