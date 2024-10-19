// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io'
// import cors from 'cors';

// const app = express();
// app.use(cors());

//  export const httpServer = createServer(app)

// const io = new Server(httpServer,{
//     cors:{
//         origin:"http://localhost:3000/",  
//         methods: ["GET","POST"],
//     }
// });

// io.on("connection",(socket)=>{
//     // console.log('socket--', socket);
//     console.log('User Connected ${socket.id}', socket.id);

//     socket.on("joinRoom", (room:string) => {
//         console.log(`User ${socket.id} has join the room`, room);
        
//     })

//     socket.on("sendMessage", (data) =>{
//         console.log("MESSAGE DATA", data);
        
//     })

//     socket.on("disconnect", ()=>{
//         console.log(`User Disconnected ${socket.id}`);
//     })

// })

// httpServer.listen(400,()=>{
//     console.log("The server is running on port 4400")
// })