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
		console.log('update1');
		//$("#svgelem").empty();
		

// Get a reference to the element.
var elem = document.getElementById('example');

// Always check for properties and methods, to make sure your code doesn't break 
// in other browsers.
if (elem && elem.getContext) {
  // Get the 2d context.
  // Remember: you can only initialize one context per element.
  var context = elem.getContext('2d');
  if (context) {
    // You are done! Now you can draw your first rectangle.
    // You only need to provide the (x,y) coordinates, followed by the width and 
    // height dimensions.
   

for (obj in that.WorldData){
			var xobj = that.WorldData[obj];
			console.log(obj);
			console.log(xobj);
			
			console.log('update1a');
			try {
				var cxx =  "#" + Math.floor((Math.random() *4095)).toString(16);
				context.fillStyle   =cxx;
				console.log(cxx);
				//$("#svgelem").append('<circle id="c' + obj + '" cx="' + Math.floor(xobj.coords[0] +500) + '" cy="' + Math.floor(xobj.coords[1] + 500) + '" r="5" fill="red" />');
				context.fillRect(xobj.coords[0] +500,  (xobj.coords[1] + 500) , 5,  5);
			} catch (err){}
			
		}

  }
}
		console.log('update2');

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