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
   console.log('len:' + that.WorldData.length);
console.log(that.WorldData);
var colVal = 4095;
var colInc = Math.floor(4096 / that.WorldData.length);

for (obj in that.WorldData){
			var xobj = that.WorldData[obj];
			console.log(obj);
			console.log(xobj);
			console.log(colVal);
			console.log('update1a');
			try {
				colVal -= colInc;
				var cxx = colVal.toString(16);
				while (cxx.length < 3){
						cxx = "0" + cxx;

				}
				cxx =  "#"  +  colVal.toString(16);
				console.log(cxx);
				context.fillStyle  =cxx;
				console.log(cxx);
				//$("#svgelem").append('<circle id="c' + obj + '" cx="' + Math.floor(xobj.coords[0] +500) + '" cy="' + Math.floor(xobj.coords[1] + 500) + '" r="5" fill="red" />');
				//context.fillRect(xobj.coords[0] +2500,  (xobj.coords[1] + 2500) , 5,  5);
				//context.fillStyle  ='#000';
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
						context.moveTo(that.WorldData[obj].prevCoord[0]+2500,that.WorldData[obj].prevCoord[1]+2500);	
						context.lineTo(xobj.coords[0] +2500,  (xobj.coords[1] + 2500) );
						context.stroke();
						that.WorldData[obj].prevCoord = xobj.coords; 
					}
					
				} 
				//context.fillRect(xobj.coords[0] +2501,  (xobj.coords[1] + 2501) , 4,  4);
				
				
				
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