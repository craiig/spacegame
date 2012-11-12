
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = civilisation;

civilisation.prototype.civType = {
	Hostile:0,
	Unknown:1,
	Neutral:2,
	TradePartner:3,
	MilitaryAlly:4
};

function civilisation(planet) {
	this.planets = new Array();
	this.planets.push(planet);
	this.capital = planet;
	this.government = 0 ;
	this.populationGrowthRate=0;
	this.currentResearchEfficiencyPerJoule = 0;
	this.currentManufacturingEfficiencyPerJoule = 0;
	this.currentMiningEfficiencyPerElementPerJoule = new Array();
	this.totalEnergy=0;
	this.totalResearch=0;
	
	this.neighbours = new Array();
	this.activities = new Array();
	//neighbour = {civtype,closestRange,knownPlanetsAndObjects,associatedThreatGroups}
	this.allElementsInAllWarehouses = new Array();
	this.costElementPerJoule = new Array();
	this.desireForElementInAllBuildQueuesTimesPriority = new Array();   
}


civilisation.prototype.addPlanet = function(planet){
}

civilisation.prototype.doTick = function(){

	//we will run planets at a higher update speed than the civilisations
	//they will update the slower civilisation objects
	
	
	
	//base unit is Joule*Seconds against the unitless Happiness value
	
	//calculate the happiness function components + expected happiness from ongoing activities and actions
		//for each activity in queue
			//x=estCost>currCost:estCost,currCost;
			//(riskDont + estGain - x) / riskDo
	
	
	//select top expected happiness actions from new actions proposed vs random sample of ongoing actions+cost of cancel & select best
	
	
}
