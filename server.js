var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('public'));

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('draw',function(msg) {
    console.log(msg);
    socket.broadcast.emit('draw', {
      point1:
      {
        x: msg.point1.x,
        y: msg.point1.y,
      },
      point2:
      {
        x: msg.point2.x,
        y: msg.point2.y,
      },
      color: msg.color,
      size: msg.size
    });
  });
});

http.listen(8000, function() {
  console.log('listening on PORT 8000');
});
