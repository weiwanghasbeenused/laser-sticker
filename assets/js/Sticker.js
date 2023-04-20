class Sticker {
    constructor(canvas){
        this.canvas = typeof canvas == "string" ? document.getElementById(canvas) : canvas;
        this.units = [];
        this.init();
    }
    init(){
        this.context = this.canvas.getContext("2d");
        this.unitSize = this.getStickerUnitSize();
        this.unitAmount = this.getStickerUnitAmount(this.unitSize);
        this.canvas.width = this.unitAmount.h * this.unitSize;
        this.canvas.height = this.unitAmount.v * this.unitSize;
        for(let i = 0; i < this.unitAmount.v; i++)
        {
            for(let j = 0; j < this.unitAmount.h; j++)
            {
                let position = { "x": j * this.unitSize, "y": i * this.unitSize };
                let thisUnit = new StickerUnit(this.unitSize, position);
                this.units.push(thisUnit);
            }
        }
    }
    getStickerUnitSize(){
        let windowWidth  = window.innerWidth, 
            windowHeight = window.innerHeight;
        let refSide = windowWidth > windowHeight ? windowHeight : windowWidth;
        let range = { 'min': 30, "max": 40 };
        let i = 0;
        let output = refSide / i;
        while( output > range.max )
        {
            i++;
            output = refSide / i;
        }
        return parseInt(output.toFixed(1));
    }
    getStickerUnitAmount(unitSize){
        let windowWidth  = window.innerWidth, 
            windowHeight = window.innerHeight;
        return { "h": parseInt(windowWidth / unitSize), "v": parseInt(windowHeight / unitSize) };
    }

    draw(b, g){
        let counter = 0;
        for(let i = 0; i < this.unitAmount.v; i++)
        {
            for(let j = 0; j < this.unitAmount.h; j++)
            {
                let idx = i * this.unitAmount.h + j;
                this.context.fillStyle = "blue";
                this.units[idx].draw(this.context, b);
                this.context.fillStyle = "white";
                this.units[idx].draw(this.context, b + 60);
                counter++;
            }
        }
        // console.log(counter);
    }
}