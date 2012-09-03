
//basic area model
var SpaceMath = require('./spaceMath.js');
var GameObject = require('./gameObject.js');
var PlayerShip = require('./playerShip.js');

exports = module.exports = area;

function area() {
    this.allObjects = new Array(); //all objects in a level / area
	this.gravitatingObjects =  new Array(); //just index into allObjects
	this.radiatingObjects = new Array(); //just index into allObjects
    this.bounds = [[-1,1],[1,-1]]; // top left to bottom righ
    this.playerShips = new Array();
}

//add gameObject to current area
area.prototype.addObject = function(obj){
    x = this.allObjects.push(obj); //add object to all object list
    if (obj.isGrav == true) this.gravitatingObjects.push(x); //add reference to object
	if (obj.isRad == true) this.radiatingObjects.push(x); //add reference to object
}

//remove gameObject from current area
area.prototype.removeObject = function(obj){
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
area.prototype.calcGrav = function(coords) {
	//calc the grav contributions from all the objects in the solar system
	var vec = [0,0];
	for (grav in this.gravitatingObjects) {
		vec = sm.vectorAdd(vec,allObjects[grav].calcGrav(coords)); // need to vector add this as it has direction and magnitude
	}
	return vec;
}

//calc sum of all radiation at a point
area.prototype.calcRad = function(coords) {
	//this does not take into account occlusion so we should fix it eventually
	//radiation does not have direction, only magnitude (lol)
	var power = 0;
	for (rad in this.radiatingObjects) {
		power += allObjects[rad].calcRad(coords);
	}
	return power;
}

//update the slow-changing properties of a scene like the effect of gravity from other planets etc
area.prototype.updateSlow = function(amountOfTime) {
	//update all the slow things
	//ie calc grav updates to all objects in system
	for (o in this.allObjects) {
		o.applyImpulse(this.calcGrav(o.coords));
		o.updateRad(this.calcRad(coords));
	}
}

