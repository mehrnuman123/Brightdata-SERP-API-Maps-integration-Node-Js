const mongoose = require('mongoose');

// Define the schema for the "users" collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  auth_type: { type: String, required: true },
  // Define a field to establish a relationship with leads model
  leads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }]
});

// Create a Mongoose model for the "users" collection
const User = mongoose.model('User', userSchema);

module.exports = User;
