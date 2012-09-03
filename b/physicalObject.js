//object expressing basic physical physicalObject functions as will be called from area.js

var spaceMath = require('./spaceMath.js');

exports = module.exports = physicalObject;

function physicalObject() {
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

	//some sort of model attachment for the clients & renderer
	//this.model = Array();

	//special handling for special states
	//ie. on fire
	//this.state = '';
};


//apply specific impulse to object
physicalObject.prototype.applyImpulse = function(vecImpulse){
	//assumed that forces are expressed in Newtons
	console.log('heading:' + this.heading);
	q = [this.heading[0] * this.mass, this.heading[1]];
	rr = new spaceMath();
	q = rr.vectorAdd(q,vecImpulse);
	q[0] = q[0] / this.mass;
	this.heading = q;
};

physicalObject.prototype.updateRad = function(inPower){
	this.power = inPower;
};

physicalObject.prototype.getSyncProps = function(){
	return ['coords', 'heading','mass','model','state'];
};

//calculate this objects 'Gravitational' input from a point in space
physicalObject.prototype.calcGrav = function(coords){
	//find diff in positions
	xDiff = this.coords.x - coords.x;
	yDiff = this.coords.y - coords.y;
	
	//find radius of vector of difference
	r = Math.sqrt(Math.pow(xDiff,2) + Math.pow(xdiff,2));
	
	//calc linear degrading gravity based on r
	//in 'Newtons'
	g = sm.grav * this.mass / r;
	
	//calc vector direction
	th = atan2(yDiff,xDiff);
	return [g,th];
}

//calculate this objects 'Radiation' input to a point in space
physicalObject.prototype.calcRad = function(coords){
	//find diff in positions
	xDiff = this.coords.x - coords.x;
	yDiff = this.coords.y - coords.y;
	
	//find radius of vector of difference
	r = Math.sqrt(Math.pow(xDiff,2) + Math.pow(xdiff,2));
	p = this.power / r;
	
	return p;
}