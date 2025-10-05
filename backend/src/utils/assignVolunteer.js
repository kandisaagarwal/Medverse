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
      status: "pending" // consider only pending volunteers
    })
      .where('location').near({ 
        center: { type: "Point", coordinates: report.location.coordinates } 
      })
      .sort({ currentQueue: 1 })  // prioritize volunteers with fewer assigned reports
      .limit(10);

    if (!volunteers || volunteers.length === 0) {
      console.warn("No available volunteers found.");
      return;
    }

    const selectedVolunteer = volunteers[0];

    // Update report with assigned volunteer and set report status
    report.assigned_volunteer = selectedVolunteer._id;
    report.status = "assigned";       // <--- set report status here
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
