
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = starbase;

function starbase(civ,orbit) {
    this.cells = new Array(); //all objects in a level / physicalArea
    this.civ = civ;
	this.orbit=orbit;
}

physicalArea.prototype.getSyncProps = function(obj){
	return ['bounds'];
}
