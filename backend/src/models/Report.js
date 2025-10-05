// backend/src/models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  duration: String,
  rawInput: String,
  symptoms: [String],
  severity: String,
  diagnosis: [String], // top 3 from diagnosis API
  recommendedActions: [String],
  images: [String] // base64 strings
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
