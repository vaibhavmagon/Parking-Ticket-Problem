module.exports = {
    create_parking_lot : function(input) {
        totalParkings = parseInt(input.split(" ")[1]);
        return totalParkings;
    },
    park : function(totalParkings, parkingArr, len, input){
    	if(totalParkings > 0){
	    	if(findParking(parkingArr) == true){
		  		for(var i=0;i<len;i++){
		  			if(parkingArr[i][i] == null){
		  				var inp = input.split(" ")[1] + ":" + input.split(" ")[2];
						parkingArr[i][i] = inp;
						i = i + 1;
						return i;
		  			}
		  		}
		  	}else{
		  		return null;
		  	}
	  	}else{
	  		return null;
	  	}
    },
    leave : function(totalParkings, parkingArr, input){
    	if(totalParkings > 0){
	    	var index = input.split(" ")[1] - 1;
		    if (index > -1 && index <= parkingArr.length) {
			    parkingArr[index][index] = null;
			    index = index + 1;
			    return index;
			}
		}else{
			return null;
		}
    },
    status: function(totalParkings, parkingArr){
    	var arr = new Array();
    	if(totalParkings > 0){
        	arr.push("Slot No. Registration No. Color ");
        	for(var i=0; i<parkingArr.length;i++){
        		if(parkingArr[i][i] != null){
        			var e = i + 1;
        			arr.push(e + ".  " + parkingArr[i][i].split(":")[0] + "  " + parkingArr[i][i].split(":")[1]);
        		}
        	}
        	return arr;
		}else{
			return [];
		}
    },
    registration_numbers_for_cars_with_colour : function(totalParkings, parkingArr, input){
    	if(totalParkings > 0){
	        var displayArr = new Array();
	        for(var i=0; i< parkingArr.length; i++){
	        	if(parkingArr[i][i] && parkingArr[i][i].split(":")[1] == input.split(" ")[1]){
	        		displayArr.push(parkingArr[i][i].split(":")[0]);
	        	}
	        }
    		return displayArr.join();
		}else{
			return null;
		}
    },
    slot_numbers_for_cars_with_colour : function(totalParkings, parkingArr, input){
    	if(totalParkings > 0){
	    	var displayArr = new Array();
	        for(var i=0; i< parkingArr.length; i++){
	        	if(parkingArr[i][i] && parkingArr[i][i].split(":")[1] == input.split(" ")[1]){
	        		displayArr.push(i+1);
	        	}
	        }
        	return displayArr.join();
        }else{
			return null;
		}
    },
    slot_number_for_registration_number : function(totalParkings, parkingArr, input){
		if(totalParkings > 0){
	    	var ele;
	        for(var i=0; i< parkingArr.length; i++){
	        	if(parkingArr[i][i] && parkingArr[i][i].split(":")[0] == input.split(" ")[1]){
	        		ele = i + 1;
	        	}else{
	        		ele = "Not found";
	        	}
	        }
        	return ele;
        }else{
			return null;
		}
    }
};

function findParking(parkingArr){
	var ele = false;
	for(var i=0; i<parkingArr.length; i++){
		if(parkingArr[i][i] == null){
			ele = true;
		}
	}
	return ele;
}