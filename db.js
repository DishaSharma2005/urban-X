// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,               // ⚡ Faster queries & concurrency
      serverSelectionTimeoutMS: 5000 // ⚡ Fail fast instead of hanging
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

module.exports = connectDB;
