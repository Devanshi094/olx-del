const express = require("express");
const router = express.Router();
const Products = require("../models/Products");
const upload = require("../middleware/multer");
const cloudinary = require("../config/cloudinary");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.post("/upload", upload.array("images", 5), async (req, res) => {
    try {
      let imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "olx-products", // Create a folder in Cloudinary
        });
        imageUrls.push(result.secure_url);
      }
      res.json({ success: true, urls: imageUrls });
    } catch (error) {
      console.error("Error uploading images:", error);
      res.status(500).json({ success: false, error: "Image upload failed" });
    }
  });

  router.post("/add", async (req, res) => {
    const { title, price, category, description, location, images } = req.body;

    try {
        const newProduct = new Products({
          title,
          price,
          category,
          description,
          location,
          images, // Array of Cloudinary URLs
        });
    
        await newProduct.save();
        res.status(201).json(newProduct);
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Failed to add product" });
      }
    });
    
module.exports = router;
