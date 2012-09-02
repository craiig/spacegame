
//basic area model

exports = module.exports = area;

function area() {
    this.allObjects = new Array(); //all objects in a level / area
	this.gravitatingObjects =  new Array(); //just index into allObjects
	this.radiatingObjects = new Array(); //just index into allObjects
    this.bounds = {{-1,1},{1,-1}}; // top left to bottom righ
}


area.prototype.addObject = function(obj){
    x = this.allObjects.push(obj); //add object to all object list
    if (obj.isGrav == true) this.gravitatingObjects.push(x); //add reference to object
	if (obj.isRad == true) this.radiatingObjects.push(x); //add reference to object
}

area.prototype.removeObject = function(obj){
	x = this.allObjects.indexOf(obj); //get index of object to remove
	if (obj.isGrav == true){
		y = this.gravitatingObjects.indexOf(x); //find the reference in the grav array
		this.gravitatingObjects.splice(y,1); //remove the reference.
	}
	if (obj.isRad == true){
		y = this.radiatingObjects.indexOf(x);
		this.radiatingObjects.splice(y,1);		
	}
	this.allObjects.splice(x,1); // remove object from array
}

area.prototype.calcGrav = function(coords) {
	//calc the grav contributions from all the objects in the solar system
	var vec = {0,0};
	for (grav in this.gravitatingObjects) {
		vec = vectorAdd(vec,grav.calcGrav(coords)); // need to vector add this as it has direction and magnitude
	}
	return vec;
}


area.prototype.calcRad = function(coords) {
	//this does not take into account occlusion so we should fix it eventually
	//radiation does not have direction, only magnitude (lol)
	var power = 0;
	for (rad in this.radiatingObjects) {
		power += rad.calcRad(coords);
	}
	return power;
}

area.prototype.updateSlow = function(amountOfTime) {
	//update all the slow things
	//ie calc grav updates to all objects in system
	for (o in this.allObjects) {
		o.updateHeading(this.calcGrav(o.coords));
		o.updateRad(this.calcRad(coords));
	}
}

