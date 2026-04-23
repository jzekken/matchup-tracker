// backend/routes/matchups.js
const express = require('express');
const router = express.Router();
const Matchup = require('../models/Matchup');

// GET: Fetch all matchups
router.get('/', async (req, res) => {
    try {
        const matchups = await Matchup.find().sort({ date: -1 });
        res.json(matchups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Add a new matchup record
router.post('/', async (req, res) => {
    const newMatchup = new Matchup({
        playerCharacter: req.body.playerCharacter,
        opponentCharacter: req.body.opponentCharacter,
        opponentRank: req.body.opponentRank,
        result: req.body.result,
        notes: req.body.notes
    });

    try {
        const savedMatchup = await newMatchup.save();
        res.status(201).json(savedMatchup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;