import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { sequelize } from './config/database';
import { ChatDetail } from '../src/models'; 

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

// Connect to the database
sequelize.sync();

// Socket.io setup
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send_message', async (data) => {
        const message = await ChatDetail.create(data);
        io.to(data.receiver_id).emit('receive_message', message);
    });
});

// Define routes (for user, chat, etc.)
// Example: app.use('/api/chats', chatRouter);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
