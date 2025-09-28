// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔑 secret key for signing tokens (move to env in production!)
const JWT_SECRET = "supersecretkey";

// ===== SIGNUP =====
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if user already exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save new user
    const user = new User({ username, password: hashed });
    await user.save();

    // Generate JWT including username
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===== LOGIN =====
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT including username
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
