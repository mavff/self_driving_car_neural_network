class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        
        this.speed=0;
        this.Maxspeed=3;
        this.acceleration=0.2;
        this.atrito=0.05;

        this.angle=0;
        this.sensor= new Sensors(this);
        this.controls=new Controls();
    }
    update(roadBorders){
        this.#movimentation();
        this.sensor.update(roadBorders);
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

draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(-this.width/2,
                -this.height/2,
                this.width,
                this.height
                );
        ctx.fill();

        ctx.restore();
        
        this.sensor.draw(ctx);
    }
}