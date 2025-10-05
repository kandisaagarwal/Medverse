const express = require("express");

const app = express();

//import routes
const reports = require('./routes/report.js')

app.use('/reports', reports);


// keep .env port as the first option and if it fails go with 3000
PORT = process.env.PORT || 3000;

//start listening
app.listen(PORT, () => {
		console.log("App available on port http:://localhost:$PORT");
    })



