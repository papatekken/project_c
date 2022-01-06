'use strict';

var init = function(app){

	var server 	= require('http').Server(app);
	var io 		= require('socket.io')(server);
    var dotenv = require('dotenv');
    
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


    dotenv.config();
    var port = process.env.PORT || '3020';
    server.listen(port);
    server.on('error', onError);
	return server;


    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
    
}

module.exports = init;