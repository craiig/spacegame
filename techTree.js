
//basic physicalArea model
exports = module.exports = techTree;

techTree.techType = {
Housing:{
	Density:0,
	Quality:0,
	Type:{
		SkyScraper:0,
		Dome:0,
		Subterranean:0,
		Undersea:0
	}
},
SpaceStation:{
	Quality:0,
	Efficiency:0
},
SpaceHabitat:{
	Quality:0,
	Efficiency:0,
	Length:0,
	Width:0
},
Warehouse:{
	Efficiency:0
},
Manufacturing:{
	Efficiency:0
},
University:{
	Efficiency:0
},
Wonder:{
	Type:{
		Colossus:0,
		Library:0,
		Waterslides:0
	}

},
Ship:{
	Drive:{
		Type:{
			Docking:0,
			Stellar:0,
			InterStellar:0,
			Galactic:0
		}
	},
	Weapons:{
		Type:{
			Beam:0,
			Missile:0	
		}
	},
	EnergySource:0,
	Shields:0
}


};


function techTree(civ) {
    this.civ = civ;
}
