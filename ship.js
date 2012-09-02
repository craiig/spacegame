exports = module.exports = Ship;

function Ship(world){
	this.x = 0;
	this.y = 0;
	this.world = world;

	world.netchan.registerObject(this);
}

World.prototype.getSyncProps = function(){
	return ['x', 'y'];
}