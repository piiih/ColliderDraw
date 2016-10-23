class Rectangle extends Polygon
{
	constructor(printer) {
		super(printer, [new Point(), new Point(), new Point(), new Point()]);
    this.Y = printer.getCanvas().width;
    this.height = 0;
    this.X = 0;
	}

  getY(){ 
    var self = this;
    var points = this.getPoints();
    points.forEach(function(item, key){
      if(item.y < self.Y){
        self.Y = item.y; 
      }
    })
    return self.Y;
  }

  getHeight(){
    var self = this;
    var points = this.getPoints();
    points.forEach(function(item, key){
      if(item.y > self.height){
        self.height = item.y; 
      }
    })
    return self.height;
  }

  getX(){
    var points = this.getPoints();
    this.X = points[0].x;
    return this.X; 
  }

  getWidth(){
    var points = this.getPoints();
    this.width = this.getX() + (points[3].y - points[0].y);
    return this.width;
  }

  searchInsidePoint(point){ 
    console.log('Y do ponto'+point.y)
    console.log('Y do retangulo'+this.getY())
    console.log('Altura retangulo'+this.getHeight())
    if(point.y > this.getY() && point.y < this.getHeight()){
        return point
    }
    return null
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
