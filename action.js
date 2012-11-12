
exports = module.exports = action;

action.prototype.actionType = {
    createShipGroup:{groupType:Object,func:function(obj){ civ.shipGroups.push(new shipGroup(groupType));}}
    ,destroyShipGroup:{group:Object,func:function(obj){ civ.shipGroups.split(civ.shipGroups.indexOf(group) );}}
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

function action(actionTypeName) {
	this.params = this.actionType[actionTypeName];
}

action.prototype.doTick = function(obj){
	this.params.func(obj);
}
