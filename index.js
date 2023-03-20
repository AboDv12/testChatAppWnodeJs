const express = require ('express');
const app = express();
const PORT = process.env.PORT || 3003;
const http = require('http').Server(app);
const io = require ('socket.io')(http)

app.get('/',(req,res)=>{
  res.sendFile(__dirname +'/home.html')
})
let users = {};
io.on("connection",socket=>{
  console.log(socket.id);
 socket.on('tag-joined',tag=>{
  console.log(tag);
  users[socket.id]= tag
  socket.broadcast.emit('user-joined',users[socket.id]);
 })
  
  console.log("user joined ");
  socket.on('send-msg',msg=>{
    socket.broadcast.emit('msg',msg)
    socket.emit('msg2',msg)
  });
socket.on("disconnect",()=>{
  console.log('disconnected...')
})

})
http.listen(PORT,()=>{
  console.log('connected to express')
});
