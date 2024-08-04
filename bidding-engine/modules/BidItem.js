const mongoose = require('mongoose');

const bidItemSchema = new mongoose.Schema({
    bidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number
});

module.exports = mongoose.model('BidItem', bidItemSchema);
