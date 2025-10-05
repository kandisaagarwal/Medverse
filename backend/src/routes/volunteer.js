const express = require('express');
const router = express.Router();
const Volunteer = require("../models/Volunteer")
const { getLatLong } = require("../utils/geocode")

router.post("/addVolunteer", async (req, res) => {
  try {
    const { name, school, supervisorEmail, city, country } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Get latitude and longitude
    const { lat, long } = await getLatLong(city, country);

    // Create the volunteer document
    const volunteer = new Volunteer({
      name,
      school,
      supervisorEmail,
      location: {
        type: "Point",
        coordinates: long && lat ? [long, lat] : [0, 0]
      }
    });

    const savedVolunteer = await volunteer.save();
    res.status(201).json({ message: "Volunteer added", volunteer: savedVolunteer });
  } catch (err) {
    console.error("Error adding volunteer:", err);
    res.status(500).json({ error: "Failed to add volunteer" });
  }
});

module.exports = router;
