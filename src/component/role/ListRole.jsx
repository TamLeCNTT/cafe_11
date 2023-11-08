import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import roleService from '../../service/roleService';
function ListRole() {
    let flag = 1

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {


    }, []);

    const handleSubmit = (e) => {
        let role = { name: "admin" }
        roleService.add(role).then(res => {
            console.log(res.data)
        })
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

                />
                <button type="submit">Sends</button>
            </form>
        </div>
    );
}

export default ListRole;
