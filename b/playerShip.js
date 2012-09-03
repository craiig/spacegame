//player.js
//fires events based on the player
//relatively lame object that other modules can attach properties to
var physicalObject  =require('./physicalObject.js');
var events = require("events")

exports = module.exports = PlayerShip;

PlayerShip.prototype.__proto__ = physicalObject.prototype;

function PlayerShip(world, socket){
	this.isPlayerShip = true;
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