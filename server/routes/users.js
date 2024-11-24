const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth"); // Importing the authentication middleware

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    // if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user) return res.status(200).json({ message: "Invalid credentials" }); // to get the response in success change status to 200

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    // if (!isMatch) return res.status(200).json({ message: "Invalid credentials" });
    const users = await User.find();
    users.forEach(user => console.log(`User: ${user.username}, ID: ${user._id}`));
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETNEW, { expiresIn: "1h" });
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETNEW, { expiresIn: "1h" }); // id wont work here
    console.log(`Generated token for user ${user.username} with ID ${user._id}: ${token}`);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users (for testing purposes)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get logged-in user's information
router.get("/me", auth, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password'); //if id as payload in jw
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
