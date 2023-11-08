import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import socketClient from 'socket.io-client';
// const sockets = io('http://localhost:3001/'); // Connect to the server
const sockets = socketClient('http://192.168.1.39:3001');
// const sockets = socketClient('http://192.168.1.39:3001');
function Chat() {
    let flag = 1

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (flag == 1) {
            sockets.on('chat message', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
            flag = 0
        }

        // socket.on('chat message', (message) => {
        //     setMessages((prevMessages) => [...prevMessages, message]);
        // });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        flag = 1
        if (message.trim() !== '') {
            // socket.emit('chat message', message);
            sockets.emit('chat message', message);
            console.log("heee")
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Sends</button>
            </form>
        </div>
    );
}

export default Chat;
