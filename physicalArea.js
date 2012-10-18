
//basic physicalArea model
var spaceMath = require('./spaceMath.js');
var physicalObject = require('./physicalObject.js');
var PlayerShip = require('./playerShip.js');

exports = module.exports = physicalArea;

function physicalArea(world) {
    this.allObjects = new Array(); //all objects in a level / physicalArea
	this.gravitatingObjects =  new Array(); //just index into allObjects
	this.radiatingObjects = new Array(); //just index into allObjects
    this.bounds = new Array(); // top left to bottom righ
    this.playerShips = new Array();
    this.world = world;
}

physicalArea.prototype.getSyncProps = function(obj){
	return ['bounds'];
}

//add gameObject to current physicalArea
physicalArea.prototype.addObject = function(obj){
    x = this.allObjects.push(obj); //add object to all object list
    if (obj.isGrav == true) this.gravitatingObjects.push(x); //add reference to object
	if (obj.isRad == true) this.radiatingObjects.push(x); //add reference to object
	if (obj.isPlayerShip == true) this.playerShips.push(x); //add reference to object
}

//remove gameObject from current physicalArea
physicalArea.prototype.removeObject = function(obj){
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

//calc sum of all gravities at a point
physicalArea.prototype.calcGrav = function(obj) {
	//calc the grav contributions from all the objects in the solar system
	var vec = [0,0];
	for (grav in this.gravitatingObjects) {
		vec = spaceMath.vectorAdd(vec,this.allObjects[grav].calcGrav(obj)); // need to vector add this as it has direction and magnitude
	}
	return vec;
}

//calc sum of all radiation at a point
physicalArea.prototype.calcRad = function(coords) {
	//this does not take into account occlusion so we should fix it eventually
	//radiation does not have direction, only magnitude (lol)
	var power = 0;
	for (rad in this.radiatingObjects) {
		q = this.radiatingObjects[rad];
		power += this.allObjects[q].calcRad(coords);
	}
	return power;
}

//update the fast-changing properties of a scene like the movement due to heading
physicalArea.prototype.update = function(amountOfTime) {
	for (i=0;i<this.allObjects.length;i++) {
		o=this.allObjects[i];
		o.applyHeading(amountOfTime);
	}
}


//update the slow-changing properties of a scene like the effect of gravity from other planets etc
physicalArea.prototype.updateSlow = function(amountOfTime) {
	//update all the slow things
	//ie calc grav updates to all objects in system
	for (i=0;i<this.allObjects.length;i++) {
		o=this.allObjects[i];
		o.applyHeading(amountOfTime);
	}

	for (i in this.allObjects) {
		o=this.allObjects[i];
		var q = this.calcGrav(o);

		if ((o.collision==true)&&(o.coords!==undefined)&&(o.collider.coords!=undefined)) {
			//console.log('collision');

			//console.log(o.mass);
			//console.log(o.collider.mass);
			o.collision=false;
			if (o.mass > o.collider.mass) {
				console.log('collided');
console.log(o.collider.mass);
		
//				v1=o.heading;
				v2=o.collider.heading;
//				v1[0] *= o.mass;
				v2[0] *= o.collider.mass;

				if (v2[0]>o.mass) {
					console.log('subtracted!');
					var cm = v2[0]-o.mass;
					o.mass+=o.mass;
					o.collider.mass=cm;
} else {


 
//				vec1 = spaceMath.vectorAdd(
//					v1,
//					v2); // need to vector add this as it has direction and magnitude
//				o.collider.mass += o.mass;
	//			o.mass=0;
	//			o.collider.heading=vec1; 

//				o.mass-=o.collider.mass;
//				o.collider.mass+=o.collider.mass; 
//				if (o.mass<0) {
//					var q = Math.abs(o.mass);
//					o.mass=q;
//					o.collider.mass -= q;
//				} 

				//vec1[0] /= o.mass
				//o.heading = vec1;
//				o.heading[0]*=-(1);
//				o.collider.heading[0]*=-(2);
//				o.collider.heading = [0,0];
//				console.log(o.collider.mass);
//				var v = o.collider.heading;
//				v[0]*=v.mass;

				o.mass+=o.collider.mass;
				o.radius=(Math.pow( ((3*o.mass)/(4*Math.PI*1.408e3)),0.333)/1000000 );
				console.log(o.radius);
				o.collider.mass=0;
				o.collider.coords=undefined; //client looks for this for particle update	
//				this.removeObject(o.collider);
				//o.applyImpulse(v);
}			

				console.log(o.mass);				
				o.applyImpulse(q);
			}		
		} else {
			o.applyImpulse(q);		
		}
		//q = this.calcRad(o.coords);
		//o.updateRad(q);
	}

}

