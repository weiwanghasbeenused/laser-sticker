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
        this.fragmentInterval = 2 * Math.PI / this.fragmentsNum;
        this.prepareFragments();
        this.stickerContainer.appendChild(this.wrapper);
    }
    getAxisByRad(rad){
        // degree = degree % (Math.PI * 2);
        let x = this.center.x;
        let y = this.center.y;
        let l = 141.4 / 2;
        if(rad <= Math.PI * 1 / 4 ) {
            // 0 - 45
            x += l;
            y -= Math.tan(rad) * l;
        }
        else if( rad > Math.PI * 1 / 4 && rad <= Math.PI * 2 / 4 ) {
            // 45 - 90
            rad = Math.PI / 2 - rad;
            x += Math.tan(rad) * l;
            y -= l;
        }
        else if( rad > Math.PI * 2 / 4 && rad <= Math.PI * 3 / 4 ) {
            // 90 - 135
            rad = rad - Math.PI / 2;
            x -= Math.tan(rad) * l;
            y -= l;
        }
        else if( rad > Math.PI * 3 / 4 && rad <= Math.PI ) {
            // 135 - 180
            rad = Math.PI - rad;
            x -= l;
            y -= Math.tan(rad) * l;
        }
        else if( rad > Math.PI && rad <= Math.PI * 5 / 4 ) {
            // 180 - 225
            rad = rad - Math.PI;
            x -= l;
            y += Math.tan(rad) * l;
        }
        else if( rad > Math.PI * 5 / 4 && rad <= Math.PI * 6 / 4 ) {
            // 225 - 270
            rad = Math.PI * 3 / 2 - rad;
            x -= Math.tan(rad) * l;
            y += l;
        }
        else if( rad > Math.PI * 6 / 4 && rad <= Math.PI * 7 / 4 ) {
            // 270 - 315
            rad = rad - Math.PI * 3 / 2;
            x += Math.tan(rad) * l;
            y += l;
        }
        else{
            // 315 - 360
            rad = Math.PI * 2  - rad;
            x += l;
            y += Math.tan(rad) * l;
        }
        let output = parseFloat(x.toFixed(2)) + '% ' + parseFloat(y.toFixed(2)) + '%';
        return output;
    }
    getClipPath(beginRad){
        let output = 'polygon(50% 50%,';
        output += this.getAxisByRad(beginRad) + ', ';
        output += this.getAxisByRad(beginRad + this.fragmentInterval) + ')';
        return output;
    }
    prepareFragments(){
        let a_interval = 1 / this.fragmentsNum * 2;

        for(let i = 0; i < this.fragmentsNum; i++)
        {
            let a = i <= this.fragmentsNum / 2 ? a_interval * i : 1 - a_interval * (i - this.fragmentsNum / 2);
            let f = document.createElement("DIV");
            let clipPath = this.getClipPath(this.fragmentInterval * i);
            f.style.cssText = `
                width: 141.2%;
                height: 141.2%;
                position: absolute;
                top: -20.6%;
                left: -20.6%;
                clip-path: ${clipPath};
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
    drawFragments(rad){
        // console.log("drawFragments");
        let l = this.size * 1.414 / 2;
        let idx = parseInt(rad / this.fragmentInterval);
        if(idx ==  this.beginIdx) return;
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
    draw(rad = 0){
        this.drawFragments(rad);
    }
}