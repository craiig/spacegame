
//basic world model
//increments the worldTime whenever it is updated

//todo: world model is basically an event-emitter as described in the node.js documentation
//http://nodejs.org/api/events.html#events_class_events_eventemitter
// if world model was made to be an event emitter, game objects could attach actions to the world update event easily

var network = require('./network.js')

exports = module.exports = World;

function World(io) {
	this.worldTime = 0;
	this.clients = 0;
	this.clientping = 0;
	this.io = io;

	this.netchan = new network(this);
	this.netchan.registerObject(this);
	
	//register some callbacks - this is annoying to do this way, but our other options are way worse: http://www.dustindiaz.com/scoping-anonymous-functions/
	var that = this
	setInterval( function(){that.update()}, 10000); //33 milliseconds = 30 fps, 16 ms = 60 fps
	//setInterval( function(){that.update()}, 16); //60 fps

	io.sockets.on('connection', function(socket){ that.newConnection(socket) });

	//setup - 
	//build a ship
	this.shipList = [];
}

//btw this is how you do inheritance - maybe? look up node.js inheritance
//World.prototype.__proto__ = somother prototype object, i.e.: Object.prototype

World.prototype.newConnection = function(socket){
	//netchan takes care of talking to clients
	//console.log('netchan: ' + this);
	this.clients++;

	//setup any other notifications
	var that = this;
	socket.on("ping", function(data){
		socket.emit("ping", data);
	})

	socket.on('disconnect', function(socket){ that.clients--; })
}

World.prototype.update = function(){
	//perform the world-step
	this.worldTime++;
	console.log("world update, worldtime: " + this.worldTime);

	//update our network channel
	this.netchan.update();
}

World.prototype.getSyncProps = function(){
	return ['worldTime', 'lastClientTime'];
}