class Car{
    constructor(x,y,width,height,control_type,max_speed=3){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        
        this.speed=0;
        this.Maxspeed=max_speed;
        this.acceleration=0.2;
        this.atrito=0.05;
        this.angle=0;
        this.damaged=false;
        if(control_type=="KEYS"){
            this.sensor= new Sensors(this);
        }
        
        this.controls=new Controls(control_type);
    }
    update(roadBorders, traffic){
        if(!this.damaged){
        this.#movimentation();
        this.polygon=this.#createPolygon();
        this.damaged=this.#assessDamage(roadBorders,traffic);
        }
        if(this.sensor){
            this.sensor.update(roadBorders,traffic);
        }
    }
    #assessDamage(roadBorders,traffic){
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                return true;
            }
        }
        return false;
    }
    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        
        points.push({x:this.x-Math.sin(this.angle-alpha)*rad,
                    y:this.y-Math.cos(this.angle-alpha)*rad
        });
        
        points.push({x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        
        points.push({x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        
        points.push({x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }
    #movimentation(){

        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
        this.speed-=this.acceleration;
        }
        if(this.speed>this.Maxspeed){
            this.speed=this.Maxspeed;
        }
        if(this.speed<-this.Maxspeed/3){
            this.speed=-this.Maxspeed/3;
        }
        if(this.speed>0){
            this.speed-=this.atrito;
        }
        if(this.speed<0){
            this.speed+=this.atrito;
        }
        if(Math.abs(this.speed)<this.atrito){
            this.speed=0; 
        }
        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
            this.angle-=0.03*flip;
            }
        }
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle )*this.speed;
    }   

draw(ctx, color){
    if(this.damaged){
        ctx.fillStyle="gray";
    }else{
        ctx.fillStyle=color ;
    }
    
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();
        if(this.sensor){
            this.sensor.draw(ctx);
        }
    }
}
function polysIntersect(poly1,poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
                );
            if(touch){
                return true;
            }
        }
    }
    return false;
}
function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            };
        }
    }

    return null;
}