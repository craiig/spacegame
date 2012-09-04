
//basic GameServer model
//increments the GameServerTime whenever it is updated

//todo: GameServer model is basically an event-emitter as described in the node.js documentation
//http://nodejs.org/api/events.html#events_class_events_eventemitter
// if GameServer model was made to be an event emitter, game objects could attach actions to the GameServer update event easily

var network = require('./snetwork.js');
var physicalObject = require('./physicalObject.js');
var area = require('./area.js');
var Player = require('./player.js');
var PlayerShip = require('./PlayerShip.js');
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
	this.myFlag = false;
	this.fileLoaded = false;
	//register some callbacks - this is annoying to do this way, but our other options are way worse: http://www.dustindiaz.com/scoping-anonymous-functions/
	var that = this
	setInterval( function(){that.update()}, 1000); //1 fps
	setInterval( function(){that.slowUpdate()}, 2000); //1 fps

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
	this.GameServerTime++;
	var newTime = (new Date()).getTime()
	var timeDiff = newTime - this.lastUpdate;
	this.lastUpdate = newTime;

	var sTimeDiff = timeDiff / 1000; //convert to seconds
	this.emit("update", sTimeDiff);
	//this.saveArea('./TestArea1',this.areaList[0]);

	/* if ((this.myFlag==false) && (this.fileLoaded==true)){
		console.log('gogogog');
		a = new go();
		a.name = 'TestObject1';
		console.log(this.areaList[0]);

		q=this.areaList[0];
		q.prototype = area.prototype;
		q.addObject(a);
		a = new PlayerShip();
		a.name = 'TestPlayerShip';
		this.areaList[0].playerShips.push(a);
		//this.saveArea('./b/TestArea1',this.areaList[0]);		
	
	}
*/
	//update our network channel
	this.netchan.update();
};

GameServer.prototype.slowUpdate = function(that){
	for (i=0; i< this.areaList.length; i++) {
		a = this.areaList[i];
		a.prototype = area.prototype;
		a.updateSlow(1);
	}
	this.emit("slowUpdate", this.GameServerTime);
	this.netchan.update();
};


GameServer.prototype.loadArea = function(filename){
	x=fs.readFileSync(filename);
	newArea = new area();
	areaProps = JSON.parse(x);

	for(p in areaProps){
		newArea[p] = areaProps[p];
	}

	//iterate over each physical object and instantiate new class
	for(objindex in newArea.allObjects){
		var obj = (newArea.allObjects[objindex]);
		var newObj = new physicalObject();
		for(p in obj){
			newObj[p] = obj[p];
		}
		newArea.allObjects[objindex] = newObj
	}

	this.areaList.push(newArea);
	this.fileLoaded = true;
};

GameServer.prototype.saveArea = function(filename,area){
	//fs.truncate(filename);
	fs.appendFileSync(filename,JSON.stringify(area),encoding='utf8');
};

GameServer.prototype.destroyArea = function(areaToDestroy){
//can we literally just set the object in areaList to nothing??
//or do we have to step through the area's objects
};








