
var fs = require('fs')
  , express = require('express')
  , app = express()
  , http = require('http');

var world = require('./gameServer.js');

//setup the app & socketio in this weird way thanks to express
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(59473);
app.use(express.static(__dirname + '/client/'));

//instantiate the world object - which includes a network channel
var MainWorld = new world(io);

//Load The Test Area
var areaArray = fs.readdirSync('./areas/');
console.log('\nWHAT AREA, HUMAN?\n');
for (x in areaArray) {
	console.log('\n[' + x + ']');
	console.log(areaArray[x]);
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
 
process.stdin.on('data', function (areaID) {
	MainWorld.loadArea('./areas/' + areaArray[new Number(areaID)]);
	console.log('done loading ' + areaArray[new Number(areaID)]);
	process.stdin.on('data', function(){});
});

