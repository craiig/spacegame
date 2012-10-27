
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = civilisation;

civilisation.prototype.civType = {
	Hostile:0,
	Unknown:1,
	TradePartner:2,
	MilitaryAlly:3
};

function civilisation(planet) {
	this.planets = new Array();
	this.planets.add(planet);
	this.capital = planet;
	this.government = 0 ;
	this.populationGrowthRate=0;
	this.currentResearchEfficiencyPerJoule = 0;
	this.currentManufacturingEfficiencyPerJoule = 0;
	this.currentMiningEfficiencyPerElementPerJoule = new Array();
	this.totalEnergy=0;
	this.totalResearch=0;
	
	this.neighbours = new Array();
	//neighbour = {civtype,closestRange,knownPlanetsAndObjects,associatedThreatGroups}
	this.allElementsInAllWarehouses = new Array();
	this.costElementPerJoule = new Array();
	this.desireForElementInAllBuildQueuesTimesPriority = new Array();   
}


//add gameObject to current physicalArea
civilisation.prototype.addObject = function(obj){
    x = this.allObjects.push(obj); //add object to all object list
    if (obj.isGrav == true) this.gravitatingObjects.push(x); //add reference to object
	if (obj.isRad == true) this.radiatingObjects.push(x); //add reference to object
	if (obj.isPlayerShip == true) this.playerShips.push(x); //add reference to object
}
