class Road{
    constructor(x,width,number_of_lane=3){
        this.x=x;
        this.width=width;
        this.number_of_lane=number_of_lane;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;

        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[[topLeft,bottomLeft],[topRight,bottomRight]];
    }
    getLaneCenter(laneIndex){
        const laneWidth=this.width/this.number_of_lane;
        return this.left+laneWidth/2+
                Math.min(laneIndex,this.number_of_lane-1)*laneWidth;
    }
    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        ctx.beginPath();
        ctx.moveTo(this.left,this.top);
        ctx.lineTo(this.left,this.bottom);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.right,this.top);
        ctx.lineTo(this.right,this.bottom);
        ctx.stroke();
        
        ctx.setLineDash([15, 15]);
        for(let i=1;i<this.number_of_lane;i++){
            ctx.beginPath();
            ctx.moveTo((this.right/this.number_of_lane)*i,this.top);
            ctx.lineTo((this.right/this.number_of_lane)*i,this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}