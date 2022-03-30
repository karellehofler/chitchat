import React from 'react';
import { chatRooms } from '../../enums';
// import M from "materialize-css/dist/js/materialize.min.js";

const InputContainer = ({ children, isInline, width }) => (
    <div className={!width && `row`} style={{ width: `${width}`}}>
        <form className="col s12">
            <div className="row">
                <div className={`input-field col s12 ${isInline ? `inline` : ``}`}>
                    {children}
                </div>
            </div>
        </form>
    </div>
)

const Button = ({ handleClick, label, classes, ...props}) => (
    <>
        <button className={`btn waves-light waves-effect ${classes && classes}`} 
        onClick={handleClick} {...props}>
            {label}
        </button>
    </>
)

const UsernameInput = ({ username, setUsername, handleClick }) =>  (
    <InputContainer isInline width="50%">
        <label for="username">Username</label>
        <input type="text" className="validate col s9 m9" 
        name="username" value={username}
        onChange={setUsername}  />
         <Button label="Enter" classes="white light-blue-text text-darken-1 col s3 m3" 
        handleClick={handleClick} />
    </InputContainer>
)

const MessageInput = ({ message, setMessage, handleSubmit, handleChange, ...props }) => (
    <>
        <InputContainer isInline>
            <input type="text" placeholder="What would you like to say?" 
            className="validate col s10" name="message-input" value={message}
            {...props} onChange={setMessage} />
            <Button type="submit" classes="col s2 light-blue darken-2" 
            label="Send" handleClick={handleSubmit} />
        </InputContainer>
    </>
)

const RoomSelect = ({ setRoom }) => {

    // useEffect(() => {
    //     document.addEventListener('DOMContentLoaded', function() {
    //         // var elems = document.querySelectorAll('select');
    //         M.AutoInit();
    //     });
    // }, [])

    return(
        <InputContainer>
            <select className="browser-default" onChange={setRoom}>
                {chatRooms && chatRooms.map((room) => (
                    <option key={room.id} value={room.name}>
                        {room.name}
                    </option>
                ))}
            </select>
        </InputContainer>
    )
}

export { UsernameInput, MessageInput, RoomSelect, Button }