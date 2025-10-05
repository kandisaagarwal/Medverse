// backend/src/utils/assignVolunteer.js
const Volunteer = require("../models/Volunteer");
const Report = require("../models/Report");

async function assignVolunteer(reportId) {
  try {
    // Fetch the report from MongoDB
    const report = await Report.findById(reportId);
    if (!report) {
      console.warn(`Report with id ${reportId} not found.`);
      return;
    }

    if (!report.location || !report.location.coordinates) {
      console.warn("Report has no location, cannot assign volunteer.");
      return;
    }

    // Find nearest volunteer sorted by distance and then by currentQueue
    const volunteers = await Volunteer.find({
      location: { $near: { $geometry: report.location } }
    })
      .sort({ currentQueue: 1 })  // prioritize volunteers with fewer assigned reports
      .limit(10);                  // optional: limit to top 10 nearest volunteers

    if (!volunteers || volunteers.length === 0) {
      console.warn("No available volunteers found.");
      return;
    }

    const selectedVolunteer = volunteers[0];

    // Update report with assigned volunteer
    report.assigned_volunteer = selectedVolunteer._id;
    await report.save();

    // Increment volunteer's currentQueue
    selectedVolunteer.currentQueue += 1;
    await selectedVolunteer.save();

    console.log(`Assigned volunteer ${selectedVolunteer.name} (${selectedVolunteer._id}) to report ${report._id}`);
  } catch (err) {
    console.error("Error assigning volunteer:", err);
  }
}

module.exports = { assignVolunteer };
