
exports = module.exports = tradeQueue;

function tradeQueue() {
    this.tradeObjects = new Array(); 
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
		haggle:{ask:0,min:0}
	};			
    this.tradeObjects.add(x);
}

tradeQueue.prototype.doTick = function() {
	for(to in this.tradeObjects) {
		switch (tradeObjects[to].tradestatus) {
			case this.tradeStatus.unconfirmed:{}
				break;
			case this.tradeStatus.confirmed:{},
				break;
			case this.tradeStatus.termsAgreed:{},
				break;
			case this.tradeStatus.shipsAllocated:{},
				break;
			case this.tradeStatus.shipsAtSource:{},
				break;
			case this.tradeStatus.cargoLoaded:{},
				break;
			case this.tradeStatus.shipsInTransit:{},
				break;
			case this.tradeStatus.shipsAtDestination:{},
				break;
			case this.tradeStatus.cargoUnLoaded:{},
				break;
			case this.tradeStatus.paymentReceived:{}
				break;
		}
	}
}
