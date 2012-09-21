//object expressing basic physical physicalObject functions as will be called from area.js

var spaceMath = require('./spaceMath.js');
//var world = require('./gameServer.js');	

exports = module.exports = physicalObject;

function physicalObject(world) {
	this.name = '';

	//in 2d bounds of area
    this.coords = [0,0]; //x,y coords

    //considered to be in m/s and radians 
	this.heading = [0,0]; //r,theta - contains direction and velocity
	this.mass = 0; //mass for calculating momentum in kg
	
	this.power = 0; //power of radiation in Watts

	//flags for special scene handling
	this.isRad = false;
	this.isGrav = false;


	world.netchan.registerObject(this);

	//some sort of model attachment for the clients & renderer
	//this.model = Array();

	//special handling for special states
	//ie. on fire
	//this.state = '';
};


//apply specific impulse to object
physicalObject.prototype.applyImpulse = function(vecImpulse){
	//assumed that forces are expressed in Newtons
	q = [this.heading[0] * this.mass, this.heading[1]];
	q = spaceMath.vectorAdd(q,vecImpulse);
	q[0] = q[0] / this.mass;
	this.heading = q;
};

physicalObject.prototype.updateRad = function(inPower){
	this.power = inPower;
};


physicalObject.prototype.applyHeading = function(amountOfTime){
	//update coords with heading
	x1 = this.heading[0] * Math.cos(this.heading[1]) * amountOfTime;
	y1 = this.heading[0] * Math.sin(this.heading[1]) * amountOfTime; 
	this.coords[0] += x1;
	this.coords[1] += y1; 
};


physicalObject.prototype.getSyncProps = function(){
	return ['coords', 'heading','mass','model','state'];
};

//calculate this objects 'Gravitational' input from a point in space
physicalObject.prototype.calcGrav = function(coords){

	if (coords !== this.coords) {
		//find diff in positions
		xDiff = this.coords[0] - coords[0];
		yDiff = this.coords[1] - coords[1];
	
		//find radius of vector of difference
		r = Math.sqrt(Math.pow(Math.abs(xDiff),2) + Math.pow(Math.abs(yDiff),2));
		
		//calc linear degrading gravity based on r
		//in 'Newtons'
		g = spaceMath.grav * this.mass / (r*r);
		
		//calc vector direction
		th = Math.atan2(yDiff,xDiff);
		return [g,th];
	} else {
		return [0,0];
	}

}

//calculate this objects 'Radiation' input to a point in space
physicalObject.prototype.calcRad = function(coords){
	//find diff in positions
	if (coords !== this.coords) {
		xDiff = this.coords[0] - coords[0];
		yDiff = this.coords[1] - coords[1];
		
		//find radius of vector of difference
		r = Math.sqrt(Math.pow(Math.abs(xDiff),2) + Math.pow(Math.abs(yDiff),2));
		p = this.power / r;
		
		return p;
	} else {
		return 0;
	}
}