const canvas=document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9);
const car=new Car(road.getLaneCenter(1),920,30,50,"KEYS");
const traffic=[new Car(road.getLaneCenter(1),520,30,50,"NOKEYS",2)]
animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);

    canvas.height=window.innerHeight;
    
    ctx.save();
    ctx.translate(0,-car.y+canvas.width*3);

    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red");
    }
    car.draw(ctx,"green");
    
    ctx.restore();
    requestAnimationFrame(animate);
}