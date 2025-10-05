// backend/src/index.js
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();
app.use(express.json());

// import routes
const reports = require('./routes/report.js');

app.use('/reports', reports);

// keep .env port as first option, fallback to 3000
const PORT = process.env.PORT || 3000;

// start listening
app.listen(PORT, () => {
  console.log(`App available on http://localhost:${PORT}`);
});
