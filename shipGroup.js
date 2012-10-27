
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = shipGroup;

function shipGroup(civ,activity) {
    this.ships = new Array(); //all objects in a level / physicalArea
	this.activity = activity;
	this.civ=civ;
}

shipGroup.prototype.getSyncProps = function(obj){
	return ['bounds'];
}
