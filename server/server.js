
const app=require('express')();

const server=require('http').createServer(app);

const io = require('socket.io')(server,{
    cors: {
        origin: "*",
      }
});

var count=0;

io.on("connection", (socket) => {
//   console.log("Socket id-",socket.id);
//   console.log("socket is ready to be connected");

    socket.on("join_room",(data)=>{

        
        socket.join(data);
        console.log(`User with ${socket.id} connected in room ${data}`);
        console.log("no of ppl in room",++count);
    });
    
    

    socket.on("send_message",(curr_message)=>{
        console.log(curr_message.room);
        socket.broadcast.emit("recieve_message",curr_message);
    });

    socket.on("disconnect",()=>{
        console.log("User disconnected...",socket.id);
    });

});

server.listen(5000,()=>console.log("srever is listening at port 5000..."));