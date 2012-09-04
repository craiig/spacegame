/*var http = require('http');

	http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(59473);

console.log('Server running at http://127.0.0.1:8124/');
console.log(__dirname);

*/

//how to instantiate objects on the client side? send object type ID down the pipe
//how to get them referencing each other? do we need this capability? use object ID references
//client makes connection - 
//gets list of all active objects from the Server
//

var fs = require('fs')
  , express = require('express')
  , app = express()
  , http = require('http')
  //, server = require('http').createServer(app)
  //, io = require('socket.io').listen(server)

//var network = require('./network.js')
var world = require('./world.js')

//setup the app & socketio in this weird way thanks to express
var server = http.createServer(app)
var io = require('socket.io').listen(server)

server.listen(59473);
app.use(express.static(__dirname + '/client/'));

//instantiate the world object - which includes a network channel
var MainWorld = new world(io);

//connect socket.io to the world
//io.sockets.on('connection', function(socket) { MainWorld.newConnection(socket); } ); //gotta do it like this to keep context properly
//io.sockets.on('connection', MainWorld.netchan.onConnection);

//setInterval(MainWorld.update, 33); //33 milliseconds = 30 fps, 16 ms = 60 fps
//setInterval(function(){ MainWorld.update(); }, 10000); //33 milliseconds = 30 fps, 16 ms = 60 fps

/*io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});*/