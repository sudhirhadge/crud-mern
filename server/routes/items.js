const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth"); // Importing the authentication middleware

// Create - POST request to add a new item
/*
/*

    Middleware Execution:
When a request is made to the "/" route, the auth middleware is executed first.
The auth middleware verifies the JWT, extracts the userId from the token, and sets req.user to this userId.
Accessing req.user:
After the auth middleware successfully verifies the token and sets req.user, the route handler can access req.user.
In this case, Item.find({ user: req.user }) uses req.user to filter items by the user ID, ensuring that only 
items belonging to the authenticated user are retrieved.
    
*/
router.post("/", auth, async (req, res) => {
  const newItem = new Item({
    ...req.body,
    user: req.user // Associate item with the logged-in user
  });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read - GET request to retrieve all items
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user }).sort({ name: 1 }); // Filter items by user ID
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update - PUT request to update an item by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, // Ensure the item belongs to the user
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete - DELETE request to delete an item by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, user: req.user }); // Ensure the item belongs to the user
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
