const express = require("express");
const mongoose = require("./db"); // auto-connects
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors()); // allow cross-origin requests
app.use(bodyParser.json()); // parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // parse form data

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
