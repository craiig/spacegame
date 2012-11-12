//checkItemsInWarehouse




//basic physicalArea model
//var spaceMath = require('./spaceMath.js');

exports = module.exports = warehouse;



function warehouse() {}

warehouse.prototype.storage = {
	Sc:{name:'Scandium',amount:0},
	Ti:{name:'Titanium',amount:0},
	V:{name:'Vanadium',amount:0},
	Cr:{name:'Chromium',amount:0},
	Mn:{name:'Manganese',amount:0},
	Fe:{name:'Iron',amount:0},
	Co:{name:'Cobalt',amount:0},
	Ni:{name:'Nickel',amount:0},
	Cu:{name:'Copper',amount:0},
	Zn:{name:'Zinc',amount:0},
	Ga:{name:'Gallium',amount:0},
	Ge:{name:'Germanium',amount:0},
	As:{name:'Arsenic',amount:0},
	Se:{name:'Selenium',amount:0},
	Br:{name:'Bromine',amount:0},
	Kr:{name:'Krypton',amount:0},
	Rb:{name:'Rubidium',amount:0},
	Sr:{name:'Strontium',amount:0},
	Y:{name:'Yttrium',amount:0},
	Zr:{name:'Zirconium',amount:0},
	Nb:{name:'Niobium',amount:0},
	Mo:{name:'Molybdenum',amount:0},
	Tc:{name:'Technetium',amount:0},
	Ru:{name:'Ruthenium',amount:0},
	Rh:{name:'Rhodium',amount:0},
	Pd:{name:'Palladium',amount:0},
	Ag:{name:'Silver',amount:0},
	Cd:{name:'Cadmium',amount:0},
	In:{name:'Indium',amount:0},
	Sn:{name:'Tin',amount:0},
	Sb:{name:'Antimony',amount:0},
	Te:{name:'Tellurium',amount:0},
	I:{name:'Iodine',amount:0},
	Xe:{name:'Xenon',amount:0},
	Cs:{name:'Caesium',amount:0},
	Ba:{name:'Barium',amount:0},
	La:{name:'Lanthanum',amount:0},
	Ce:{name:'Cerium',amount:0},
	Pr:{name:'Praseodymium',amount:0},
	Nd:{name:'Neodymium',amount:0},
	Pm:{name:'Promethium',amount:0},
	Sm:{name:'Samarium',amount:0},
	Eu:{name:'Europium',amount:0},
	Gd:{name:'Gadolinium',amount:0},
	Tb:{name:'Terbium',amount:0},
	Dy:{name:'Dysprosium',amount:0},
	Ho:{name:'Holmium',amount:0},
	Er:{name:'Erbium',amount:0},
	Tm:{name:'Thulium',amount:0},
	Yb:{name:'Ytterbium',amount:0},
	Lu:{name:'Lutetium',amount:0},
	Hf:{name:'Hafnium',amount:0},
	Ta:{name:'Tantalum',amount:0},
	W:{name:'Tungsten',amount:0},
	Re:{name:'Rhenium',amount:0},
	Os:{name:'Osmium',amount:0},
	Ir:{name:'Iridium',amount:0},
	Pt:{name:'Platinum',amount:0},
	Au:{name:'Gold',amount:0},
	Hg:{name:'Mercury',amount:0},
	Tl:{name:'Thallium',amount:0},
	Pb:{name:'Lead',amount:0},
	Bi:{name:'Bismuth',amount:0},
	Po:{name:'Polonium',amount:0},
	At:{name:'Astatine',amount:0},
	Rn:{name:'Radon',amount:0},
	Fr:{name:'Francium',amount:0},
	Ra:{name:'Radium',amount:0},
	Ac:{name:'Actinium',amount:0},
	Th:{name:'Thorium',amount:0},
	Pa:{name:'Protactinium',amount:0},
	U:{name:'Uranium',amount:0},
	Np:{name:'Neptunium',amount:0},
	Pu:{name:'Plutonium',amount:0},
	Am:{name:'Americium',amount:0},
	Cm:{name:'Curium',amount:0},
	Bk:{name:'Berkelium',amount:0},
	Cf:{name:'Californium',amount:0},
	Es:{name:'Einsteinium',amount:0},
	Fm:{name:'Fermium',amount:0},
	Md:{name:'Mendelevium',amount:0},
	No:{name:'Nobelium',amount:0},
	Lr:{name:'Lawrencium',amount:0},
	Rf:{name:'Rutherfordium',amount:0},
	Db:{name:'Dubnium',amount:0},
	Sg:{name:'Seaborgium',amount:0},
	Bh:{name:'Bohrium',amount:0},
	Hs:{name:'Hassium',amount:0},
	Mt:{name:'Meitnerium',amount:0},
	Ds:{name:'Darmstadtium',amount:0},
	Rg:{name:'Roentgenium',amount:0},
	Cn:{name:'Copernicium',amount:0},
	Uut:{name:'Ununtrium',amount:0},
	Fl:{name:'Flerovium',amount:0},
	Uup:{name:'Ununpentium',amount:0},
	Lv:{name:'Livermorium',amount:0},
	Uus:{name:'Ununseptium',amount:0},
	Uuo:{name:'Ununoctium',amount:0}
};




warehouse.prototype.checkItems = function(itemList){
	isInWarehouse=true;


	for (item in itemList) {
		q = itemList[item];
		if (this.queue[item].amount < q.count) {
			isInWarehouse=false;
		}
	}

	return isInWarehouse;

}




warehouse.prototype.addItems = function(itemList){
	for (item in itemList) {
		q = itemList[item];
		this.queue[item].amount += q.count;
	}
}



//make sure you checkItems first
warehouse.prototype.removeItems = function(itemList){
	for (item in itemList) {
		q = itemList[item];
		this.queue[item].amount -= q.count;
	}
}
