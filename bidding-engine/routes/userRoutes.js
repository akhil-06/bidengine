const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/accept', async (req, res) => {
    const { userId, bidId } = req.body;
    // Logic for accepting the bid
    res.send({ message: 'Bid accepted' });
});

module.exports = router;
