class Sticker {
    constructor(container){
        this.container = typeof canvas == "string" ? document.getElementById(container) : container;
        this.units = [];
        this.backgroundColor = "black";
        this.init();
    }
    init(){
        this.unitSizeRange = { 'min': 30, "max": 80 };
        this.unitSize = this.getStickerUnitSize();
        this.unitAmount = this.getStickerUnitAmount(this.unitSize);
        for(let i = 0; i < this.unitAmount.v; i++)
        {
            for(let j = 0; j < this.unitAmount.h; j++)
            {
                let position = { "x": j * this.unitSize, "y": i * this.unitSize };
                let thisUnit = new StickerUnit(this.unitSize, this.container);
                this.units.push(thisUnit);
            }
        }
        this.container.style.cssText = `
            width: ${this.unitAmount.h * this.unitSize}px;
            height: ${this.unitAmount.v * this.unitSize}px;
            display: flex;
            flex-wrap: wrap;
            margin-left: ${ (window.innerWidth - this.unitAmount.h * this.unitSize) / 2 }px;
            margin-top: ${ (window.innerHeight - this.unitAmount.v * this.unitSize) / 2 }px;
        `;
        this.unitFragmentInterval = this.units[0].fragmentInterval;
        this.fragmentIdx = false;
    }
    getStickerUnitSize(){
        let windowWidth  = window.innerWidth, 
            windowHeight = window.innerHeight;
        let refSide = windowWidth > windowHeight ? windowHeight : windowWidth;
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
        return { "h": Math.ceil(windowWidth / unitSize), "v": Math.ceil(windowHeight / unitSize) };
    }

    draw(b=0, g=0){
        console.log('sticker draw');
        let beta = b;
        let gamma = g;
        let deg = (beta + gamma) * 8;
        if(this.fragmentIdx === parseInt(deg / this.unitFragmentInterval)) return;
        this.fragmentIdx = parseInt(deg / this.unitFragmentInterval);
        for(let i = 0; i < this.unitAmount.v; i++)
        {
            for(let j = 0; j < this.unitAmount.h; j++)
            {
                let idx = this.unitAmount.h * i + j;
                this.units[idx].draw(deg);
            }
        }
    }
}