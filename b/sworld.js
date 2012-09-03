
//basic world model
//increments the worldTime whenever it is updated

//todo: world model is basically an event-emitter as described in the node.js documentation
//http://nodejs.org/api/events.html#events_class_events_eventemitter
// if world model was made to be an event emitter, game objects could attach actions to the world update event easily

var network = require('./snetwork.js')
var events = require('events')

exports = module.exports = World;

function World(io) {
	this.worldTime = 0;
	this.clients = 0;
	this.io = io;
	this.lastUpdate = (new Date()).getTime(); //last update time
	this.playerList = new Array();

	this.netchan = new network(this);
	this.netchan.registerObject(this);
	
	//register some callbacks - this is annoying to do this way, but our other options are way worse: http://www.dustindiaz.com/scoping-anonymous-functions/
	var that = this
	setInterval( function(){that.update()}, 1000); //1 fps

	this.io.sockets.on('connection', function(socket){ that.newConnection(socket) });
}


World.prototype.getSyncProps = function(){
	return ['worldTime'];
}

//btw this is how you do inheritance - maybe? look up node.js inheritance
//World.prototype.__proto__ = somother prototype object, i.e.: Object.prototype
//this lets us emit events
World.prototype.__proto__ = events.EventEmitter.prototype;

World.prototype.newConnection = function(socket){
	//netchan takes care of talking to clients
	//console.log('netchan: ' + this);
	this.clients++;

	player = new Player(this, socket);
	this.playerList.push(player);

	this.emit("newplayer", player);

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

	var newTime = (new Date()).getTime()
	var timeDiff = newTime - this.lastUpdate;
	this.lastUpdate = newTime;

	var sTimeDiff = timeDiff / 1000; //convert to seconds
	console.log("world update timeDiff: "+ timeDiff + " sTimeDiff:" + timeDiff / 1000);

	this.emit("update", sTimeDiff);

	//update our network channel
	this.netchan.update();
}