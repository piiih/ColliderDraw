import Point from "./Point"
class Polygon
{
	constructor(printer, points = []){
		this.points = points;
		this.printer = printer;
	}

	getPoints(){
		return this.points;
	}

	addPoint(point){
		this.points.push(point);
	}

	update(){
		var self = this;
		// var pointInputs = document.getElementsByClassName('point');
		// for(var i = 0; i< pointInputs.length; i++){
		// 	pointInputs[i].onchange = function(){
		// 		if(this.id.slice(-1) === 'x'){
		// 			self.points[this.id.replace('x','')].x = this.value;	
		// 		}
		// 		if(this.id.slice(-1) === 'y'){
		// 			self.points[this.id.replace('y','')].y = this.value;	
		// 		}
		// 	}
		// }
		// self.print();
	}

	print(reset){
		var self = this;
		self.printer.printPolygon(this, reset);
	}
}
module.exports = Polygon
