class StickerUnit {
    constructor(size, position, canvas){
        this.size = size;
        this.position = position;
        this.scale = window.devicePixelRatio;
        // this.canvas = canvas;
        this.degreeInterval = 40; // deg
        this.init();
    }
    init(){
        this.center = {
            "x": this.position.x + this.size / 2,
            "y": this.position.y + this.size / 2
        };
        this.degreeInterval = Math.PI * 2 / 360 * this.degreeInterval; // deg to rad
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
            // console.log(x, y);
        }
        else if( degree > Math.PI * 1 / 4 && degree <= Math.PI * 2 / 4 ) {
            // 45 - 90
            degree = Math.PI / 2 - degree;
            x += Math.atan(degree) * l;
            y -= l;
        }
        else if( degree > Math.PI * 2 / 4 && degree <= Math.PI * 3 / 4 ) {
            // 90 - 135
            degree = degree - Math.PI / 2;
            x -= Math.atan(degree) * l;
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
    draw(ctx, deg = 40){
        // ctx.save();
        ctx.beginPath();
        // ctx.rect(this.position.x, this.position.y, this.size, this.size);
        // ctx.clip();
        // this.degree = deg;
        this.drawTriangle(ctx, deg);
        ctx.closePath();
        // ctx.restore();
    }
    drawShines(ctx, s){
        ctx.save();
        ctx.beginPath();
        
        
        // ctx.clip();
        
        
        ctx.rect(this.position.x, this.position.y, this.size, this.size);
        ctx.clip();
        // ctx.closePath();
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.position.x-30, this.position.y-30, this.size - 10, this.size - 10);
        for(let i = 0; i < s.length; i++)
        {
            // console.log(s[i].fill);
            ctx.fillStyle = s[i].fill;
            this.draw(ctx, s[i].deg);
        }
        // ctx.fill();
        ctx.restore();
        
    }
}