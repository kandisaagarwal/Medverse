const express = require('express');
const router = express.Router();
const Volunteer = require("../models/Volunteer")
const Report = require("../models/Report")
const { getLatLong } = require("../utils/geocode")
const { sendHealthReportEmail } = require('../utils/sendUserEmail')
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

router.post("/addVolunteer", async (req, res) => {
  try {
    const { name, email, password, school, supervisorEmail, city, country } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Get latitude and longitude
    const { lat, long } = await getLatLong(city, country);

    // Create the volunteer document
    const volunteer = new Volunteer({
      name,
      email,
      password, // store as plaintext for MVP (later hash it)
      school,
      supervisorEmail,
      location: {
        type: "Point",
        coordinates: lat && long ? [long, lat] : [0, 0] // [longitude, latitude]
      }
    });

    const savedVolunteer = await volunteer.save();
    res.status(201).json({ message: "Volunteer added", volunteer: savedVolunteer });
  } catch (err) {
    console.error("Error adding volunteer:", err);
    res.status(500).json({ error: "Failed to add volunteer" });
  }
});


//look for response.valid and then extract details
router.post("/isValid", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ valid: false, message: "Email and password required" });
  }

  try {
    // Look for volunteer by email
    const volunteer = await Volunteer.findOne({ email });

    if (!volunteer) {
      return res.status(401).json({ valid: false, message: "User not found" });
    }

    // For MVP, check plaintext password
    if (volunteer.password !== password) {
      return res.status(401).json({ valid: false, message: "Incorrect password" });
    }

    // Login success
    return res.json({ valid: true, volunteerId: volunteer._id, name: volunteer.name, email: volunteer.email });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ valid: false, message: "Server error" });
  }
});

//get the oldest report that was assigned to the volunteer
router.post("/getFirst", async (req, res) => {
  const { volunteer_id } = req.body;

  if (!volunteer_id) {
    return res.status(400).json({ error: "Volunteer ID required" });
  }

  try {
    // Find the oldest report assigned to this volunteer that is still pending
    const report = await Report.findOne({
      assigned_volunteer: volunteer_id,
      status: "pending"  // only get reports not yet processed
    })
    .sort({ createdAt: 1 }); // oldest first

    if (!report) {
      return res.status(404).json({ error: "No pending reports found for this volunteer" });
    }

    res.json({ report });
  } catch (err) {
    console.error("Error fetching report:", err);
    res.status(500).json({ error: "Server error" });
  }
});



//endpoint for an accepted diagnostic report
router.post("/report/:id/accept", async (req, res) => {
  try {
    //find report
    console.log("Params:", req.params);
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });

     //change status and update db to reflect
    report.status = "complete";
    await report.save();

    //generate pdf:
        // 3️⃣ Generate a simple PDF summary
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 700]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let textY = height - 50;
    const lineHeight = 20;
    const addLine = (text) => {
      page.drawText(text, { x: 50, y: textY, size: 12, font, color: rgb(0, 0, 0) });
      textY -= lineHeight;
    };

    addLine("Medverse Health Report Summary");
    addLine(`Report ID: ${report._id}`);
    addLine(`Date: ${new Date().toLocaleString()}`);
    addLine("");
    addLine(`Patient Email: ${report.email}`);
    addLine(`Age: ${report.age || "N/A"} | Gender: ${report.gender || "N/A"}`);
    addLine("");
    addLine(`Symptoms: ${report.symptoms.join(", ") || "N/A"}`);
    addLine(`Severity: ${report.severity || "N/A"}`);
    addLine("");
    addLine(`Diagnosis: ${report.diagnosis.join(", ") || "N/A"}`);
    addLine("");
    addLine("Recommended Actions:");
    report.recommendedActions.forEach((a, i) => addLine(`${i + 1}. ${a}`));

    const pdfBytes = await pdfDoc.save();
    const base64Pdf = Buffer.from(pdfBytes).toString("base64");

      // 4️⃣ Send email using your helper
    await sendHealthReportEmail(report, base64Pdf);

      // 5️⃣ Respond
    res.status(200).json({
      message: "Report marked complete and emailed to patient.",
      report,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});




module.exports = router;
