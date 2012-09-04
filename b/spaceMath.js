


//store our vectors in polar form
/* vector = [
	r, //	radial component
	th  // theta component
]; */

//gravitational constant of world
//in our 2d world this is in units of m^2 kg^-1 s^-2
grav = 6.67384e-11;

function spaceMath (){
	this.name='spaceMath';
};

function vectorAdd (vec1,vec2){
	//convert polar vectors to rectangular form
	//console.log('Vector Add');
	//console.log(vec1,vec2);
	x1 = vec1[0] * Math.cos(vec1[1]);
	x2 = vec2[0] * Math.cos(vec2[1]);
	y1 = vec1[0] * Math.sin(vec1[1]);
	y2 = vec2[0] * Math.sin(vec2[1]);
	//console.log(x1,x2,y1.y2);
	//add our vectors in rectangular form
	x1 += x2;
	y1 += y2;
	//convert rectangular vector to polar form
	v = [Math.sqrt( Math.pow(x1,2) + Math.pow(y1,2) ),Math.atan2(y1,x1) ];
	//console.log(v);
	return v;
};

exports = module.exports = spaceMath;
module.exports.grav = grav;
module.exports.vectorAdd = vectorAdd;