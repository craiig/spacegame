
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');
//var physicalObject = require('./physicalObject.js');
//var PlayerShip = require('./playerShip.js');

exports = module.exports = tradeQueue;

function tradeQueue(civ) {
    this.tradeObjects = new Array(); 
    this.civ = civ;
}

function addTradeMission(newSource,newDest,newCargo) {
	var x = {
		source:newSource,
		dest:newDest,
		cargo:newCargo
		};
			
    this.tradeObjects.add(x);

}
