//world.js for client

function World(socket){
	this.socket = socket;
	this.WorldData = {};// new Array(); //{};
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
		// Get a reference to the element.
		var elem = document.getElementById('example');
		if (elem && elem.getContext) {
			var context = elem.getContext('2d');
  			if (context) {
				var colVal = 16777215;
				var colInc = Math.floor(16777216 / Object.keys(that.WorldData).length);

				for (obj in that.WorldData){
					var xobj = that.WorldData[obj];
					if ((that.WorldData[obj].prevCoord!==undefined)&&(that.GameServerTime==undefined)){
						if (
							(that.WorldData[obj].prevCoord[0]>=-2500 )
							&& 
							(that.WorldData[obj].prevCoord[0]<=2500)
							&&
							(that.WorldData[obj].prevCoord[1]>=-2500 )
							&& 
							(that.WorldData[obj].prevCoord[1]<=2500)
							&&
							(xobj.coords[0]>=-2500 ) 
							&& 
							(xobj.coords[0]<=2500)
							&&
							(xobj.coords[1]>=-2500 ) 
							&& 
							(xobj.coords[1]<=2500)
							) {
								colVal -= colInc;
								var cxx = colVal.toString(16);
								while (cxx.length < 6){
										cxx = "0" + cxx;
								}
								cxx =  "#"  +  cxx;
								context.beginPath();
								context.moveTo(that.WorldData[obj].prevCoord[0]+2500, that.WorldData[obj].prevCoord[1]+2500);	
								context.lineTo((xobj.coords[0] +2500), (xobj.coords[1] + 2500) );
								context.lineWidth = 1;
								context.strokeStyle =cxx;
								context.rect((xobj.coords[0] +2500), (xobj.coords[1] + 2500),5,5);
								context.stroke();
								that.WorldData[obj].prevCoord = xobj.coords; 
							}					
						} else if (that.GameServerTime==undefined) {
							that.WorldData[obj].prevCoord = xobj.coords; 
						}
					}
				}
			}	
			for(ship in that.world.shipList){
				so = that.world.shipList[ship];
				var shiphtml = "<li>"+so.name+" x: "+ so.x+" y:"+so.y+ " rot:"+so.rot;
				shiphtml += " <a href='javascript:void'>Attach</a>"
				shiphtml += "</li>"
				items.push(shiphtml);
			}

			$("#shiplist").empty();
			$("#shiplist").append(items.join(''))

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