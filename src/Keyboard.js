class Keyboard
{
	constructor(canvas){
    this.canvas = canvas; 
    this.trackKeyboard();
	}

  trackKeyboard(){
		var self = this;
		self.canvas.addEventListener('keydown', function(event){
      if(event.which){
        console.log(String.fromcharcode(event.which));
      }

		});
  }
  onKeyPressed(keyName,functionName){
    document.addEventListener('keypress', function(event){
      if(String.fromCharCode(event.which) == keyName){ 
        functionName();
      }
    });
  }


	
}
module.exports = Keyboard
