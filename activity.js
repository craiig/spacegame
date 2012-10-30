
//basic physicalArea model
exports = module.exports = activity;

function activity(civ) {
    this.civ = civ;
	this.estimatedCost=0; //in J*s
	this.estimatedGain=0; //in units Civ Happiness
	this.estimatedRisk=0; //in units Civ Happiness
	this.currentCost=0;	
	this.isComplete=false;
	this.shipGroup = new Array(); //multiple shipgroups may be associated with an activity
	this.actions = new Array(); //serial set of atomic actions	
}

activity.prototype.doTick = function(){
//if complete flag=true, call remove activity on parent civ

	//if actions queue empty, mark complete
	//if current action incomplete, wait/pass
	//if current action complete, remove & start next action
	//maybe call generic completion status functions on actions themselves?

}
activity.prototype.addAction = function(action){
	this.actions.push(action);
}


