// backend/src/models/Volunteer.js
const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: { type: String },
  supervisorEmail: { type: String },
  currentQueue: { type: Number, default: 0 },        // current number of assigned reports
  totalReportsReviewed: { type: Number, default: 0 },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
  }
}, { timestamps: true });

// 2dsphere index for geospatial queries
volunteerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Volunteer", volunteerSchema);