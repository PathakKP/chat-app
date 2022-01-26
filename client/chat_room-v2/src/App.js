import './App.css';
import {useState,useEffect} from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import Button from '@mui/material/Button';
// import {Container} from 'react-bootstrap';

function App() {

  const socket = io.connect("http://localhost:5000");

  const [userName,setUserName]=useState('');
  const [roomCode,setRoomCode]=useState('');
  const [showChat,setshowChat]=useState(false);


  const joinRoom = ()=>{
    if(userName!==''&&roomCode!==''){
      socket.emit("join_room",roomCode);
      setshowChat(true);
    }
  }

  return (
    <div className="App">
     {!showChat ? 

      (<div className='joinChatContainer'>
        <h3>Join Room</h3>
      <input type="text" placeholder="Your Name" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
      <input type="text" placeholder="Room Code" value={roomCode} onChange={(e)=>setRoomCode(e.target.value)}/>
      <button onClick={joinRoom}>Join Room</button>
      </div>
        ) : 
       
        (<Chat username={userName} room={roomCode} socket={socket} />)
        
      }
    </div>
  );
}

export default App;
