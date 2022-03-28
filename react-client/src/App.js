import { useState, useEffect } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import UserSignIn from './components/UserSignIn';
// import useLocalStorage from './hooks/useLocalStorage';

const socket = io.connect("http://localhost:3001");

function App() {
  const [ username, setUsername ] = useState('');
  const [ room, setRoom ] = useState("General");
  const [ chat, setChat ] = useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== "") {
      socket.emit("join_room", room);
      setChat(true);
    }
  }

  useEffect(() => {
    if(username !== '') setChat(true);
  }, [])

  return (
    <div className="App">
      {!chat ? 
      <UserSignIn username={username} 
      setUsername={(e) => setUsername(e.target.value)} 
      handleClick={joinRoom} />
      :
      <ChatRoom socket={socket} username={username} room={room} />
      }
    </div>
  );
}

export default App;