class Sticker {
    constructor(canvas){
        this.canvas = typeof canvas == "string" ? document.getElementById(canvas) : canvas;
        this.units = [];
        this.backgroundColor = "black";
        this.scale = window.devicePixelRatio;
        this.init();
    }
    init(){
        this.unitSizeRange = { 'min': 30 * this.scale, "max": 60 * this.scale };
        this.context = this.canvas.getContext("2d");
        this.unitSize = this.getStickerUnitSize();
        console.log(this.unitSize);
        this.unitAmount = this.getStickerUnitAmount(this.unitSize);
        console.log(this.unitAmount);
        this.canvas.style.width = this.unitAmount.h * this.unitSize / this.scale + 'px';
        this.canvas.style.height = this.unitAmount.v * this.unitSize / this.scale + 'px';
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
        refSide *= this.scale;
        let i = 0;
        let output = refSide / i;
        while( output > this.unitSizeRange.max )
        {
            i++;
            output = refSide / i;
        }
        return parseInt(output.toFixed(1));
    }
    getStickerUnitAmount(unitSize){
        let windowWidth  = window.innerWidth, 
            windowHeight = window.innerHeight;
        return { "h": parseInt(windowWidth * this.scale / unitSize), "v": parseInt(windowHeight * this.scale / unitSize) };
    }

    draw(b, g){
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        let beta = b * Math.PI * 2 / 360;
        for(let i = 0; i < this.unitAmount.v; i++)
        {
            for(let j = 0; j < this.unitAmount.h; j++)
            {
                let idx = i * this.unitAmount.h + j;
                this.context.fillStyle = "blue";
                this.units[idx].draw(this.context, beta);
                this.context.fillStyle = "white";
                this.units[idx].draw(this.context, beta + 60);
            }
        }
    }
}