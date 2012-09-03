var events = require("events")

exports = module.exports = Ship;

function Ship(world, name){
	this.x = 0;
	this.y = 0;
	this.accel = 1;
	this.accel_on = 0;
	this.accel_this_frame = 0;
	this.rot = 0; //in degrees - 0 is up
	this.world = world;
	this.name = name;

	world.netchan.registerObject(this);

	//do stupid hack for callbacks
	var that = this;

	//register world update and new player notification
	world.on("update", function(timeSlice){ that.update(timeSlice) })
	world.on('newplayer', function(player){ that.onNewPlayer(player) })

	// setup per object RPC - this way a client can send messages to a particular instantiated object by referencing it's netid
	this.objectRPC = new events.EventEmitter();	
	this.objectRPC.on('attach_to_ship', function(player, data){
		//console.log("ship object rpc");
		//attach player
		player.on('ship_accelerate_down', function(player, data){ that.accel_down(player, data) });
		player.on('ship_accelerate_up', function(player, data){ that.accel_up(player, data) });
		player.on('ship_accelerate_left', function(player, data){ that.accel_left(player, data) });
		player.on('ship_accelerate_right', function(player, data){ that.accel_right(player, data) });
	})

	//register ship client messages
	//all connections can control this ship
	//var io = world.io;
	//io.sockets.on('connection', function(socket){ that.onConnection(socket) })
}

//called when a new player joins a game, we register to see their messages
Ship.prototype.onNewPlayer = function(player){
	
}

Ship.prototype.getSyncProps = function(){
	return ['x', 'y', 'rot', 'name'];
}

Ship.prototype.update = function(timeSlice){
	//apply acceleration
	if(this.accel_this_frame || this.accel_on){
		var deltax = Math.sin(Math.PI * this.rot / 180) * this.accel * timeSlice;
		var deltay = Math.cos(Math.PI * this.rot / 180) * this.accel * timeSlice; //cos 0 = 1, so 0 is degree that is up

		//console.log("applying acceleration Math.sin(rot): " + Math.sin(this.rot) + " accel: " + this.accel + " timeSlice: " + timeSlice);
		//console.log("applying acceleration dx: " + deltax + " dy:" + deltay);

		this.x = this.x + deltax;
		this.y += deltay;
	}
	this.accel_this_frame = 0;
}

Ship.prototype.accel_down = function(player, data){
	this.accel_on = 1
	this.accel_this_frame = 1
}

Ship.prototype.accel_up = function(player, data){
	this.accel_on = 0;
}

Ship.prototype.accel_left = function(player, data){
	//console.log("left")
	this.rot -= 5;
	this.clampRot();
}

Ship.prototype.accel_right = function(player, data){
	//console.log("right")
	this.rot += 5;
	this.clampRot();
}

Ship.prototype.clampRot = function(){
	//rotate rotation
	if(this.rot < 0){
		this.rot += 360;
	} else if(this.rot >= 360){
		this.rot -= 360;
	}
}