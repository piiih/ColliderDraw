class Mouse
{
	constructor(canvas){
		this.canvas = canvas;
		this.position = {x:0,y:0};
		this.trackMousePosition();
	}

	getPosition(){
		return this.position;
	}

	trackMousePosition(){
		var self = this;
		self.canvas.addEventListener('mousemove', function(event){
			var rect = self.canvas.getBoundingClientRect();
	        self.position = {
	          x: event.clientX - rect.left,
	          y: event.clientY - rect.top
	        };

		});
		
	}

	onLeftDown(functionName){
		this.canvas.addEventListener('mousedown', functionName);
	}

	onLeftUp(functionName){
		this.canvas.addEventListener('mouseup', functionName);
	}

	onLeftHold(functionName){
		var self = this;
		var intervalId = 0;
		self.onLeftDown(function(){
			intervalId = setInterval(functionName);
		});
		self.onLeftUp(function(){
			clearInterval(intervalId);
		});
	}

	onDrag(functionName){
		var self = this;
		self.canvas.addEventListener('drag', functionName);
		// console.log(self.position);
	}
}