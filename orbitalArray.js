
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = orbitalArray;

function orbitalArray(civ) {
    this.civ = civ;
	}

orbitalArray.prototype.getSyncProps = function(obj){
	return ['bounds'];
}
