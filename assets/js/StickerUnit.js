class StickerUnit {
    constructor(size, stickerContainer, position){
        this.size = size;
        // this.position = position;
        this.stickerContainer = stickerContainer;
        this.wrapper = document.createElement("DIV");
        this.wrapper.style.cssText = `
            position: relative;
            width: ${size}px;
            height: ${size}px;
            flex: 0 0 ${size}px;
            overflow: hidden;  
        `;
        this.fragments = [];
        this.fragmentsNum = 16;
        this.fragmentsFill = [];
        this.beginIdx = 0;
        this.center = {
            "x": 50,
            "y": 50
        };
        this.init();
        
    }
    init(){
        this.fragmentInterval = 360 / this.fragmentsNum;
        this.prepareFragments();
        this.stickerContainer.appendChild(this.wrapper);
    }
    prepareFragments(){
        let a_interval = 1 / this.fragmentsNum * 2;
        // console.log(a_interval);
        for(let i = 0; i < this.fragmentsNum; i++)
        {
            let a = i <= this.fragmentsNum / 2 ? a_interval * i : 1 - a_interval * (i - this.fragmentsNum / 2);
            let f = document.createElement("DIV");
            let clipPath = '0 100%, 100% 100%, 100% ' + (1 - parseFloat(Math.tan(this.fragmentInterval * Math.PI * 2 / 360).toFixed(3))) * 100 + '%';
            f.style.cssText = `
                width: 71%;
                height: 71%;
                position: absolute;
                bottom: 50%;
                left: 50%;
                clip-path: polygon(${clipPath});
                transform-origin: bottom left;
                transform: rotate(${this.fragmentInterval * i}deg);
            `;
            this.fragments.push(f);
            this.wrapper.appendChild(f);
        }
        this.fragmentsFill = [
            "rgba(235,170,205,0.85)", 
            "rgba(245,255,75,0.95)", 
            "rgba(0,240,220,0.85)", 
            "rgba(75,125,165,0.6)", 
            "rgba(100,125,130,0.6)", 
            "rgba(75,90,85,0.5)", 
            "rgba(100,125,130,0.6)", 
            "rgba(75,125,165,0.6)",
            "rgba(235,170,205,0.85)", 
            "rgba(245,255,75,0.95)", 
            "rgba(0,240,220,0.85)", 
            "rgba(75,125,165,0.6)", 
            "rgba(100,125,130,0.6)", 
            "rgba(75,90,85,0.5)", 
            "rgba(100,125,130,0.6)", 
            "rgba(75,125,165,0.6)"
        ];
    }
    getLengthByDegree(degree){
        return acos(degree) * this.size / 2;
    }
    drawFragments(deg){
        console.log("drawFragments");
        let l = this.size * 1.414 / 2;
        let idx = parseInt(deg / this.fragmentInterval);
        this.beginIdx = idx;
        for(let i = 0; i < this.fragments.length; i++){
            idx = (idx + 1) % this.fragmentsNum;
            if(!this.fragments[idx])
            {
                // console.log("!! " + idx);
                continue;
            }
            this.fragments[idx].style.backgroundColor = this.fragmentsFill[i];
        }
    }
    draw(deg = 0){
        this.drawFragments(deg);
    }
}