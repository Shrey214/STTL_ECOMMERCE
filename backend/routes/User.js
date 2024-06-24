// Import the required modules
const express = require("express");
const app = express.Router();

// Import the required controllers and middleware functions
const { login, signup, sendotp } = require("../controllers/Auth");

// Route for user login
app.post("/login", login);

// Route for user signup
app.post("/signup", signup);

// Route for sending OTP to the user's email
app.post("/sendotp", sendotp);

module.exports = app;
