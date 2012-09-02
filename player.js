//player.js
//fires events based on the player
//relatively lame object that other modules can attach properties to

var events = require("events")

exports = module.exports = Player;

function Player(world, socket){
	this.socket = socket;
}

//shim into the event callback so we can insert the player message
Player.prototype.on = function(event, callback){
	var that = this;
	this.socket.on(event, function(data){
		callback(that, data);
	})
}