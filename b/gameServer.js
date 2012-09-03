
//basic GameServer model
//increments the GameServerTime whenever it is updated

//todo: GameServer model is basically an event-emitter as described in the node.js documentation
//http://nodejs.org/api/events.html#events_class_events_eventemitter
// if GameServer model was made to be an event emitter, game objects could attach actions to the GameServer update event easily

var network = require('./snetwork.js');
var GameObject = require('./gameObject.js');
var Area = rquire('./area.js');
var fs = require('fs');
var events = require('events');

exports = module.exports = GameServer;

function GameServer(io) {
	this.GameServerTime = 0;
	this.clients = 0;
	this.io = io;
	this.lastUpdate = (new Date()).getTime(); //last update time
	this.playerList = new Array();
	this.areaList = new Array();
	
	this.netchan = new network(this);
	this.netchan.registerObject(this);
	
	//register some callbacks - this is annoying to do this way, but our other options are way worse: http://www.dustindiaz.com/scoping-anonymous-functions/
	var that = this
	setInterval( function(){that.update()}, 1000); //1 fps

	this.io.sockets.on('connection', function(socket){ that.newConnection(socket) });
};


GameServer.prototype.getSyncProps = function(){
	return ['GameServerTime'];
};

GameServer.prototype.__proto__ = events.EventEmitter.prototype;

GameServer.prototype.newConnection = function(socket){
	this.clients++;

	player = new Player(this, socket);
	this.playerList.push(player);
	this.emit("newplayer", player);

	//setup any other notifications
	var that = this;
	socket.on('disconnect', function(socket){ that.clients--; });
};

GameServer.prototype.update = function(){
	//perform the GameServer-step
	this.GameServerTime++;
	//console.log("GameServer update, GameServertime: " + this.GameServerTime);

	var newTime = (new Date()).getTime()
	var timeDiff = newTime - this.lastUpdate;
	this.lastUpdate = newTime;

	var sTimeDiff = timeDiff / 1000; //convert to seconds
	//console.log("GameServer update timeDiff: "+ timeDiff + " sTimeDiff:" + timeDiff / 1000);

	this.emit("update", sTimeDiff);

	//update our network channel
	this.netchan.update();
};


GameServer.prototype.loadArea = function(filename){
	x=fs.readFileSync(filename);
	newArea = new Area();
	for (y in x){
		newArea.addObject(y);
	};
	this.areaList.push(newArea);
};

GameServer.prototype.saveArea = function(filename,area){
	fs.truncate(filename);
	for (x in area.allObjects) {
		fs.appendFileSync(filename,x,encoding='utf8');
	};
};

GameServer.prototype.destroyArea = function(areaToDestroy){
//can we literally just set the object in areaList to nothing??
};








