import Point from "./Point"
import PrintersManager from "./PrintersManager"
import Printer from "./Printer"
import Mouse from "./Mouse"
import Polygon from "./Polygon"
import Rectangle from "./Rectangle"
import Keyboard from "./Keyboard"

var printersManager = new PrintersManager()
printersManager.addPrinter('draw', new Printer('draw', 0))
printersManager.addPrinter('select', new Printer('select', 0))
printersManager.addPrinter('selected', new Printer('selected', 0))
printersManager.addPrinter('text', new Printer('text', 0))

var printers = printersManager.getPrinters()

var polygon = new Polygon(printers['draw'])

var mouse = new Mouse()

var rectangle = new Rectangle(printersManager.getPrinters()['select'])
var keyboard = new Keyboard(printersManager.getPrinters()['draw'].getCanvas())

mouse.onLeftDown(function(){
    rectangle.setInicialPoint(new Point(mouse.getPosition().x, mouse.getPosition().y))
}, printers['select'])

mouse.onLeftHold(function(){
	rectangle.setDefiningPoints(new Point(mouse.getPosition().x, mouse.getPosition().y))
	rectangle.print(true)
}, printers['select'])

var selectRectangle = new Rectangle(printers['selected'])

mouse.onLeftUp(function(){
    printers['select'].resetCanvas()
    var polygonPoints = polygon.getPoints()
    var searchedPoint = null
    polygonPoints.forEach(function(polygonPoint, key){
        polygonPoints[key].selected = false
        searchedPoint = rectangle.searchInsideFor(polygonPoint)
        if(searchedPoint != null){ 
            polygonPoints[key].selected = true
            selectRectangle.drawAround(polygonPoint, 5);
        }
    })
    printers['select'].resetCanvas()
}, printers['select'])

keyboard.onKeyPressed("s", function(event){
    printersManager.bringToTop(printers['select']) 
    printersManager.getPrinters()['text'].resetCanvas()
    printersManager.getPrinters()['text'].drawText('Select');
    //console.log('select activated!')
})

keyboard.onKeyPressed("d", function(event){
    printersManager.bringToTop(printers['draw'])
    printersManager.getPrinters()['text'].resetCanvas()
    printersManager.getPrinters()['text'].drawText('Draw/Edit');
    //console.log('draw activated!')
})



mouse.onLeftDown(function(event){
    var exitClick = false
    polygon.getPoints().forEach(function(point, key){
        if(point.selected){
            exitClick = true 
        }
    })
    if(!exitClick){
        polygon.addPoint(new Point(mouse.getPosition().x,mouse.getPosition().y))
        polygon.print(true)
    }
}, printers['draw'])

mouse.onLeftHold(function(event){
    var polygonPoints = polygon.getPoints();
    console.log(printersManager.currentPrinter)
    polygonPoints.forEach(function(polygonPoint, key){
        if(polygonPoint.selected){
            polygonPoints[key].setX(mouse.getPosition().x)
            polygonPoints[key].setY(mouse.getPosition().y)
            polygon.print(true);
            selectRectangle.drawAround(polygonPoint, 5);
        }
    })
}, printers['draw'])


