const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/olx", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB Connected");
    process.exit(); // Exit after successful connection
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit with error
  });
