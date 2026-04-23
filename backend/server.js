// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const matchupRoutes = require('./routes/matchups');
app.use('/api/matchups', matchupRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB Atlas!'))
    .catch((err) => console.error('MongoDB connection error:', err));
// We will connect to MongoDB here in the next step!

app.get('/', (req, res) => {
    res.json({ message: "Matchup Tracker API is running." });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
