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


// Login a user with cookies 
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    // if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" }); // to get the response in success change status to 200

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    // if (!isMatch) return res.status(200).json({ message: "Invalid credentials" });
    const users = await User.find();
    // users.forEach(user => console.log(`User: ${user.username}, ID: ${user._id}`));
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRETNEW, { expiresIn: "1m" }); // short lived token for testing
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETNEW, { expiresIn: "1h" }); // id wont work here - check later
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" }); // refresh token with longer expiry
    console.log(`Generated access token for user ${user.username} with ID ${user._id}: ${accessToken}`);
    console.log(`Generated refresh token for user ${user.username} with ID ${user._id}: ${refreshToken}`);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    }).json({ accessToken, username: user.username, message: "Login successful", expiresIn: "1m" });

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

router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET
    );

    /*
decoded = {
  userId: "...",
  iat: ...,
  exp: ...
}
    */

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRETNEW,
      { expiresIn: "15m" }
    );

    res.json({ accessToken, message: "Access token refreshed successfully" });

  } catch (err) {
    return res.sendStatus(403);
  }
});

module.exports = router;
