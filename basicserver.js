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

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

var network = require('./network.js')
var world = require('./world.js')

app.listen(59473);

function handler (req, res) {
	filename = __dirname + '/client/index.html';
	fs.readFile(filename,
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + filename);
			}

			res.writeHead(200);
			res.end(data);
  		});
}

//instantiate the world object - which includes a network channel
var MainWorld = world.create();

//connect socket.io to the world
io.sockets.on('connection', function(socket) { MainWorld.newConnection(socket); } ); //gotta do it like this to keep context properly
//io.sockets.on('connection', MainWorld.netchan.onConnection);

//setInterval(MainWorld.update, 33); //33 milliseconds = 30 fps, 16 ms = 60 fps
setInterval(function(){ MainWorld.update(); }, 10000); //33 milliseconds = 30 fps, 16 ms = 60 fps

/*io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});*/