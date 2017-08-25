var http = require('http');
var fs = require('fs');
var elements = process.argv;
var rl = require("readline");

var utils = require('./config/utils.js');
var Config = require('./config/configuration.js');
var configObj = new Config();

var port = process.env.PORT || configObj.port;

var totalParkings = 0;
var parkingArr = new Array();

if(elements[elements.length - 1] == 'true'){
	interact();
}else{
	fs.readFile(elements[2], 'utf-8', function(err, data) {
	    var arr = data.split("\n");
	   	for(var i=0; i < arr.length; i++){
			commands(arr[i]);
	   	}
	});
}

function interact(){
	if(elements[elements.length - 1] == 'true'){
		var prompts = rl.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
		prompts.question("Input: ", function (data) {
		    commands(data);
		});
	}
}

function commands(input){
	var n = input.split(" ")[0];
	switch (n) {
	    case "create_parking_lot":
	        totalParkings = utils.create_parking_lot(input);
	        for(var i=0; i < totalParkings; i++){
	        	var obj = new Object();
	        	obj[parseInt(i)] = null;
	        	parkingArr.push(obj);
	        }
	        console.log("Created a parking lot with " + totalParkings  + " slots.");
	        break;
	    case "park":
        	var len = parkingArr.length;
        	var slotNumber = utils.park(totalParkings, parkingArr, len, input);
        	if(slotNumber){
        		console.log("Allocated slot number: " + slotNumber);
        	}else{
        		console.log("Sorry, parking lot is full");
        	}
	        break;
	    case "leave":
	    	var slotNumber = utils.leave(totalParkings, parkingArr, input);
        	if(slotNumber){
        		console.log("Slot number " + slotNumber + " is free.");
        	}else{
        		console.log("Sorry, parking lot is full");
        	}
			break;
	    case "status":
	    	var values = utils.status(totalParkings, parkingArr);
        	if(values.length > 1){
        		console.log(values.join("\n"));
        	}else{
        		console.log("Sorry, parking lot is full");
        	}
	        break;
	    case "registration_numbers_for_cars_with_colour":
	    	var regNum = utils.registration_numbers_for_cars_with_colour(totalParkings, parkingArr, input);
        	if(regNum){
        		console.log(regNum);
        	}else{
        		console.log("Sorry, parking lot is full");
        	}
	        break;
	    case "slot_numbers_for_cars_with_colour":
	    	var slotNumber = utils.slot_numbers_for_cars_with_colour(totalParkings, parkingArr, input);
        	if(slotNumber){
        		console.log(slotNumber);
        	}else{
        		console.log("Sorry, parking lot is full");
        	}
	        break;
	    case "slot_number_for_registration_number":
	    	var slotNumber = utils.slot_number_for_registration_number(totalParkings, parkingArr, input);
        	if(slotNumber){
        		console.log(slotNumber);
        	}else{
        		console.log("Sorry, parking lot is full");
        	}
	        break;
	}
	interact();
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is up and running!\n');
}).listen(port);