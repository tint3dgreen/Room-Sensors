var five = require('johnny-five');
var board = new five.Board();
 
board.on('ready', function() {
  var led = new five.Led(13); // pin 13
  led.blink(500); // 500ms interval
});