// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/adminModel");
// const adminLogin  = require("../controllers/adminController");

// // Admin Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });
//     console.log("Admin found:", admin); // ✅ Debug admin
//     if (!admin) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     console.log("Password match:", isMatch); // ✅ Debug password comparison

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const payload = { admin: { id: admin.id, role: "admin" } };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.json({ token });
//     console.log("Generated token:", token); // ✅ Debug token

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;
