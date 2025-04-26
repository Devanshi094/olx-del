// const Admin = require("../models/adminModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email: email.toLowerCase() });

//     if (!admin || admin.role !== "admin") {
//       return res.status(401).json({ message: "Invalid credentials or not an admin" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ token, message: "Admin logged in successfully" });
//   } catch (error) {
//     console.error("Error during admin login:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { loginAdmin };
