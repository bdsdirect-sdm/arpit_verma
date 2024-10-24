import express from "express";
import cors from "cors";
import { createServer } from "http";
import socket from "socket.io";
import Message from "./models/messageModel";

const app = express();
app.use(cors());
export const httpServer = createServer(app);
// Set up Socket.IO with the HTTP server
export const setSocket = (httpServer:any) => {
    const io = new socket.Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected", socket.id);

        socket.on("join_room", (roomid) => {
            socket.join(roomid);
            console.log("Connected to the room", roomid);
            io.to(roomid).emit("testing1", "Connection stabilized");
        });

        socket.on("testing", (data) => console.log("This is connection string: " + data));

        socket.on("leave_room", (roomid) => {
            socket.leave(roomid);
            console.log("Left room", roomid);
        });
       
        socket.on("send_message", async ({ roomid, senderid, message }) => {
            console.log("Message trigger");
            try {
                const mess = await Message.create({ roomid, senderid, message, createdAt: Date.now().toString() });
                console.log("Message saved:", mess);
                io.to(roomid).emit("message", { roomid, message, senderid });
            } catch (error) {
                socket.emit("error", "Send message again");
            }
        });
    });
};

// Start the server and set up Socket.IO
httpServer.listen(4400, () => {
    console.log(`The Server is running on port 4400`);
    setSocket(httpServer); // Initialize Socket.IO with the HTTP server
});
