
const { Server } = require("socket.io");
const io = new Server(server);


module.exports = function () {
  return function (req, res, next) {
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
    next();
  };
};



