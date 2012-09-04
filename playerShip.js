
//fires events based on the player
//relatively lame object that other modules can attach properties to
var physicalObject  =require('./physicalObject.js');
var events = require("events")

exports = module.exports = PlayerShip;

PlayerShip.prototype.__proto__ = physicalObject.prototype;

function PlayerShip(world, socket){
	this.isPlayerShip = true;

	world.netchan.registerObject(this);

	//do stupid hack for callbacks
	var that = this;
	//register world update and new player notification
	world.on("update", function(timeSlice){ that.update(timeSlice) })
	world.on('newplayer', function(player){ that.onNewPlayer(player) })

	// setup per object RPC - this way a client can send messages to a particular instantiated object by referencing it's netid
	this.objectRPC = new events.EventEmitter();	
	this.objectRPC.on('attach_to_ship', function(player, data){
		player.on('ship_accelerate_down', function(player, data){ that.accel_down(player, data) });
		player.on('ship_accelerate_up', function(player, data){ that.accel_up(player, data) });
		player.on('ship_accelerate_left', function(player, data){ that.accel_left(player, data) });
		player.on('ship_accelerate_right', function(player, data){ that.accel_right(player, data) });
	})
}

PlayerShip.prototype.getSyncProps = function(){
	return ['coords', 'heading','mass','model','state'];
}

//shim into the event callback so we can insert the player message
PlayerShip.prototype.on = function(event, callback){
	var that = this;
	this.socket.on(event, function(data){
		callback(that, data);
	})
}


PlayerShip.prototype.accel_down = function(player, data){
	this.heading[0] *= 1.01
}

PlayerShip.prototype.accel_up = function(player, data){
}

PlayerShip.prototype.accel_left = function(player, data){
	//console.log("left")
	this.heading[1] -= Math.PI / 16;
}

PlayerShip.prototype.accel_right = function(player, data){
	//console.log("right")
	this.heading[1] += Math.PI / 16;
}