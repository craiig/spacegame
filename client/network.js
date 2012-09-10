
//client side network module
function Network(world){
	this.socket = socket;
	this.world = world;

	var that = this;
	this.socket.on('objectlist', function(data){ that.receiveObjectList(data); } );
	this.socket.on('objectupdate', function(data){ that.receiveObjectUpdate(data); } );
}

Network.prototype.resolveNetIDs = function(obj){
	//for each property of this object, check it for netid, if so, reference the net id in the world
	//results in reference based structure
	var WorldData = this.world.WorldData;

	for(var prop in obj){
		var pobj = obj[prop];
		try {
		if(pobj._netid_ptr !== undefined){
			//console.log(obj[prop])
			obj[prop] = WorldData[pobj._netid_ptr];
			//console.log(obj[prop])
		} 
	} catch (errx){}
		// else if(typeof(pobj) == "object" && pobj !== null){
		// 	//console.log("rni: "+prop)
		// 	//console.log(pobj)
		// 	this.resolveNetIDs(pobj);
		// } 
	}
}

Network.prototype.receiveObjectList = function(data){
    //console.log("object list:");
    //console.log(data);
    var WorldData = this.world.WorldData;
    for(d in data){
      //console.log(data[d])
      WorldData[data[d].netid] = data[d].data;
    }
    //console.log(WorldData)
    //resolve any netid pointers
    for(d in WorldData){
      this.resolveNetIDs(WorldData[d]);
    }
    //WorldData[0].primaryShip.x = 100; //tests the references
    //console.log(WorldData)
    world.events.emit("init");
}

Network.prototype.receiveObjectUpdate = function(data){
	//console.log("object update");
	//console.log(data);
	var WorldData = this.world.WorldData;

	//send ping back immediately since we'll block processing and we can use it to measure how long this takes
	//d = new Date();
	//lastPing = d.getTime()
	//this.world.socket.emit('ping', { time: lastPing });
	this.world.socket.emit('ping', { time: (new Date()).getTime() });

	//update loop
	for(d in data){
		//WorldData[data[d].netid] = data[d].data
		var netid = data[d].netid;

		if(WorldData[netid] === undefined){ //new object received
			WorldData[netid] = data[d].data;
		} else {
			//update to existing object
			var obj = data[d].data;
			for(prop in obj){
				WorldData[netid][prop] = obj[prop];
				//console.log("updating prop: "+prop+" = "+obj[prop]);
			}
		}
	}

	//fix up any pointers
	for(d in WorldData){
		this.resolveNetIDs(WorldData[d]);	
	}

	world.events.emit("update");
}