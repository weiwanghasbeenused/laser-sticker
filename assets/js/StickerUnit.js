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
        this.fragmentsNum = 8;
        this.fragmentsFill = [];
        this.beginIdx = 0;
        this.init();
        
    }
    init(){
        // this.center = {
        //     "x": this.position.x + this.size / 2,
        //     "y": this.position.y + this.size / 2
        // };
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
            f.style.cssText = `
                width: 71%;
                height: 71%;
                position: absolute;
                bottom: 50%;
                left: 50%;
                transform-origin: bottom left;
                transform: rotate( ${this.fragmentInterval * i}deg );
            `;
            f.style.cssText += i == this.fragmentsNum.length - 1 ? 'z-index: 5' : 'z-index: 10';
            this.fragments.push(f);
            this.wrapper.appendChild(f);
            
        }
        this.fragmentsFill = ["red", "blue", "yellow", "green", "pink", "grey", "white", "grass"];
    }
    getLengthByDegree(degree){
        return acos(degree) * this.size / 2;
    }
    drawFragments(deg){
        // console.log("drawFragments");
        let l = this.size * 1.414 / 2;
        let idx = parseInt(deg / this.fragmentInterval);
        // if(idx == this.beginIdx) return;
        this.beginIdx = idx;
        for(let i = 0; i < this.fragments.length; i++){
            idx = (idx + 1) % this.fragmentsNum;
            if(!this.fragments[idx])
            {
                console.log("!! " + idx);
                continue;
            }
            console.log(this.fragments[idx]);
            this.fragments[idx].style.backgroundColor = this.fragmentsFill[i];
        }
    }
    draw(deg = 0){
        console.log('stickerUnit draw');
        this.drawFragments(deg);
    }
}