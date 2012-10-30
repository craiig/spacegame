
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = planet;

function planet() {
	this.cells = new Array();
	this.overallAbundance = new Array();
	this.populationDensity=0;
	this.researchValue=0;
	this.warehousing=new Array();
	this.manufacturingValue=0;
	this.manufacturingQueue = new Object();
	this.orbitals = new Array();
}

planet.prototype.getSyncProps = function(obj){
	return ['bounds'];
}

//add gameObject to current physicalArea
planet.prototype.addObject = function(obj){
    x = this.allObjects.push(obj); //add object to all object list
    if (obj.isGrav == true) this.gravitatingObjects.push(x); //add reference to object
	if (obj.isRad == true) this.radiatingObjects.push(x); //add reference to object
	if (obj.isPlayerShip == true) this.playerShips.push(x); //add reference to object
}
