import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

interface Message {
    id: number;
    chat_id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
}

const ChatComponent: React.FC<{ jobSeekerId: number; agencyId: number }> = ({ jobSeekerId, agencyId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        socket.on('receive_message', (data: Message) => {
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const sendMessage = () => {
        const messageData = {
            chat_id: 1, // Replace with actual chat ID
            sender_id: jobSeekerId,
            receiver_id: agencyId,
            message: inputMessage,
        };
        socket.emit('send_message', messageData);
        setInputMessage('');
    };

    return (
        <div>
            <div>
                {messages.map(msg => (
                    <div key={msg.id}>{msg.message}</div>
                ))}
            </div>
            <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;
