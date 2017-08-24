var http = require('http');
var fs = require('fs');
var elements = process.argv;

var totalParkings = 0;
var parkingArr = new Array();

var cmnds = ["create_parking_lot <value>","park <regNumber> <color>","leave <value>","status","registration_numbers_for_cars_with_colour <color>","slot_numbers_for_cars_with_colour <color>","slot_number_for_registration_number <regNumber>"];


fs.readFile(elements[2], 'utf-8', function(err, data) {
    var arr = data.split("\n");
   	for(var i=0; i < arr.length; i++){
		commands(arr[i]);
   	}	
});


function commands(input){
	var n = input.split(" ")[0];
	console.log(input);
	switch (n) {
	    case "create_parking_lot":
	        totalParkings = parseInt(input.split(" ")[1]);
	        console.log("Created a parking lot with " + totalParkings  + " slots.");
	        break;
	    case "park":
        	var len = parkingArr.length;
	        if(totalParkings >= (parkingArr.length + 1)){
		  		var inp = input.split(" ")[1] + ":" + input.split(" ")[2];
		  		var obj = {};
		  		obj[parseInt(len)] = inp;
		  		parkingArr.push(obj);
		  		len = len + 1;
		  		console.log("Allocated slot number: " + len);
		  	}else if(findParking(parkingArr) == true){
		  		for(var i=0;i<len;i++){
		  			if(parkingArr[i][i] == null){
		  				var inp = input.split(" ")[1] + ":" + input.split(" ")[2];
						parkingArr[i][i] = inp;
						i = i + 1;
						console.log("Allocated slot number: " + i);
		  			}
		  		}
		  	}else{
		  		console.log("Sorry, parking lot is full");
		  	}
	        break;
	    case "leave":
	    	if(totalParkings > 0){
		    	var index = input.split(" ")[1] - 1;
			    if (index > -1 && index <= parkingArr.length) {
				    parkingArr[index][index] = null;
				    index = index + 1;
				    console.log("Slot number " + index + " is free.");
				}
			}else{
				console.log("Sorry, no parking lot created.");
			}
			break;
	    case "status":
	    	if(totalParkings > 0){
	        	console.log("Slot No. "," Registration No. "," Color ");
	        	for(var i=0; i<parkingArr.length;i++){
	        		if(parkingArr[i][i] != null){
	        			var e = i + 1;
	        			console.log(e + " " + parkingArr[i][i].split(":")[0] + " " + parkingArr[i][i].split(":")[1])
	        		}
	        	}
    		}else{
    			console.log("Sorry, no parking lot created.");
    		}
	        break;
	    case "registration_numbers_for_cars_with_colour":
	    	if(totalParkings > 0){
		        var displayArr = new Array();
		        for(var i=0; i< parkingArr.length; i++){
		        	if(parkingArr[i][i] && parkingArr[i][i].split(":")[1] == input.split(" ")[1]){
		        		displayArr.push(parkingArr[i][i].split(":")[0]);
		        	}
		        }
        		console.log(displayArr.join());
    		}else{
    			console.log("Sorry, no parking lot created.");
    		}
	        break;
	    case "slot_numbers_for_cars_with_colour":
	    	if(totalParkings > 0){
		    	var displayArr = new Array();
		        for(var i=0; i< parkingArr.length; i++){
		        	if(parkingArr[i][i] && parkingArr[i][i].split(":")[1] == input.split(" ")[1]){
		        		displayArr.push(i+1);
		        	}
		        }
	        	console.log(displayArr.join());
	        }else{
    			console.log("Sorry, no parking lot created.");
    		}
	        break;
	    case "slot_number_for_registration_number":
	    	if(totalParkings > 0){
		    	var ele;
		        for(var i=0; i< parkingArr.length; i++){
		        	if(parkingArr[i][i] && parkingArr[i][i].split(":")[0] == input.split(" ")[1]){
		        		ele = i + 1;
		        	}else{
		        		ele = "Not found";
		        	}
		        }
	        	console.log(ele);
	        }else{
    			console.log("Sorry, no parking lot created.");
    		}
	        break;
        default:
        	console.log("\n");
        	console.log("*** Wrong Command. List of commands are below: ***");
        	for(var i=0;i<cmnds.length;i++){
        		console.log(i+1 + ". " + cmnds[i]);
        	}
        	break;
	}
}

function findParking(parkingArr){
	var ele = false;
	for(var i=0;i<parkingArr.length;i++){
		if(parkingArr[i][i] == null){
			ele = true;
		}
	}
	return ele;
}

http.createServer().listen(8080);

