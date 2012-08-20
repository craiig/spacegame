
//basic world model
//increments the worldTime whenever it is updated

var network = require('./network.js')

exports.create = function(){
	var newobj = {
		worldTime : 0,
		lastClientTime : 0,
		init: this.init,
		update: this.update,
		//netchan: network.create(),
		getSyncProps: this.getSyncProps,
		newConnection : this.newConnection,
	}

	newobj.netchan = network.create(newobj);
	newobj.netchan.registerObject(newobj); //tell the netchan about the world object

	return newobj;
}

exports.init = function(){

}

exports.newConnection = function(socket){
	//netchan takes care of talking to clients
	//console.log('netchan: ' + this);
	this.netchan.onConnection(socket);
	this.clients++;

	//setup any other notifications
	socket.on('disconnect', function(){
		this.clients--;
	})
}

exports.update = function(){
	//perform the world-step
	this.worldTime++;
	console.log("world update, worldtime: " + this.worldTime);
	//update our network channel
	this.netchan.update();
}

exports.getSyncProps = function(){
	return ['worldTime', 'lastClientTime'];
}