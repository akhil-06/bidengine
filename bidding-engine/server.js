const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bidRoutes = require('./routes/bidRoutes');
const userRoutes = require('./routes/userRoutes');
const { mongoURI } = require('./config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/bids', bidRoutes);
app.use('/api/users', userRoutes);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join-bid', (bidId) => {
        socket.join(bidId);
    });

    socket.on('place-bid', async ({ bidId, userId, amount }) => {
        const bidItem = new BidItem({ bidId, userId, amount });
        await bidItem.save();

        const bidItems = await BidItem.find({ bidId }).sort({ amount: -1 });
        io.to(bidId).emit('update-leaderboard', bidItems);
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
