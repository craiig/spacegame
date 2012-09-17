//world.js for client

function World(socket){
	this.socket = socket;
	this.WorldData = {};// new Array(); //{};
	this.network = new Network(this);
	//this.bounds = [[-2500,2500],[-2500,2500]];
	//this.midpoint=[0,0];
	//this.half = [2500,2500];
	this.events = new EventEmitter();
	this.events.on("init", function(){ //console.log("world init"); 
});
	this.events.on("update", function(){ //console.log("world update"); 
});
	this.isGfxInit = false;

	var that = this


	this.events.on("init", function(){
		that.world = that.WorldData[0]; //assign world for convenience
	})

	this.events.on("update", function(){ //handle the update to the shiplist
		//var boundsFlag = false;
		//var tempBounds = that.bounds;
		var items = [];
		// Get a reference to the element.
// 		var elem = document.getElementById('example');
// 		if (elem && elem.getContext) {
// 			var context = elem.getContext('2d');
//   			if (context) {
// 				if (that.isGfxInit==false) {
// 					context.fillRect(0,0,elem.width,elem.height);
// 					that.isGfxInit=true;
// 				}




//#ffffff
				// var colVal = 16777215;
				// var colInc = Math.floor(16777215 / Object.keys(that.WorldData).length);

				// for (obj in that.WorldData){
				// 	colVal -= colInc;								
				// 	var xobj = that.WorldData[obj];

				// 	if (that.GameServerTime!==undefined) {
				// 		console.log(that.WorldData[obj]);

				// 	}


				// 	//probably a better way to identify object types than this
				// 	if ((that.WorldData[obj].prevCoord!=undefined)&&(that.WorldData[obj].GameServerTime==undefined)){
				// 		if (
				// 			(xobj.coords[0]>=that.bounds[0][0] ) 
				// 			&& 
				// 			(xobj.coords[0]<=that.bounds[0][1] )
				// 			&&
				// 			(xobj.coords[1]>=that.bounds[1][0]  ) 
				// 			&& 
				// 			(xobj.coords[1]<=that.bounds[1][1])
				// 			) {
				// 				var cxx = colVal.toString(16);
				// 				while (cxx.length < 6){
				// 						cxx = "0" + cxx;
				// 				}
				// 				cxx =  "#"  +  cxx;
				// 				}
				// 			}
				// 		}







// 				//#ffffff
// 				var colVal = 16777215;
// 				var colInc = Math.floor(16777215 / Object.keys(that.WorldData).length);

// 				for (obj in that.WorldData){
// 					colVal -= colInc;								
// 					var xobj = that.WorldData[obj];

// 					//probably a better way to identify object types than this
// 					if ((that.WorldData[obj].prevCoord!=undefined)&&(that.GameServerTime==undefined)){
// 						if (
// 							(xobj.coords[0]>=that.bounds[0][0] ) 
// 							&& 
// 							(xobj.coords[0]<=that.bounds[0][1] )
// 							&&
// 							(xobj.coords[1]>=that.bounds[1][0]  ) 
// 							&& 
// 							(xobj.coords[1]<=that.bounds[1][1])
// 							) {
// 								var cxx = colVal.toString(16);
// 								while (cxx.length < 6){
// 										cxx = "0" + cxx;
// 								}
// 								cxx =  "#"  +  cxx;
// 								context.fillStyle =cxx;
// 								context.fillRect(that.WorldData[obj].prevCoord[0]+that.half[0], that.WorldData[obj].prevCoord[1]+that.half[1],5,5);	

// 								context.beginPath();
// 								context.moveTo(that.WorldData[obj].prevCoord[0]+that.half[0], that.WorldData[obj].prevCoord[1]+that.half[1]);	
// 								context.lineTo((xobj.coords[0] +that.half[0]), (xobj.coords[1] + that.half[1]) );
// 								context.lineWidth = 1;
// 								context.strokeStyle =cxx;
// 								context.fillStyle ="#000000";
// 								context.stroke();
// 								context.rect((xobj.coords[0] +that.half[0]), (xobj.coords[1] + that.half[1]),5,5);
// 								context.fill();
// 								//context.strokeStyle ="#000000";
// 								context.stroke();
// 								that.WorldData[obj].prevCoord = xobj.coords; 
// 							} else {
// 								if (xobj.coords[0]<that.bounds[0][0])tempBounds[0][0]=Math.floor(xobj.coords[0]);
// 								if (xobj.coords[0]>that.bounds[0][1])tempBounds[0][1]=Math.floor(xobj.coords[0]);
// 								if (xobj.coords[1]<that.bounds[1][0])tempBounds[1][0]=Math.floor(xobj.coords[1]);
// 								if (xobj.coords[1]>that.bounds[1][1])tempBounds[1][1]=Math.floor(xobj.coords[1]);
// 								//boundsFlag=true;
// 							}					
// 						} else if ((that.GameServerTime==undefined)&&(that.WorldData[obj].prevCoord==undefined)) {
// 							that.WorldData[obj].prevCoord = xobj.coords; 	
// 						} 					}
// 				}

				
// 				console.log('b:' + tempBounds);
// 				if (boundsFlag!=false) {
// 					//console.log('bounds');
// 					var tempHalf = [Math.floor((Math.abs(tempBounds[0][1])+Math.abs(tempBounds[0][0]))/2),
// 								Math.floor(Math.abs((tempBounds[1][1])+Math.abs(tempBounds[1][0]))/2)];

// 					var delta = [tempHalf[0] - that.half[0],tempHalf[1]-that.half[1]];

// //console.log(that.midpoint);
// //console.log(tempPoint);
// console.log('half:');
// console.log(that.half);
// 					//that.midpoint = tempPoint;
// 					that.half = tempHalf;

// 					//var canvasData = '';
// 					var canvasData = context.createImageData(elem.width, elem.height);
// 					//console.log(elem.width);
// 					//canvasData = context.getImageData(0, 0, elem.width, elem.height);
// 					canvasData = context.getImageData(0, 0, elem.width, elem.height);
					
// 					//img.src = elem.toDataURL("image/png");
// //context.resize(delta[0],delta[1]);
// elem.width += delta[0];
// elem.height += delta[1];
// console.log(delta);
// console.log(elem);

// //context.drawImage(canvasData, delta[0], delta[1]);
// context.putImageData(canvasData, delta[0], delta[1]);

// boundsFlaf=false;
// 				}
// 			}	
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