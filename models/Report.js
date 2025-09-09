const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  photos: [String], // Cloudinary URLs
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
  wardId: {
    type: String, // will be auto-assigned via ward router
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "fixed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["normal", "high"],
    default: "normal",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  verifiedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  hash: String, // tamper-proof hash
  auditLogs: [
    {
      action: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      hash: String,
    },
  ],
}, { timestamps: true });

reportSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Report", reportSchema);
