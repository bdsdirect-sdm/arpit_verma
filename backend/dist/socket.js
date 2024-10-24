"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSocket = exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
const messageModel_1 = __importDefault(require("./models/messageModel"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
exports.httpServer = (0, http_1.createServer)(app);
// Set up Socket.IO with the HTTP server
const setSocket = (httpServer) => {
    const io = new socket_io_1.default.Server(httpServer, {
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
                const mess = await messageModel_1.default.create({ roomid, senderid, message, createdAt: Date.now().toString() });
                console.log("Message saved:", mess);
                io.to(roomid).emit("message", { roomid, message, senderid });
            }
            catch (error) {
                socket.emit("error", "Send message again");
            }
        });
    });
};
exports.setSocket = setSocket;
// Start the server and set up Socket.IO
exports.httpServer.listen(4400, () => {
    console.log(`The Server is running on port 4400`);
    (0, exports.setSocket)(exports.httpServer); // Initialize Socket.IO with the HTTP server
});
