//player.js
//fires events based on the player
//relatively lame object that other modules can attach properties to

var events = require("events")

exports = module.exports = Player;

var playerCount;

function Player(world, socket){
	this.socket = socket;
	this.name = "space derp "+playerCount;
	this.area=undefined;
	world.netchan.registerObject(this);

	this.on("player_name_set", function(player, data){ 
		if(data.name != undefined){
			player.name = name;
		}
	} );

	this.on("player_list_area", function(player, data){ 
		console.log('player_list_area');
	} );
	this.on("player_list_ships_in_area", function(player, data){ 
		console.log('player_list_ships_in_area');
	} );
	this.on("player_join_ship", function(player, data){ 
		console.log('player_join_ship');
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