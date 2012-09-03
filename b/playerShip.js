//player.js
//fires events based on the player
//relatively lame object that other modules can attach properties to
var GameObject  =require('./gameObject.js');
var events = require("events")

exports = module.exports = PlayerShip;

PlayerShip.prototype.__proto__ = GameObject.prototype;

function PlayerShip(world, socket){
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