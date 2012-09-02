//network module
// world objects register with this system for their state to be synchronized with the client
// employs delta compression to only send changes
// one network module per world
// so we need to instantiate a network object and pass it back

//init
exports = module.exports = Network;

function Network(world) {
	
	//create a network object
	//just import some of our functions below - better IMO than having a large list of nested functions
	this.objectList =  new Array(),
	this.socketList = new Array(),
	this.io = world.io;

	var that = this
	this.io.sockets.on('connection', function(socket){ that.onConnection(socket) });
}

Network.prototype.onConnection = function(socket){ //event registered with socket.io
	//new connection!
	//add ref to socket somewhere
	//
	this.socketList.push(socket);

	/*socket.on("lastclientupdate", function(data){
		console.log("lastclientupdate");
		console.log(data)
	})*/

	//socket.emit("objectlist", this.objectList);
	fullUpdate = this.calcFullUpdate();
	socket.emit("objectlist", fullUpdate);
}

Network.prototype.test = function(){
	//test of networking code:
	netChan = Network();
	netChan2 = Network();
	timer  = {curtime: 0};
	timer.getSyncProps = function(){
		return ['curtime'];
	}
	console.log(timer.getSyncProps());
	netChan.registerObject(timer);
	 timer.curtime = 1; //checking referencing - passes
	console.log("First update:")
	console.log(netChan.calcUpdate());

	console.log("Second update:") //should output nothing
	console.log(netChan.calcUpdate());

	timer.curtime = 2
	console.log("Third update:") //should output 2
	console.log(netChan.calcUpdate());
	//passes!
	timer.curtime = 3;

	console.log("netchan2 update:")
	console.log(netChan2.calcUpdate()); //should output nothing
	console.log("netchan update:")
	console.log(netChan.calcUpdate()); //should output 3
	//end networking code test
}

//register an object to be synchronized between client/server
Network.prototype.registerObject = function(obj){
	//add a new sync object to the list
	if(obj.getSyncProps !== undefined){
		o = { obj: obj, id: this.nextObjectID++, syncedProps: {} }

		this.objectList.push( o );
	} else {
		console.error("error: attempting to register object without getSyncProps");
		console.trace();
	}
}

//called by the world
Network.prototype.update = function(){
	messages = this.calcPartialUpdate();

	//send the message down all known sockets
	for (var i = this.socketList.length - 1; i >= 0; i--) {
		socket = this.socketList[i];
		socket.emit("objectupdate", messages);
	};

	return messages;
}

Network.prototype.calcFullUpdate = function(){
	//iterate over objects and their registered properties to find all properties to send to a new client
	var updateMsgs = [];


	for (var i = this.objectList.length - 1; i >= 0; i--) {
		var syncobj = this.objectList[i];

		var syncprops = syncobj.obj.getSyncProps(); //returns name of properties to sync, assured to be here by register

		var msg = {}
		var msgUpdated = 0;

		for (var i = syncprops.length - 1; i >= 0; i--) {
			var prop = syncprops[i];
			var val = syncobj.obj[prop];
			//add property to outgoing buffer
			msg[prop] = val;
		}

		msg['id'] = syncobj.id; //always include id
		updateMsgs.push(msg); //queue object for update
	}

	return updateMsgs;
}

Network.prototype.calcPartialUpdate = function(){
	//iterate over objects and their registered properties to find changed properties since last time
	var updateMsgs = [];

	for (var i = this.objectList.length - 1; i >= 0; i--) {
		var syncobj = this.objectList[i];

		var syncprops = syncobj.obj.getSyncProps(); //returns name of properties to sync, assured to be here by register

		var msg = {}
		var msgUpdated = 0;

		for (var i = syncprops.length - 1; i >= 0; i--) {
			var prop = syncprops[i];

			if(syncobj.syncedProps[prop] === undefined || syncobj.syncedProps[prop] != syncobj.obj[prop]){
				//update if we haven't seen this prop before, or if it's not what we expected

				var val = syncobj.obj[prop];
				//add property to outgoing buffer
				msg[prop] = val;
				msgUpdated = 1;

				//copy property to our synced objects
				syncobj.syncedProps[prop] = val;
			}
		}

		//console.log(msg.length)
		if(msgUpdated){
			msg['id'] = syncobj.id; //always include id
			updateMsgs.push(msg); //queue object for update
		}
	}

	return updateMsgs;
}