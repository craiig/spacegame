
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = shipGroup;

function shipGroup(activity) {
    this.ships = new Array(); //all objects in a level / physicalArea
	this.activity = activity;
	this.orbit = activity.defaultOrbit;
}

shipGroup.prototype.getSyncProps = function(obj){
	return ['bounds'];
}
