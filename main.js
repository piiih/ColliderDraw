var printer = new Printer('draw', 2);
var printer2 = new Printer('select', 1);

// var polygon = new Polygon(printer, [new Point(0,0), new Point(230,0), new Point(230,230), new Point(0,230)]);
var polygon = new Polygon(printer);
// console.log(polygon.getPoints());
// polygon.print();

var mouseDraw = new Mouse(printer.getCanvas());
var mouseSelect = new Mouse(printer2.getCanvas());

var rectangle = new Rectangle(printer2);

mouseSelect.onLeftDown(function(){
	rectangle.setInicialPoint(new Point(mouseSelect.getPosition().x, mouseSelect.getPosition().y));
});

mouseSelect.onLeftHold(function(){
	rectangle.setDefiningPoints(new Point(mouseSelect.getPosition().x, mouseSelect.getPosition().y));
	rectangle.print(true);
});

mouseSelect.onLeftUp(function(){
	
	printer2.resetCanvas();
});





mouseDraw.onLeftDown(function(event){
	polygon.addPoint(new Point(mouseDraw.getPosition().x,mouseDraw.getPosition().y));
	polygon.print(true);

	if(polygon.getPoints().length >= 4){
		printer2.getCanvas().style.zIndex = 10;
	}

	// printer.printInputsByPolygon(polygon);


});



