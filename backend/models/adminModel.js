// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const adminSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     default: "admin",
//   },
// });

// // Password hashing before saving
// // Hash password before saving
// adminSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   });
  
//   // ✅ Fix Here - Check if Model Exists
// const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

// module.exports = Admin;
