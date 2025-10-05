// backend/src/index.js
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
// app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// import routes
const reports = require('./routes/report.js');

app.use('/reports', reports);

// keep .env port as first option, fallback to 3000
const PORT = process.env.PORT || 3000;

// start listening
app.listen(PORT, () => {
  console.log(`App available on http://localhost:${PORT}`);
});
