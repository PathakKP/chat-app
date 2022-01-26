import React from 'react';
import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ScrollToBottom from 'react-scroll-to-bottom';


function Chat({username,room,socket}) {

    const [message,setMessage]=useState('');
    const [messageList,setMessageList]=useState([]);

    const sendMessage=async ()=>{
      if(message !== "")
      {
        const messageData={

          author: username,
          room: room,
          message: message,
          time:
           new Date(Date.now()).getHours() +
            ":"+
             new Date(Date.now()).getMinutes(),

        };

        console.log("sending message",messageData);
       await socket.emit("send_message",messageData);
       setMessageList((list)=>[...list,messageData]);
       setMessage('');
      }

    }

    useEffect(()=>{
      console.log("ii te chalata ho!!");
      socket.on("recieve_message",(data)=>{
        console.log("recieving message",data);
        console.log("kahe nhi chalata ho!!");
        setMessageList((list)=>[...list,data]);
      });
    }, [socket]);

  return (
    <div className='chat-window'>
  <div className='chat-header'>
    <p> Live Chat</p>  
    </div>
    <div className='chat-body'>
        <ScrollToBottom className='message-container'>
      {
        messageList.map((messageContent)=>{
         return (

          <div className='message' id={username===messageContent.author?"you":"other"}>

            <div>
              <div className='message-content'>
                <p>{messageContent.message}</p>
              </div>
              <div className='message-meta'>
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            </div>
          </div>


         );
        })
      }
      </ScrollToBottom>
    </div>
  <div className='chat-footer'>
    <input type="text" placeholder="chat here..." value={message} onChange={(e)=>setMessage(e.target.value)} onKeyPress={(event)=>{
      event.key==="Enter" && sendMessage();
    }}/>
    <Button className="Button" variant="contained" endIcon={<SendIcon />}  onClick={sendMessage} ></Button>
    </div>
    </div>
  
  );
}

export default Chat;
