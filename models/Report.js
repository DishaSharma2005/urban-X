const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    // For multiple photos (Cloudinary URLs in future)
    photos: [String],

    // For demo (local file upload, single image)
    image: String, // stores path like "/uploads/12345-photo.jpg"

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

    placeName: String, // human-readable address (reverse geocoding)

    wardId: {
      type: String, // will be auto-assigned via ward router
    },

    category: {
      type: String,
      enum: ["infrastructure", "electric", "waste"],
      required: true,
    },

    subCategory: {
      type: String,
      enum: [
        "pothole",
        "road",
        "streetlight",
        "powercut",
        "waterlogging",
        "contaminatedwater",
      ],
      required: true,
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
  },
  { timestamps: true }
);

reportSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Report", reportSchema);
