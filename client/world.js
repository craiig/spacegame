//world.js for client

function World(socket){
	this.socket = socket;
	this.WorldData = {};
	this.network = new Network(this);

	this.events = new EventEmitter();
	this.events.on("init", function(){ console.log("world init"); });
	this.events.on("update", function(){ console.log("world update"); });

	var that = this

	this.events.on("init", function(){
		that.world = that.WorldData[0]; //assign world for convenience
	})

	this.events.on("update", function(){ //handle the update to the shiplist
		var items = [];
		for(ship in that.world.shipList){
			so = that.world.shipList[ship];
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
		for(i in that.world.playerList){
			var player = that.world.playerList[i]
			var html = "<li>"+player.name+"</li>"
			players.push(html)
		}

		$("#playerlist").empty();
		$("#playerlist").append(players.join(''))
	})
}

//World.prototype.__proto__ = events.EventEmitter.prototype;