
//basic physicalArea model
exports = module.exports = techTree;

techTree.techState = {
	Housing:{
		inputs:{
			joules:0,
			population:0,
			requiredElements:{}
		},
		outputs:{
			population:0
		},
		density:0,
		luxury:0,
		type:{
			SkyScraper:0,
			Dome:0,
			Subterranean:0,
			Undersea:0,
			FloatingCity:0
		}
	},
	SpaceStation:{
		inputs:{
			joules:0,
			requiredElements:{}
		},


		Quality:0,
		Efficiency:0,
		maxCells:0
	},
	Orbital:{
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
			Size:0,
			EnergyRequired:0,

			Type:{
				Docking:0,
				Stellar:0,
				InterStellar:0,
				Galactic:0,
				InterGalactic:0
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
