exports = module.exports = Ship;

function Ship(world){
	this.x = 0;
	this.y = 0;
	this.rot = 0; //in degrees - 0 is up
	this.world = world;

	world.netchan.registerObject(this);

	//do stupid hack for callbacks
	var that = this;
	//register world update
	world.on("update", function(){ that.update() })

	//register ship client messages
	io.sockets.on('ship_accelerate_down', function(socket){ that.accel_down(socket) });
	io.sockets.on('ship_accelerate_up', function(socket){ that.accel_up(socket) });
	io.sockets.on('ship_accelerate_left', function(socket){ that.accel_left(socket) });
	io.sockets.on('ship_accelerate_right', function(socket){ that.accel_right(socket) });
}

Ship.prototype.getSyncProps = function(){
	return ['x', 'y'];
}

Ship.prototype.update(){
	//apply acceleration
	if(this.accel_on){
		this.x += Math.sin(this.rot) * this.accel;
		this.y += Math.cos(this.rot) * this.accel; //cos 0 = 1, so 0 is degree that is up
	}
}

Ship.prototype.accel_down(socket){
	this.accel_on = 1
}

Ship.prototype.accel_up(socket){
	this.accel_on = 0;
}

Ship.prototype.accel_left(socket){
	this.rot -= 0.1;
	this.clampRot();
}

Ship.prototype.accel_right(socket){
	this.rot += 0.1;
	this.clampRot();
}

Ship.prototype.clampRot(){
	//rotate rotation
	if(this.rot < -1){
		this.rot += 1;
	} else if(this.rot > 1){
		this.rot -= 1;
	}
}