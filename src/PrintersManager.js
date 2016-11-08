class PrintersManager
{
    constructor(){
        this.printers = {}
    
    }
    addPrinter(name, printer){
        this.printers[name] = printer;
    }
    getPrinters(){
        return this.printers;
    }
    bringToTop(currentPrinter){ 
        for(var key in this.printers){
            this.printers[key].getCanvas().style.zIndex = 0
            if(currentPrinter.getId() == this.printers[key].getId()){
                this.printers[key].getCanvas().style.zIndex = 1 
            }
        }

    }


}
module.exports = PrintersManager
