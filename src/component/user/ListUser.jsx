import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import roleService from '../../service/roleService';
function ListUser() {
    let flag = 1

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {

    }, []);

    const handleSubmit = (e) => {

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

export default ListUser;
