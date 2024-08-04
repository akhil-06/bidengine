const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    title: String,
    items: [{ description: String }],
    startTime: Date,
    endTime: Date,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Bid', bidSchema);
