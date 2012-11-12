
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = planet;

function planet(size) {
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

planet.prototype.doTick = function(){
	//reset manufacturing value etc
   //walk through cells and cells of orbitals calling doTick (which update planet)
   //doTick on manufacturing queue
   
}
