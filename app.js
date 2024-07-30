require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const bookingRoutes = require("./routes/bookingRoutes");
const tourRoutes = require("./routes/tourRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

// Routes
app.use("/api", bookingRoutes);
app.use("/api/", tourRoutes);
app.use("/api/", contactRoutes);
app.use("/api/", authRoutes);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve userbookings.html
app.get("/userbookings", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "userbookings.html"));
});

// Serve contact.html
app.get("/contacts", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});
// Serve tours.html
app.get("/tours", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tours.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
