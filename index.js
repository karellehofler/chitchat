const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/index');

const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

mongoose.connect(db.mongoURI).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", data => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room ${data}`);
    });

    socket.on("send_message", data => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("save-client-data", (data) => {
        // var clientId = client
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    });

    socket.broadcast.emit("receive_message", { message: 'Welcome!', username: 'Anon' });
});

app.get('/', (req, res) => {
    req.send('Server is up and running.');
})

server.listen(3001, () => {
    console.log('listening on *:3001');
})