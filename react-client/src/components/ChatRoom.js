import React, { useState, useEffect } from 'react';
import { MessageInput } from './inputs';
import { ToastContainer } from 'react-toastify';

const RoomHeader = ({ room }) => (
    <div className="chat-room-header z-depth-2">
        <div className="chat-room-title">
            {room && <h2>{room}</h2>}
        </div>
    </div>
)

const MessageBubble = ({ message, float }) => (
    <div className="row">
        {/* {align == "right" : } */}
        <div className={`chat-bubble ${float === 'left' ? `left` : `right`}`}>
            <div className="card-panel light-blue darken-1 small">
                <span className="white-text flow-text">{message.message}</span>
            </div>
            <span>{message.username} | {message.time}</span>
        </div>
    </div>
)

const MessageFeed = ({ messages, user }) => (
    <div className="row chat-room-messages">
        <div id="messages-container" className="col s12">
            {messages && messages.map((message) => (
                <MessageBubble message={message}
                float={user === message.username ? "right" : "left"} />
            ))}
        </div>
    </div>
)

export default function ChatRoom({ socket, username, room, setRoom }) {
    
    const [ messages, setMessages ] = useState([]);
    const [ currentMessage, setCurrentMessage ] = useState("");
    
    const sendMessage = async (e) => {
       if(currentMessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() +
                ":" + new Date(Date.now()).getMinutes(),
            };

            e.preventDefault();
            await socket.emit("send_message", messageData);
            setMessages((list) => [...list, messageData]);
            // scrollToBottom();
            setCurrentMessage("");
       }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((messageList) => [...messageList, data ]);
        });

        socket.on("join_room", (data) => {
            // toast(data);
            console.log(data);
        })

    }, [socket]);

    return (
        <>
            <ToastContainer />
            <RoomHeader room={room} />
            <MessageFeed messages={messages} user={username}/>
            <form className="chat-bar" action="">
                <MessageInput message={currentMessage} 
                setMessage={e => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage}
                handleSubmit={sendMessage} />
            </form>           
        </>
    )
}