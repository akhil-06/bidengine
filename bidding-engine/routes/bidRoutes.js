const express = require('express');
const Bid = require('../models/Bid');

const router = express.Router();

router.post('/create', async (req, res) => {
    const bid = new Bid(req.body);
    await bid.save();
    res.status(201).send(bid);
});

router.post('/invite', async (req, res) => {
    const { bidId, userIds } = req.body;
    const bid = await Bid.findById(bidId);
    bid.participants.push(...userIds);
    await bid.save();
    res.send(bid);
});

module.exports = router;
