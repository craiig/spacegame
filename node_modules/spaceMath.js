
exports = module.exports = spaceMath;

//store our vectors in polar form
vector = {
	r = 0; //	radial component
	th = 0; // theta component
};

//gravitational constant of world
//in our 2d world this is in units of m^2 kg^-1 s^-2
grav = 6.67384e-11;

area.prototype.vectorAdd = function(vec1,vec2){
	//convert polar vectors to rectangular form
	x1 = vec1.r * Math.Cos(vec1.th);
	x2 = vec2.r * Math.Cos(vec2.th);
	y1 = vec1.r * Math.Sin(vec1.th);
	y2 = vec2.r * Math.Sin(vec2.th);
	//add our vectors in rectangular form
	x1 += x2;
	y1 += y2;
	//convert rectangular vector to polar form
	vector v = {Math.sqrt( pow(x1,2) + pow(y1,2) ),Math.atan2(y1,x1) };
	return v;
}