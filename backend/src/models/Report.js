// backend/src/models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  email: String,
  duration: String,
  rawInput: String,
  symptoms: [String],
  severity: String,
  diagnosis: [String], // top 3 from diagnosis API
  recommendedActions: [String],
  images: [String], // base64 strings
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  assigned_volunteer: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer", default: null },
  status: { type: String, enum: ['pending', 'assigned', 'completed', 'awaitingApproval', 'outOfScope', 'followUp'], default: 'pending' },
  prescription: { type: String, default: "" },
  approvalToken: { type: String },         // unique token for approval link
  supervisorAction: { type: String },    
}, { timestamps: true });

reportSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Report", reportSchema);
