exports = module.exports = Ship;

function Ship(world){
	this.x = 0;
	this.y = 0;
	this.accel = 1;
	this.accel_on = 0;
	this.rot = 0; //in degrees - 0 is up
	this.world = world;
	this.name = "SHIP KING"; //lololol

	world.netchan.registerObject(this);

	//do stupid hack for callbacks
	var that = this;
	//register world update
	world.on("update", function(){ that.update() })

	//register ship client messages
	var io = world.io;
	io.sockets.on('ship_accelerate_down', function(data){ that.accel_down(data) });
	io.sockets.on('ship_accelerate_up', function(data){ that.accel_up(data) });
	io.sockets.on('ship_accelerate_left', function(data){ that.accel_left(data) });
	io.sockets.on('ship_accelerate_right', function(data){ that.accel_right(data) });
}

Ship.prototype.getSyncProps = function(){
	return ['x', 'y', 'rot', 'name'];
}

Ship.prototype.update = function(timeSlice){
	console.log("ship update");
	//apply acceleration
	if(this.accel_on){
		console.log("applying acceleration");
		this.x += Math.sin(this.rot) * this.accel * timeSlice;
		this.y += Math.cos(this.rot) * this.accel * timeSlice; //cos 0 = 1, so 0 is degree that is up
	}
}

Ship.prototype.accel_down = function(data){
	this.accel_on = 1
	console.log("accel down")
}

Ship.prototype.accel_up = function(data){
	this.accel_on = 0;
	console.log("accel off")
}

Ship.prototype.accel_left = function(data){
	this.rot -= 0.1;
	this.clampRot();
}

Ship.prototype.accel_right = function(data){
	this.rot += 0.1;
	this.clampRot();
}

Ship.prototype.clampRot = function(){
	//rotate rotation
	if(this.rot < -1){
		this.rot += 1;
	} else if(this.rot > 1){
		this.rot -= 1;
	}
}