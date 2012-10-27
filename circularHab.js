
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = circularHab;

function circularHab(world) {
    this.allObjects = new Array(); //all objects in a level / physicalArea
	this.gravitatingObjects =  new Array(); //just index into allObjects
	this.radiatingObjects = new Array(); //just index into allObjects
    this.bounds = new Array(); // top left to bottom righ
    this.playerShips = new Array();
    this.world = world;
}

circularHab.prototype.getSyncProps = function(obj){
	return ['bounds'];
}

//add gameObject to current physicalArea
circularHab.prototype.addObject = function(obj){
    x = this.allObjects.push(obj); //add object to all object list
    if (obj.isGrav == true) this.gravitatingObjects.push(x); //add reference to object
	if (obj.isRad == true) this.radiatingObjects.push(x); //add reference to object
	if (obj.isPlayerShip == true) this.playerShips.push(x); //add reference to object
}
