
$(document).ready(function() {

  /* Connect to server socket */
  var socket = io.connect('http://localhost:3000');

  var handle = $('#handle');
  var message = $('#message');
  var button = $('#send');
  var output = $('#output');
  var feedback = $('#feedback');

  // Emit Chat Events
  button.click(function() {
    socket.emit('chat', {
      message: message.val(),
      handle: handle.val()
    });
  });

  // Emit typing events
  message.keypress(function() {
    socket.emit('typing', handle.val());
    console.log(handle.val())
  });

  // Listen for server Events
  socket.on('chat', function(data) {
    feedback.empty();
    output.append('<p><strong>' + data.handle + '</strong>: ' + data.message + '</p>');
  });

  // Listen for typers
  socket.on('typing', function(data) {
    feedback.html('<p><em>' + data + ' is typing</em></p>');
  });

});
