exports = module.exports = Ship;

function Ship(world){
	this.x = 0;
	this.y = 0;
	this.accel = 1;
	this.accel_this_frame = 0;
	this.rot = 0; //in degrees - 0 is up
	this.world = world;
	this.name = "SHIP KING"; //lololol

	world.netchan.registerObject(this);

	//do stupid hack for callbacks
	var that = this;
	//register world update
	world.on("update", function(timeSlice){ that.update(timeSlice) })

	//register ship client messages
	var io = world.io;
	io.sockets.on('connection', function(socket){ that.onConnection(socket) })
}

Ship.prototype.onConnection = function(socket){
	var that = this;
	socket.on('ship_accelerate_down', function(data){ that.accel_down(data) });
	socket.on('ship_accelerate_up', function(data){ that.accel_up(data) });
	socket.on('ship_accelerate_left', function(data){ that.accel_left(data) });
	socket.on('ship_accelerate_right', function(data){ that.accel_right(data) });
}

Ship.prototype.getSyncProps = function(){
	return ['x', 'y', 'rot', 'name'];
}

Ship.prototype.update = function(timeSlice){
	//apply acceleration
	if(this.accel_this_frame){
		var deltax = Math.sin(Math.PI * this.rot / 180) * this.accel * timeSlice;
		var deltay = Math.cos(Math.PI * this.rot / 180) * this.accel * timeSlice; //cos 0 = 1, so 0 is degree that is up

		console.log("applying acceleration Math.sin(rot): " + Math.sin(this.rot) + " accel: " + this.accel + " timeSlice: " + timeSlice);
		//console.log("applying acceleration dx: " + deltax + " dy:" + deltay);

		this.x += deltax;
		this.y += deltay;
	}
	this.accel_this_frame = 0;
}

Ship.prototype.accel_down = function(data){
	this.accel_this_frame = 1
}

Ship.prototype.accel_up = function(data){
	//this.accel_on = 0;
}

Ship.prototype.accel_left = function(data){
	this.rot -= 5;
	this.clampRot();
}

Ship.prototype.accel_right = function(data){
	this.rot += 5;
	this.clampRot();
}

Ship.prototype.clampRot = function(){
	//rotate rotation
	if(this.rot < 0){
		this.rot += 360;
	} else if(this.rot > 360){
		this.rot -= 360;
	}
}