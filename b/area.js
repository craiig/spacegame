
//basic physicalArea model
var spaceMath = require('./spaceMath.js');
var physicalObject = require('./physicalObject.js');
var PlayerShip = require('./playerShip.js');

exports = module.exports = physicalArea;

function physicalArea() {
    this.allObjects = new Array(); //all objects in a level / physicalArea
	this.gravitatingObjects =  new Array(); //just index into allObjects
	this.radiatingObjects = new Array(); //just index into allObjects
    this.bounds = new Array(); // top left to bottom righ
    this.playerShips = new Array();
}

physicalArea.prototype.getSyncProps = function(obj){
	return ['bounds'];
}

//add gameObject to current physicalArea
physicalArea.prototype.addObject = function(obj){
    x = this.allObjects.push(obj); //add object to all object list
    if (obj.isGrav == true) this.gravitatingObjects.push(x); //add reference to object
	if (obj.isRad == true) this.radiatingObjects.push(x); //add reference to object
	if (obj.isPlayerShip == true) this.playerShips.push(x); //add reference to object
}

//remove gameObject from current physicalArea
physicalArea.prototype.removeObject = function(obj){
	x = this.allObjects.indexOf(obj); //get index of object to remove
	if (obj.isGrav == true){
		y = this.gravitatingObjects.indexOf(x); //find the reference in the grav array
		this.gravitatingObjects.splice(y,1); //remove the reference.
	}
	if (obj.isRad == true){
		y = this.radiatingObjects.indexOf(x);
		this.radiatingObjects.splice(y,1);		
	}
	this.allObjects.splice(x,1); // remove object from array
}

//calc sum of all gravities at a point
physicalArea.prototype.calcGrav = function(coords) {
	//calc the grav contributions from all the objects in the solar system
	var vec = [0,0];
	for (grav in this.gravitatingObjects) {
		var q =this.allObjects[grav].calcGrav(coords);
		console.log('obj grav add');
		console.log(q);
		console.log('prevec');
		console.log(vec);
		vec = spaceMath.vectorAdd(vec,this.allObjects[grav].calcGrav(coords)); // need to vector add this as it has direction and magnitude
		console.log('postvec');
		console.log(vec);
	}
	return vec;
}

//calc sum of all radiation at a point
physicalArea.prototype.calcRad = function(coords) {
	//this does not take into account occlusion so we should fix it eventually
	//radiation does not have direction, only magnitude (lol)
	var power = 0;
	for (rad in this.radiatingObjects) {
		power += this.allObjects[rad].calcRad(coords);
	}
	return power;
}

//update the slow-changing properties of a scene like the effect of gravity from other planets etc
physicalArea.prototype.updateSlow = function(amountOfTime) {
	//update all the slow things
	//ie calc grav updates to all objects in system
	console.log('allo:'+this.allObjects.length);
	for (i=0;i<this.allObjects.length;i++) {
		o=this.allObjects[i];
		//o.prototype = physicalObject.prototype;
		console.log('Gravity');
		o.applyImpulse(this.calcGrav(o.coords));
		console.log('Radiation');
		o.updateRad(this.calcRad(o.coords));
	}
}

