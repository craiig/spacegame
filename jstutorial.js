
///// #1 is equivalent to #2
// #1
function Apple(){
	this.color = "green",
	this.num = 3;
}

Apple.prototype.eat = function(){
	this.num = this.num - 1
}

var Apples = new Apple();
var Apples2 = new Apple();

///// #2
var Apples = {
		color: "green",
		num: 3,
		eat : function(){
			this.num = this.num - 1;
		}
}

var Apples2 = {
		color: "green",
		num: 3,
		eat : function(){
			this.num = this.num - 1;
		}
}


//what happens?
Apples.eat() //apples.num = 2

var elephant = {num : 4};
elephant.eat = Apple.eat
elephant.eat()

//apples.num == 2, elephant.num == 3
