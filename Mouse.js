class Mouse
{
	constructor(){
		this.canvas = null;
		this.position = {x:0,y:0};
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

	onLeftDown(functionName, printer){
        this.canvas = printer.getCanvas()
		this.trackMousePosition();
		this.canvas.addEventListener('mousedown', functionName);
	}

	onLeftUp(functionName, printer){
        this.canvas = printer.getCanvas()
		this.trackMousePosition();
		this.canvas.addEventListener('mouseup', functionName);
	}

	onLeftHold(functionName, printer){
        this.canvas = printer.getCanvas()
		this.trackMousePosition();
		var intervalId = 0;

		this.onLeftDown(function(){
			intervalId = setInterval(functionName);
		}, printer);

		this.onLeftUp(function(){
			clearInterval(intervalId);
		}, printer);
	} 
}
