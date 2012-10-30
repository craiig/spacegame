
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = starbase;

//orbit = {target:physicalObject,radius:kilometers,period:days}


function starbase(civ,orbit) {
    this.cells = new Array(); //cell spaces for building
    this.civ = civ;
	this.orbit=orbit;
}

// physicalArea.prototype.getSyncProps = function(obj){
	// return ['bounds'];
// }
