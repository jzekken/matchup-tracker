// backend/models/Matchup.js
const mongoose = require('mongoose');

const MatchupSchema = new mongoose.Schema({
    playerCharacter: { type: String, required: true },
    opponentCharacter: { type: String, required: true },
    opponentRank: { type: String, default: "Unknown" },
    result: { type: String, enum: ['Win', 'Loss', 'Draw'], required: true },
    notes: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Matchup', MatchupSchema);