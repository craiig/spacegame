var events = require("events")

exports = module.exports = Chat;

//Chat object for a particular world
// has corresponding client object

//chat works in messages between different connected clients
function Chat(world){

	world.io.sockets.on('connection', function(socket){ that.newConnection(socket) });
}

Chat.prototype.newConnection = function(socket){
	var that = this;

	//rebroadcast the socket messages
	socket.on('chat_message', function(data){
		socket.broadcast('chat_message', data); //broadcast in socket.io doesn't broadcast to the current socket
	})
}