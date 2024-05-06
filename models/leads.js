const mongoose = require('mongoose');

// Define the schema for the "leads" collection
const leadSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  name: { type: String, required: true },
  leads_data: { type: Array, required: true },
  leads_count: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

// Create a Mongoose model for the "leads" collection
const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
