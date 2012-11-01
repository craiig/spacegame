
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = action;

action.prototype.actionType = {
    createShipGroup:{groupType:Object}
    ,destroyShipGroup:{group:Object}
    ,createBuilding:{cell:Object,buildingType:Number}
    ,destroyBuilding:{cell:Object}
    ,createShip:{shipType:Number}
    ,destroyShip:{ship:Object}
    ,moveShip:{ship:Object,to:Object}
    ,moveGroup:{group:Object,to:Object}
    ,trade:{from:Object,to:Object,haggle:Boolean,cargo:Object}
	,doResearch:{researchTopic:Object}
	,declareWar:{civ:Object}
	,proposeTreaty:{civ:Object,terms:Object}
	,acceptTreaty:{civ:Object}
	,rejectTreaty:{civ:Object}
	,attack:{attackType:Object}
}

function action(world) {

}

action.prototype.addObject = function(obj){

}
