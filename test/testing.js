/* global describe, it, before */

var server = require('../server.js');
var assert = require('chai').assert;
var fs = require('fs');
var utils = require("../config/utils.js");

var commands = [];
var totalParkings;
var parkingArr = [];

describe('server', function () {
  before(function () {
    server.listen(8080);
  });

  after(function () {
    server.close();
  });
});

describe('File reading test', function() {
  it('Read test input', function(done) {
    fs.readFile('./demo.txt', 'utf-8', function(err, data) {
      if (err) {
        throw "Unable to read file";
      }
      commands = JSON.parse(JSON.stringify(data)).split("\n");
      console.log(commands);
      done();
    });
  });

  it('Check Commands', function(done) {
        assert.equal(commands[0].split(" ")[0],"create_parking_lot");
        assert.equal(commands[1].split(" ")[0],"park");
        assert.equal(commands[7].split(" ")[0],"leave");
        assert.equal(commands[8],"status");
        done();
  });
});

describe("Testing Functions", function(){
  it('Create a Parking lot', function(done) {
        totalParkings = utils.create_parking_lot(commands[0]);
        for(var i=0; i < totalParkings; i++){
            var obj = new Object();
            obj[parseInt(i)] = null;
            parkingArr.push(obj);
        }
        assert.equal(totalParkings,6);
        assert.equal(parkingArr.length,6);
        done();
  });

  it('Allocating Parking to User 1', function(done) {
        var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[1]);
        assert.equal(ele,1);
        done();
  });

  it('Allocating Parking to User 2', function(done) {
        var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[2]);
        assert.equal(ele,2);
        done();
  });

  it('Allocating Parking to User 3', function(done) {
        var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[3]);
        assert.equal(ele,3);
        done();
  });

  it('Allocating Parking to User 4', function(done) {
        var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[4]);
        assert.equal(ele,4);
        done();
  });

  it('Allocating Parking to User 5', function(done) {
        var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[5]);
        assert.equal(ele,5);
        done();
  });

  it('Allocating Parking to User 6', function(done) {
        var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[6]);
        assert.equal(ele,6);
        done();
  });

  it('Leaving from slot 4', function(done) {
        var ele = utils.leave(totalParkings, parkingArr, commands[7]);
        assert.equal(ele,4);
        done();
  });

  it('Checking status', function(done) {
        var ele = utils.status(totalParkings, parkingArr);
        assert.equal(ele.length,6);
        done();
  });

  it('Allocating Parking to User 7. Should Reallocate the nearest empty postion 4', function(done) {
        var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[9]);
        assert.equal(ele,4);
        assert.notEqual(ele,7);
        done();
  });

  it('Allocating Parking to User 8. Should indicate Parking is full.', function(done) {
        var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[10]);
        assert.equal(ele,null);
        assert.notEqual(ele,8);
        done();
  });

  it('Registeration no. for cars with white color', function(done) {
        var ele = utils.registration_numbers_for_cars_with_colour(totalParkings, parkingArr, commands[11]);
        ele = ele.split(",");
        assert.equal(ele[0],'KA-01-HH-1234');
        assert.equal(ele[1],'KA-01-HH-9999');
        assert.equal(ele[2],'KA-01-P-333');
        done();
  });

  it('Slot no. for cars with white color', function(done) {
        var ele = utils.slot_numbers_for_cars_with_colour(totalParkings, parkingArr, commands[12]);
        ele = ele.split(",").map(Number);
        assert.equal(ele[0],1);
        assert.equal(ele[1],2);
        assert.equal(ele[2],4);
        done();
  });

  it('Slot no. for registration no. KA-01-HH-3141', function(done) {
        var ele = utils.slot_number_for_registration_number(totalParkings, parkingArr, commands[13]);
        assert.equal(ele,6);
        done();
  });

  it('Slot no. for registration no. MH-04-AY-1111', function(done) {
        var ele = utils.slot_number_for_registration_number(totalParkings, parkingArr, commands[14]);
        assert.equal(ele,'Not found');
        done();
  });

});