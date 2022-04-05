import { useState } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import UserSignIn from './components/UserSignIn';
// import useLocalStorage from './hooks/useLocalStorage';

const socket = io.connect(process.env.REACT_APP_WEB_SOCKET_SERVER);

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

  // useEffect(() => {
  //   if(username !== '') setChat(true);
  // }, [username])

  return (
    <div className="App">
      {!chat ? 
      <UserSignIn username={username} 
      setUsername={(e) => setUsername(e.target.value)} 
      handleClick={joinRoom} />
      :
      <ChatRoom socket={socket} username={username} room={room} setRoom={setRoom} />
      }
    </div>
  );
}

export default App;