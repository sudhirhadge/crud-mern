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

/* refacrtor like below 

Good question — this is exactly where most backend structure confusion starts.

Right now, **your entire code is in the “route layer” only**. You're mixing all layers together.

Let’s break it down 👇

---

# ✅ 1. What you currently have

### 🔹 ROUTE (Present)

```js
router.post("/", auth, async (req, res) => { ... });
router.get("/", auth, async (req, res) => { ... });
router.put("/:id", auth, async (req, res) => { ... });
router.delete("/:id", auth, async (req, res) => { ... });
```

👉 This is **routing layer**

* Defines **URL + HTTP method**
* Applies middleware (`auth`)
* Handles request/response directly (currently)

---

### 🔹 CONTROLLER (❌ Missing)

Controller should:

* Take `req`
* Call service
* Send response

👉 But in your code, controller logic is written **inside routes**

Example from your code:

```js
const items = await Item.find({ user: req.user }).sort({ name: 1 });
res.json(items);
```

👉 This should be in a **controller**, not route

---

### 🔹 SERVICE (❌ Missing)

Service should:

* Contain **business logic**
* Interact with DB (Mongoose here)

Example:

```js
Item.find({ user: req.user })
```

👉 This is **service logic**, but you're doing it directly in route

---

# 🧠 Clean Architecture (How it should look)

## 📁 Folder Structure

```
routes/
  itemRoutes.js

controllers/
  itemController.js

services/
  itemService.js
```

---

# ✨ Refactored Example

## ✅ 1. Route (ONLY routing)

```js
router.get("/", auth, getItems);
```

---

## ✅ 2. Controller

```js
// controllers/itemController.js

const itemService = require("../services/itemService");

exports.getItems = async (req, res) => {
  try {
    const items = await itemService.getItemsByUser(req.user);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

---

## ✅ 3. Service

```js
// services/itemService.js

const Item = require("../models/Item");

exports.getItemsByUser = async (userId) => {
  return await Item.find({ user: userId }).sort({ name: 1 });
};
```

---

# 🔥 Simple Understanding

| Layer          | Responsibility      |
| -------------- | ------------------- |
| **Route**      | URL + middleware    |
| **Controller** | Handle req/res      |
| **Service**    | Business logic + DB |

---

# ⚡ Your Code in One Line

👉 You currently have:

```
Route + Controller + Service = ALL MIXED TOGETHER
```

---

# 🚀 Why separate?

* Reusable logic (services)
* Clean & scalable (important for big apps)
* Easy testing
* Cleaner code (no huge route files)

---

# 💡 Quick Rule (Remember this)

> If you see `Item.find()` → it belongs in **service**
> If you see `req/res` → it belongs in **controller**
> If you see `router.get/post` → it's **route**

---

If you want, I can refactor your full file into proper MVC structure (copy-paste ready).
*/


