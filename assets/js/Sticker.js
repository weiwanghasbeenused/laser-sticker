class Sticker {
    constructor(canvas){
        this.canvas = typeof canvas == "string" ? document.getElementById(canvas) : canvas;
        this.units = [];
        this.backgroundColor = "black";
        this.scale = window.devicePixelRatio;
        this.shines = [
            { 
                'fill': 'blue',
                'deg': 15 * Math.PI * 2 / 360
            }, 
            {
                'fill': 'white',
                'deg': 130 * Math.PI * 2 / 360
            }, 
            {
                'fill': 'purple',
                'deg': 230 * Math.PI * 2 / 360
            }
        ];
        console.log(this.shines);
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

    draw(b=0, g=0){
        // this.context.save();
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // this.context.restore();
        let beta = b * Math.PI * 2 / 360;
        let gamma = g * Math.PI * 2 / 360;
        let deg = (beta + gamma) / 2;
        let shines_temp = this.shines;
        
        for(let k = 0; k < shines_temp.length; k++)
        {
            shines_temp[k].deg += deg;
        }
        console.log(shines_temp);
        for(let i = 0; i < this.unitAmount.v; i++)
        {
            for(let j = 0; j < this.unitAmount.h; j++)
            {
                let idx = i * this.unitAmount.h + j;
                this.units[idx].drawShines(this.context, shines_temp);
            }
        }
    }
}