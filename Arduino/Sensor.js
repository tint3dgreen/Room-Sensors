var five = require("johnny-five");
var board = new five.Board();
var http = require('http');


board.on("ready", function() {

  var data = {people_in:"0",people_out:"0",people_count:"0"}
  var inb_press = false;
  var outb_press = false;
  var state = 0;
  var button_in = new five.Button(2);
  var button_out = new five.Button(3);
  // "calibrated" occurs once, at the beginning of a session,



  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: "D7"
  });

  proximity.on("data", function() {
    //console.log("inches: ", this.inches);
  });



  button_in.on("press", function() {
    //console.log( "In Button pressed" );
    inb_press = true;
  });

  button_in.on("release", function() {
    //console.log( "In Button released" );
    inb_press = false;
  });

  button_in.on("hold", function() {
    //console.log( "In Button held" );
    inb_press = true;
  });

  button_out.on("press", function() {
    //console.log( "Out Button pressed" );
    outb_press = true;
  });

  button_out.on("release", function() {
    //console.log( "Out Button released" );
    outb_press = false;
  });
  button_out.on("hold", function() {
    //console.log( "Out Button held" );
    outb_press = true;
  });


this.loop(50, function(){
	switch(state){
		case 0: 						//Case if no button is pressed
			//console.log("Case 0");
			if (inb_press == true){
				state = 1;
			}else if (outb_press == true){
				state = 2;
			}
			break;
		case 1: 						//Case if inside button is pressed only
			//console.log("Case 1");
			if (inb_press == false){
				state = 0;
			}else if (outb_press == true){
				state = 3;
			}
			break;
		case 2: 						//Case if outside button is pressed only
			//console.log("Case 2");
			if (outb_press == false){
				state = 0;
			}else if (inb_press == true){
				state = 4;
			}
			break;
		case 3: 						//Case if inside was pressed and then outside
			//console.log("Case 3");
			if (outb_press == false){
				state = 1;
			}else if (inb_press == false){
				data.people_count -= 1;
				data.people_out += 1;
				console.log(data.people_count);
				state = 2;
			}
			break;
		case 4: 						//Case if outside was pressed and then inside
			//console.log("Case 4");
			if(inb_press == false){
				state = 2;
			}else if (outb_press == false){
				data.people_count += 1;
				data.people_in += 1;
				console.log(data.people_count);
				state = 1;
			}
			break;
	}
})

//Every amount of time send data as a json file
//make an http object that will look for things at a port
//Message will contain data in a format
	http.createServer(function(req, res){
		res.setHeader('Content-Type','text-html');
		res.writeHead(200, {'Content-Type': 'object'});
		val = JSON.stringify(data);
		res.write(val);
		res.end();
	})

}).listen(8080);