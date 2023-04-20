class StickerUnit {
    constructor(size, position, canvas){
        this.size = size;
        this.position = position;
        this.scale = window.devicePixelRatio;
        // this.canvas = canvas;
        this.degreeInterval = 40; // deg
        this.fragments = [];
        this.fragmentsNum = 8;
        this.fragmentInterval = Math.PI * 2;
        this.fragmentsFill = [];
        this.beginIdx = 0;
        this.init();
        
    }
    init(){
        this.center = {
            "x": this.position.x + this.size / 2,
            "y": this.position.y + this.size / 2
        };
        this.degreeInterval = Math.PI * 2 / 360 * this.degreeInterval; // deg to rad
        this.fragmentInterval /= this.fragmentsNum;
        this.prepareFragments();
    }
    prepareFragments(){
        let a_interval = 1 / this.fragmentsNum * 2;
        // console.log(a_interval);
        for(let i = 0; i < this.fragmentsNum; i++)
        {
            let a = i <= this.fragmentsNum / 2 ? a_interval * i : 1 - a_interval * (i - this.fragmentsNum / 2);
            // let a = a_interval * i;
            this.fragments.push( 
                { 
                    "from": parseFloat((i * this.fragmentInterval).toFixed(3)),
                    "to": parseFloat(((i+1) * this.fragmentInterval).toFixed(3))
                } 
            );
            this.fragmentsFill.push("rgba(200, 200, 200, "+ a +")");
        }
    }
    getLengthByDegree(degree){
        return acos(degree) * this.size / 2;
    }
    getAxisByDegree(degree){
        degree = degree % (Math.PI * 2);
        let x = this.center.x;
        let y = this.center.y;
        let l = this.size * 1.414 / 2;
        if(degree <= Math.PI * 1 / 4 ) {
            // 0 - 45
            x += l;
            y -= Math.tan(degree) * l;
        }
        else if( degree > Math.PI * 1 / 4 && degree <= Math.PI * 2 / 4 ) {
            // 45 - 90
            degree = Math.PI / 2 - degree;
            x += Math.tan(degree) * l;
            y -= l;
        }
        else if( degree > Math.PI * 2 / 4 && degree <= Math.PI * 3 / 4 ) {
            // 90 - 135
            degree = degree - Math.PI / 2;
            x -= Math.tan(degree) * l;
            y -= l;
        }
        else if( degree > Math.PI * 3 / 4 && degree <= Math.PI ) {
            // 135 - 180
            degree = Math.PI - degree;
            x -= l;
            y -= Math.tan(degree) * l;
        }
        else if( degree > Math.PI && degree <= Math.PI * 5 / 4 ) {
            // 180 - 225
            degree = degree - Math.PI;
            x -= l;
            y += Math.tan(degree) * l;
        }
        else if( degree > Math.PI * 5 / 4 && degree <= Math.PI * 6 / 4 ) {
            // 225 - 270
            degree = Math.PI * 3 / 2 - degree;
            x -= Math.tan(degree) * l;
            y += l;
        }
        else if( degree > Math.PI * 6 / 4 && degree <= Math.PI * 7 / 4 ) {
            // 270 - 315
            degree = degree - Math.PI * 3 / 2;
            x += Math.tan(degree) * l;
            y += l;
        }
        else{
            // 315 - 360
            degree = Math.PI * 2  - degree;
            x += l;
            y += Math.tan(degree) * l;
        }
        return {"x": x.toFixed(2), "y": y.toFixed(2)};
    }
    drawTriangle(ctx, deg){
        
        // deg = deg * Math.PI * 2 / 360;
        let point1 = this.getAxisByDegree(deg);
        let point2 = this.getAxisByDegree(deg + this.degreeInterval);
        let points = [ 
            {
                "x": this.center.x, 
                "y": this.center.y
            },
            {
                "x": point1.x, 
                "y": point1.y
            },
            {
                "x": point2.x, 
                "y": point2.y
            },
        ];
        for(let i = 0; i < points.length; i++)
        {
            if(i == 0) ctx.moveTo(points[i].x, points[i].y);
            else ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.fill();
    }
    drawFragments(ctx, deg){
        // console.log("drawFragments");
        let l = this.size * 1.414 / 2;
        let idx = parseInt(Math.abs(deg) / this.fragmentInterval);
        if(idx == this.beginIdx) return;
        this.beginIdx = idx;
        // console.log(l);
        for(let i = 0; i < this.fragments.length; i++){
            // ctx.save();
            // console.log(idx);
            idx = (idx + 1) % this.fragmentsNum;
            if(!this.fragments[idx])
            {
                console.log("!! " + idx);
                continue;
            }
            ctx.beginPath();
            ctx.moveTo(this.center.x, this.center.y);
            ctx.fillStyle = this.fragmentsFill[i];
            
            ctx.arc(this.center.x, this.center.y, l, this.fragments[idx]["from"], this.fragments[idx]["to"]);
            ctx.closePath();
            ctx.fill();
            
            // ctx.restore();
        }
    }
    draw(ctx, deg = 0){
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.size, this.size);
        ctx.clip();
        
        // this.drawTriangle(ctx, deg);
        // console.log(deg);
        this.drawFragments(ctx, deg);
        ctx.restore();
    }
    drawShines(ctx, s){
        // ctx.save();
        // ctx.beginPath();
        // ctx.rect(this.position.x, this.position.y, this.size, this.size);
        // ctx.clip();
        for(let i = 0; i < s.length; i++)
        {
            // ctx.fillStyle = s[i].fill;
            this.draw(ctx, s[i].deg);
        }
        // ctx.restore();
        
    }
}