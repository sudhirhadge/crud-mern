// Importing the Mongoose module
const mongoose = require("mongoose");

// Defining a schema for the Item model
const ItemSchema = new mongoose.Schema({
  name: {
    type: String, // The name field is of type String
    required: true, // The name field is required (must be provided)
  },
  description: {
    type: String, // The description field is of type String
    required: true, // The description field is required (must be provided)
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // The user field references a User model
    ref: 'User', // Reference to the User model
    required: true, // The user field is required (must be provided)
  }
});

// Exporting the Item model based on the ItemSchema
module.exports = mongoose.model("Item", ItemSchema);
