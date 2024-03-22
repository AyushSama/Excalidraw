const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());

// Map to store session codes
const sessionCodes = new Map();

// Socket.IO events
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('createSession', (creatorCode) => {
        sessionCodes.set(creatorCode, true); // Store the creator code in the map
        socket.emit('sessionCreated', creatorCode);
    });

    socket.on('joinSession', (sessionCode) => {
        if (sessionCodes.has(sessionCode)) {
            socket.join(sessionCode);
            socket.emit('sessionJoined', sessionCode);
            console.log(`User ${socket.id} joined session ${sessionCode}`);
        } else {
            socket.emit('sessionJoinError', 'Invalid session code');
        }
    });

    socket.on('drawShape', (sessionCode, shapeType, shapeData) => {
        if (socket.rooms.has(sessionCode)) {
            // Broadcast the shape data to all connected clients in the session
            io.to(sessionCode).emit('drawShape', shapeType, shapeData);
        } else {
            console.log('Unauthorized attempt to draw shape.');
        }
    });

    socket.on('updateShape', (sessionCode, shapeType, updatedShapeData) => {
        if (socket.rooms.has(sessionCode)) {
            // Broadcast the updated shape data to all connected clients in the session
            io.to(sessionCode).emit('updateShape', shapeType, updatedShapeData);
        } else {
            console.log('Unauthorized attempt to update shape.');
        }
    });

    socket.on('eraseShapes', (sessionCode, mouseX, mouseY) => {
        if (socket.rooms.has(sessionCode)) {
            // Broadcast the eraseShapes event to all connected clients in the session
            io.to(sessionCode).emit('eraseShapes', mouseX, mouseY);
        } else {
            console.log('Unauthorized attempt to erase shapes.');
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Remove the user's session code from the map upon disconnection
        sessionCodes.forEach((value, key) => {
            if (socket.rooms.has(key)) {
                sessionCodes.delete(key);
            }
        });
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
