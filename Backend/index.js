const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('drawShape', (shapeType, shapeData) => {
        // Handle the drawShape event
        console.log('Received drawShape event:', shapeType, shapeData);

        // Broadcast the shape data to all connected clients except the sender
        socket.broadcast.emit('drawShape', shapeType, shapeData);
    });

    socket.on('updateShape', (shapeType, updatedShapeData) => {
        // Broadcast the updated shape data to all connected clients except the sender
        console.log('Received updateShape event:', shapeType, updatedShapeData);
        socket.broadcast.emit('updateShape', shapeType, updatedShapeData);
    });

    socket.on('eraseShapes', (mouseX, mouseY) => {
        // Broadcast the eraseShapes event to all connected clients except the sender
        socket.broadcast.emit('eraseShapes', mouseX, mouseY);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
