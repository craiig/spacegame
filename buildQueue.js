
//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = buildQueue;

buildQueue.prototype.buildQueueItem = {
    id:0,
    priority:0,
    materialRequirements:{},
    outputCount:0,
    processingUnits:0,
    itemType:''
};


function buildQueue() {
    this.queue = new Array();
}

buildQueue.prototype.addBuild = function(newBuildQueueItem){
    this.currentId+=1;
    newBuildQueueItem.id = this.currentId;
    this.queue.push(newBuildQueueItem);
}



buildQueue.prototype.doTick = function(planet,warehouse){
    remainingUnits = planet.availableUnits;
    
    if (this.queue.count>0) {
        doProcessing=1; 
    } else {
        doProcessing=0; 
    }
        
    currentId=0;

    //loop through build queue while still remaining processing units
    //check each item as to whether there is the required materials in the warehouse
    //subtract as many units as possible from the build queue item
    //if item is complete:
        //if item is a ship or hab, move to orbit
        //otherwise move to warehouse
        //split item from queue
    while (doProcessing==1){
        if (remainingUnits>this.queue[currentId].processingUnits){
            if (warehouse.checkItems(this.queue[currentId].materialRequirements)==true) {
                remainingUnits-=this.queue[currentId].processingUnits;
                this.queue[currentId].processingUnits=0;
                warehouse[this.queue[currentId].itemType]+=1;
                warehouse.removeItems(this.queue[currentId].materialRequirements);
                //remove item from queue
            }
        } else {
            this.queue[currentId].processingUnits-=remainingUnits;
            remainingUnits=0;
        }
        if ((remainingUnits==0) || (this.queue.count >0)) {
            doProcessing=0;
        }
    }





    return ['bounds'];
}
