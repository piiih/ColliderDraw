class Rectangle extends Polygon
{
	constructor(printer) {
		super(printer, [new Point(), new Point(), new Point(), new Point()]);
	}

	setInicialPoint(point) {
		var self = this;
		self.points[0] = point;
	}

	setDefiningPoints(point) {
		this.points[1].setX(point.x);
		this.points[1].setY(this.points[0].y);

		this.points[2] = point;

		this.points[3].setX(this.points[0].x);
		this.points[3].setY(point.y);
	}

	print(reset){
		var self = this;
		self.printer.printPolygon(this, reset, 'stroke');
	}



}