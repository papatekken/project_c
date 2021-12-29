const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.pug');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('hi');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});
