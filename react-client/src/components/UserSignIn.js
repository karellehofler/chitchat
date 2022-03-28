import React from 'react';
import { UsernameInput } from './inputs';
import { Branding } from './displays';

export default function UserSignIn({ username, setUsername, handleClick }) {

    return (
        <div id="chat-user">
            <Branding />
            <UsernameInput username={username} 
            setUsername={setUsername}
            handleClick={handleClick} />
        </div>
    )
}