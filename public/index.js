
$(function(){
  var socket = io();
  var lastMousePosition;
  var mousePosition;
  var color;
  var lineWidth;
  var canvas = document.getElementById('canvas');

  var ctx = canvas.getContext('2d');
  var mouseDown = false;

  //reset canvas
  $('.reset').click(function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);
  });

  // pick color
  $('.red').click(function() {
    color = '#F00';
  });
  $('.yellow').click(function() {
    color = '#FECA1E';
  });
  $('.blue').click(function() {
    color = '#5AD';
  });
  $('.black').click(function() {
    color = 'black';
  });
  $('.white').click(function() {
    color = 'white';
  });

  //pick line width
  $('.two-px').click(function() {
    lineWidth = 2;
  });
  $('.five-px').click(function() {
    lineWidth = 5;
  });
  $('.eight-px').click(function() {
    lineWidth = 8;
  });
  $('.eleven-px').click(function() {
    lineWidth = 11;
  });
  $('.fifteen-px').click(function() {
    lineWidth = 15;
  });

  // mouse events
  canvas.addEventListener('mousedown', function(){
    mouseDown = true;
  });

  canvas.addEventListener('mouseup', function(){
    mouseDown = false;
    lastMousePosition = null;
  });

  canvas.addEventListener('mousemove', function() {
    if (mouseDown) {
      mousePosition = {
        mouseX: event.clientX -= canvas.offsetLeft,
        mouseY: event.clientY -= canvas.offsetTop
      };

      if (lastMousePosition) {
        ctx.strokeStyle = color;
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(lastMousePosition.mouseX, lastMousePosition.mouseY);
        ctx.lineTo(mousePosition.mouseX, mousePosition.mouseY);
        ctx.closePath();
        ctx.stroke();

        socket.emit('draw', {
          point1:
          {
            x: mousePosition.mouseX,
            y: mousePosition.mouseY
          },
          point2:
          {
            x: lastMousePosition.mouseX,
            y: lastMousePosition.mouseY
          },
          color: color,
          size: lineWidth
        });

      }
      lastMousePosition = mousePosition;

      // lastMousePosition = {
      //   mouseX: event.clientX -= canvas.offsetLeft,
      //   mouseY: event.clientY -= canvas.offsetTop
      // };



    }
  });

  socket.on('draw', function(msg) {
    console.log('client side', msg);
    ctx.strokeStyle = msg.color;
    ctx.lineJoin = 'round';
    ctx.lineWidth = msg.size;
    ctx.beginPath();
    ctx.moveTo(msg.point2.x, msg.point2.y);
    ctx.lineTo(msg.point1.x, msg.point1.y);
    ctx.closePath();
    ctx.stroke();
  });

});
