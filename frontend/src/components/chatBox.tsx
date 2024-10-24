// src/Chat.tsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4400"); // Replace with your server URL

const Chat: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [senderId, setSenderId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ senderid: string; message: string }[]>([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const joinRoom = () => {
    if (roomId) {
      socket.emit("join_room", roomId);
    }
  };

  const sendMessage = () => {
    if (roomId && senderId && message) {
      socket.emit("send_message", { roomid: roomId, senderid: senderId, message });
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="chat-container">
      <div>
        <h2>Join Chat Room</h2>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your ID"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
        />
        <button onClick={joinRoom}>Join</button>
      </div>

      <div>
        <h2>Messages</h2>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.senderid}: </strong>{msg.message}
            </div>
          ))}
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

























// import React, { useEffect, useState } from 'react';
// import { socket } from '../socket'; 
// import { useParams } from 'react-router-dom';

// interface Message {
//     roomId: string | undefined;     
//     author: string;
//     message: string;
//     time: string;
// }

// const ChatRoom = () => {
//     const { roomId } = useParams();
//     const [name, setName] = useState("");
//     const [room, setRoom] = useState(roomId); 
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState<Message[]>([]); 

//     const sendMessage = async () => {
//         if (message !== "") {
//             const messageData: Message = {
//                 roomId: room,  
//                 author: name,
//                 message: message,
//                 time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
//             };
//             await socket.emit("sendMessage", messageData);
//             setMessages((prevMessages) => [...prevMessages, messageData]); 
//             setMessage(""); 
//             setName("");
//         }
//     };

//     useEffect(() => {
//         socket.emit("joinRoom", room); 
        
//         socket.on("receiveMessage", (data: Message) => {
//             setMessages((prevMessages) => [...prevMessages, data]); 
//         });

//         return () => {
//             socket.emit("leaveRoom", room);
//             socket.off("receiveMessage"); 
//         };
//     }, [room]);

//     return (
//         <div className='app max-w-md mx-auto p-4 border rounded shadow-lg bg-white'>
//             <h3 className='text-lg font-semibold mb-4'>Enter your message</h3>
//             <input 
//                 type="text" 
//                 placeholder='Your name' 
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)} 
//                 className='border rounded p-2 mb-2 w-full'
//             />
//             <input 
//                 type="text" 
//                 placeholder='Type your message here' 
//                 value={message} 
//                 onChange={(e) => setMessage(e.target.value)} 
//                 className='border rounded p-2 mb-4 w-full'
//             />
//             <button 
//                 onClick={sendMessage}
//                 className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600'
//             >
//                 Send
//             </button>

//             <div className="messages mt-4 border-t pt-4">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="message py-1">
//                         <strong className='text-blue-500'>{msg.author}</strong>: {msg.message} <span className='text-gray-500 text-sm'>{msg.time}</span>
//                     </div>
//                 ))}
//             </div>
//             {/* <Chats room={room} /> */}
//         </div>
//     );
// };

// export default ChatRoom;