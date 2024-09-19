const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  company: {
    type: String,
    required: true,
  },
  responsibility: {
    type: String,  
    enum: ['Lead', 'Employee'],
    required: true,
  }
}, {
  timestamps: true
});

const User = mongoose.model('Staff', userSchema);

module.exports = User;