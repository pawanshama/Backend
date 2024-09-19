const express = require('express');
const bcrypt = require('bcryptjs');  // For password hashing
const jwt = require('jsonwebtoken'); // For JWT tokens
const User = require('../models/leads'); // Your user model
const router = express.Router();

// JWT secret key (ensure this is stored securely, e.g., in a .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Login route
router.post('/login', async (req, res) => {
  const { email, password, company } = req.body;

  try {
    // Check if the user exists with the provided email and company
    const user = await User.findOne({ email, company });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
app.post('/SignUp', async(req, res) => {
    try {
      const { name, email, password, company,responsibility } = req.body;
      console.log(req.body);
      const newVolunteer = await new VolunteerSchema({ name, email, password, company, responsibility});
      await newVolunteer.save();
      res.json({ success: true, message: 'Volunteer registered successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error registering volunteer' });
    }
});

module.exports = router;