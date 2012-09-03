//world.js for client

function World(socket){
	this.socket = socket;
	this.WorldData = {};
	this.network = new Network(this);

	this.events = new EventEmitter();
	this.events.on("init", function(){ console.log("world init"); });
	this.events.on("update", function(){ console.log("world update"); });

	var that = this
	this.events.on("update", function(){ //handle the update to the shiplist
		var items = [];
		for(ship in that.WorldData[0].shipList){
			so = that.WorldData[0].shipList[ship];
			var shiphtml = "<li>"+so.name+" x: "+ so.x+" y:"+so.y+ " rot:"+so.rot;
			shiphtml += " <a href='javascript:void'>Attach</a>"
			shiphtml += "</li>"
			items.push(shiphtml);
		}
		$("#shiplist").empty();
		$("#shiplist").append(items.join(''))
		//console.log(items)

		//update players
		var players = [];
		for(i in that.WorldData[0].playerList){
			var player = that.WorldData[0].playerList[i]
			var html = "<li>"+player.name+"</li>"
		}	
	})
}

//World.prototype.__proto__ = events.EventEmitter.prototype;