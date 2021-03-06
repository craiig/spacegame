
//terrain & building cells as used on planets, stations, habs etc.
exports = module.exports = terrainCell;


terrainCell.prototype.cellType = {
	EmpireCapital:0,
	AreaCapital:1,
	Mine:2,
	Manufacturing:3,
	Housing:4,
	Wonder:5,
	Warehouse:6,
	University:7,
	EnergyPlant:8,
	Terraformer:9,
	Dock:10,
	Natural:11,
	Wasteland:12,
	MilitaryBase:13,
	TrainingAcademy:14
}; 

function terrainCell(newAbundance,newCellType) {
    this.elementalAbundance = new Array(); 
    this.cellType=cellType;
}

terrainCell.prototype.abundance = {
	H:{name:'Hydrogen',abundance:0},
	He:{name:'Helium',abundance:0},
	Li:{name:'Lithium',abundance:0},
	Be:{name:'Beryllium',abundance:0},
	B:{name:'Boron',abundance:0},
	C:{name:'Carbon',abundance:0},
	N:{name:'Nitrogen',abundance:0},
	O:{name:'Oxygen',abundance:0},
	F:{name:'Fluorine',abundance:0},
	Ne:{name:'Neon',abundance:0},
	Na:{name:'Sodium',abundance:0},
	Mg:{name:'Magnesium',abundance:0},
	Al:{name:'Aluminium',abundance:0},
	Si:{name:'Silicon',abundance:0},
	P:{name:'Phosphorus',abundance:0},
	S:{name:'Sulfur',abundance:0},
	Cl:{name:'Chlorine',abundance:0},
	Ar:{name:'Argon',abundance:0},
	K:{name:'Potassium',abundance:0},
	Ca:{name:'Calcium',abundance:0},
	Sc:{name:'Scandium',abundance:0},
	Ti:{name:'Titanium',abundance:0},
	V:{name:'Vanadium',abundance:0},
	Cr:{name:'Chromium',abundance:0},
	Mn:{name:'Manganese',abundance:0},
	Fe:{name:'Iron',abundance:0},
	Co:{name:'Cobalt',abundance:0},
	Ni:{name:'Nickel',abundance:0},
	Cu:{name:'Copper',abundance:0},
	Zn:{name:'Zinc',abundance:0},
	Ga:{name:'Gallium',abundance:0},
	Ge:{name:'Germanium',abundance:0},
	As:{name:'Arsenic',abundance:0},
	Se:{name:'Selenium',abundance:0},
	Br:{name:'Bromine',abundance:0},
	Kr:{name:'Krypton',abundance:0},
	Rb:{name:'Rubidium',abundance:0},
	Sr:{name:'Strontium',abundance:0},
	Y:{name:'Yttrium',abundance:0},
	Zr:{name:'Zirconium',abundance:0},
	Nb:{name:'Niobium',abundance:0},
	Mo:{name:'Molybdenum',abundance:0},
	Tc:{name:'Technetium',abundance:0},
	Ru:{name:'Ruthenium',abundance:0},
	Rh:{name:'Rhodium',abundance:0},
	Pd:{name:'Palladium',abundance:0},
	Ag:{name:'Silver',abundance:0},
	Cd:{name:'Cadmium',abundance:0},
	In:{name:'Indium',abundance:0},
	Sn:{name:'Tin',abundance:0},
	Sb:{name:'Antimony',abundance:0},
	Te:{name:'Tellurium',abundance:0},
	I:{name:'Iodine',abundance:0},
	Xe:{name:'Xenon',abundance:0},
	Cs:{name:'Caesium',abundance:0},
	Ba:{name:'Barium',abundance:0},
	La:{name:'Lanthanum',abundance:0},
	Ce:{name:'Cerium',abundance:0},
	Pr:{name:'Praseodymium',abundance:0},
	Nd:{name:'Neodymium',abundance:0},
	Pm:{name:'Promethium',abundance:0},
	Sm:{name:'Samarium',abundance:0},
	Eu:{name:'Europium',abundance:0},
	Gd:{name:'Gadolinium',abundance:0},
	Tb:{name:'Terbium',abundance:0},
	Dy:{name:'Dysprosium',abundance:0},
	Ho:{name:'Holmium',abundance:0},
	Er:{name:'Erbium',abundance:0},
	Tm:{name:'Thulium',abundance:0},
	Yb:{name:'Ytterbium',abundance:0},
	Lu:{name:'Lutetium',abundance:0},
	Hf:{name:'Hafnium',abundance:0},
	Ta:{name:'Tantalum',abundance:0},
	W:{name:'Tungsten',abundance:0},
	Re:{name:'Rhenium',abundance:0},
	Os:{name:'Osmium',abundance:0},
	Ir:{name:'Iridium',abundance:0},
	Pt:{name:'Platinum',abundance:0},
	Au:{name:'Gold',abundance:0},
	Hg:{name:'Mercury',abundance:0},
	Tl:{name:'Thallium',abundance:0},
	Pb:{name:'Lead',abundance:0},
	Bi:{name:'Bismuth',abundance:0},
	Po:{name:'Polonium',abundance:0},
	At:{name:'Astatine',abundance:0},
	Rn:{name:'Radon',abundance:0},
	Fr:{name:'Francium',abundance:0},
	Ra:{name:'Radium',abundance:0},
	Ac:{name:'Actinium',abundance:0},
	Th:{name:'Thorium',abundance:0},
	Pa:{name:'Protactinium',abundance:0},
	U:{name:'Uranium',abundance:0},
	Np:{name:'Neptunium',abundance:0},
	Pu:{name:'Plutonium',abundance:0},
	Am:{name:'Americium',abundance:0},
	Cm:{name:'Curium',abundance:0},
	Bk:{name:'Berkelium',abundance:0},
	Cf:{name:'Californium',abundance:0},
	Es:{name:'Einsteinium',abundance:0},
	Fm:{name:'Fermium',abundance:0},
	Md:{name:'Mendelevium',abundance:0},
	No:{name:'Nobelium',abundance:0},
	Lr:{name:'Lawrencium',abundance:0},
	Rf:{name:'Rutherfordium',abundance:0},
	Db:{name:'Dubnium',abundance:0},
	Sg:{name:'Seaborgium',abundance:0},
	Bh:{name:'Bohrium',abundance:0},
	Hs:{name:'Hassium',abundance:0},
	Mt:{name:'Meitnerium',abundance:0},
	Ds:{name:'Darmstadtium',abundance:0},
	Rg:{name:'Roentgenium',abundance:0},
	Cn:{name:'Copernicium',abundance:0},
	Uut:{name:'Ununtrium',abundance:0},
	Fl:{name:'Flerovium',abundance:0},
	Uup:{name:'Ununpentium',abundance:0},
	Lv:{name:'Livermorium',abundance:0},
	Uus:{name:'Ununseptium',abundance:0},
	Uuo:{name:'Ununoctium',abundance:0}
};

