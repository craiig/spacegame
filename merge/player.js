//player.js
//fires events based on the player
//relatively lame object that other modules can attach properties to

var events = require("events")

exports = module.exports = Player;

var playerCount=0;

function Player(world, socket){
	this.socket = socket;
	playerCount++;
	this.name = "space derp " + playerCount;
	this.area=undefined;
	world.netchan.registerObject(this);

	this.on("player_name_set", function(player, data){ 
		if(data.name != undefined){
			player.name = name;
		}
	} );

}

Player.prototype.getSyncProps = function(){
	return ['name','area'];
}

//shim into the event callback so we can insert the player message
Player.prototype.on = function(event, callback){
	var that = this;
	this.socket.on(event, function(data){
		callback(that, data);
	})
}