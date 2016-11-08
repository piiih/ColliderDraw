class Point
{
	constructor(x = 0, y = 0){
		this.x = x
		this.y = y
        this.selected = false
	}

	setX(value){
		this.x = value
	}
	getX(){
		return this.x
	}

	setY(value){
		this.y = value
	}
	getY(){
		return this.y
	}

	
}
module.exports = Point
