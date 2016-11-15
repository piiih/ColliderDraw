class Printer
{
	constructor(id, zIndex){
		this.canvas = document.createElement('canvas');
		document.body.appendChild(this.canvas);
		this.canvas.id     = id;
		this.canvas.width  = 600;
		this.canvas.height = 300;
		this.canvas.style.zIndex   = zIndex;
		this.canvas.style.position = "absolute";
		this.canvas.style.border   = "1px solid";
		// this.canvas = document.getElementById('myCanvas');
		this.context = this.canvas.getContext('2d');
	}

	resetCanvas(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	getCanvas(){
		return this.canvas;
	}

  getId(){
      return this.canvas.id
  }
  drawText(text){
      this.context.font = "20px Georgia"
      this.context.fillText(text, 10, 50)
  }

	printPolygon(polygon, reset = false, displayStyle = 'fill'){
		if(reset){
			this.resetCanvas();
		}
		
		this.context.globalAlpha = 0.3;
		this.context.fillStyle = '#f00';
		this.context.beginPath();

		var points = polygon.getPoints();
		this.context.moveTo(points[0].x, points[0].y);

		for(var i = 1 ; i < points.length ; i++){
			this.context.lineTo(points[i].x, points[i].y);
		}

		this.context.closePath();
		if(displayStyle === 'fill'){
			this.context.fill();
		} else if(displayStyle === 'stroke'){
			this.context.stroke();
		}
	}

	printInputsByPolygon(polygon){
		var div = document.getElementById('form');

		div.innerHTML = '';
		var counter = 0;
		polygon.getPoints().forEach(function(point, key){
			div.innerHTML += (counter + 1) + ' - x <input type="number" class="point" id="'+counter+'x" size="5" value="'+point.x+'">';
			div.innerHTML += ' y <input type="number" class="point" id="'+(counter)+'y" size="5" value="'+point.y+'">';
			div.innerHTML += '<br>';
			counter++;
		})
	}

}
module.exports = Printer
