var printers = [];
printers.push(new Printer('draw', 2));
printers.push(new Printer('select', 1));
console.log(printers);
// var polygon = new Polygon(printer, [new Point(0,0), new Point(230,0), new Point(230,230), new Point(0,230)]);
var polygon = new Polygon(printers[0]);
// console.log(polygon.getPoints());
// polygon.print();

var mouseDraw = new Mouse(printers[0].getCanvas());
var mouseSelect = new Mouse(printers[1].getCanvas());

var rectangle = new Rectangle(printers[1]);
var keyboard = new Keyboard(printers[0].getCanvas());

mouseSelect.onLeftDown(function(){
	rectangle.setInicialPoint(new Point(mouseSelect.getPosition().x, mouseSelect.getPosition().y));
});

mouseSelect.onLeftHold(function(){
	rectangle.setDefiningPoints(new Point(mouseSelect.getPosition().x, mouseSelect.getPosition().y));
	rectangle.print(true);
});

mouseSelect.onLeftUp(function(){
  var points = polygon.getPoints();
  var searchedPoint = null;
  points.forEach(function(point, key){
    searchedPoint = null;
    if(rectangle.searchInsidePoint(point) != null){ 
      searchedPoint = rectangle.searchInsidePoint(point);
    }
  });
  console.log(searchedPoint)
  var selectRectangle = new Rectangle(printers[0])
  if(searchedPoint != null){
    selectRectangle.addPoint(searchedPoint);
    selectRectangle.addPoint(new Point(searchedPoint.x + 10, searchedPoint.y));
    selectRectangle.addPoint(new Point(searchedPoint.x + 10, searchedPoint.y + 10));
    selectRectangle.addPoint(new Point(searchedPoint.x, searchedPoint.y + 10));
  }
	printers[1].resetCanvas();
});

keyboard.onKeyPressed("e", function(event){
  printers[0].getCanvas().style.zIndex = 0;
  printers[1].getCanvas().style.zIndex = 1;
  console.log('select activated!');
});
keyboard.onKeyPressed("b", function(event){
  printers[0].getCanvas().style.zIndex = 1;
  printers[1].getCanvas().style.zIndex = 0;
  console.log('draw activated!');
});




mouseDraw.onLeftDown(function(event){
	polygon.addPoint(new Point(mouseDraw.getPosition().x,mouseDraw.getPosition().y));
	polygon.print(true);


	// printer.printInputsByPolygon(polygon);


});



