const express = require('express');
const mongoose = require('mongoose');
const volunteerRoutes = require('./routes/volunteers');
const staffRoutes = require('./routes/staff');
const leadRoutes = require('./routes/lead');
const cors = require('cors');


const eventRoutes = require('./routes/events');
require('dotenv').config(); // Load environment variables from .env file

// const mongoURI = process.env.MONGO_URI;
// const jwtSecret = process.env.JWT_SECRET || 'mySecretKey'; // Use fallback for local dev
const x = `mongodb+srv://pawansharma02020200:${secretConnection}@vms.tqk8k.mongodb.net/?retryWrites=true&w=majority&appName=VMS`;

const app = express();
//Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection string (Use your Atlas connection string here)
const mongoURI = x;

// Connect to MongoDB , useUnifiedTopology: true, , {useNewUrlParser: true}
mongoose.connect(mongoURI,{useNewUrlParser: true ,useUnifiedTopology: true})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// const user = require('./models/volunteer');


// Routes
app.use('/register', volunteerRoutes);
app.use('/events', eventRoutes);
app.use('/Staff', staffRoutes);
app.use('/Lead', leadRoutes);


app.listen(8000, () => {
  console.log('Server running on port 8000')
});
