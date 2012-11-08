
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');
//var physicalObject = require('./physicalObject.js');
//var PlayerShip = require('./playerShip.js');

exports = module.exports = tradeQueue;

function tradeQueue(civ) {
    this.tradeObjects = new Array(); 
    this.civ = civ;
}

tradeQueue.prototype.tradeStatus = {
	unconfirmed:0,
	confirmed:1,
	termsAgreed:2,
	shipsAllocated:3,
	shipsAtSource:4,
	cargoLoaded:5,
	shipsInTransit:6,
	shipsAtDestination:7,
	cargoUnLoaded:8,
	paymentReceived:9
}


tradeQueue.prototype.addTradeMission = function(newSource,newDest,newCargo) {
	var x = {
		source:newSource,
		dest:newDest,
		cargo:newCargo,
		haggle:false,

	};
			
    this.tradeObjects.add(x);

}

tradeQueue.prototype.doTick = function(newSource,newDest,newCargo) {
	var x = {
		source:newSource,
		dest:newDest,
		cargo:newCargo
		};
			
    this.tradeObjects.add(x);

}
