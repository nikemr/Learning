var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint=Matter.Constraint
  Body = Matter.Body;
  ;

var engine;
var world;

engine=Engine.create();
world=engine.world;
Engine.run(engine);
let img=[];
let constraint=[];
function preload(){
    for(let i=0; i<3; i++){img[i]=loadImage(`mm${i}.png`);}
    }
function setup() {
    
    
    createCanvas(1500, 1500);
    
    for(let i=0; i<img.length; i++){
        CompObj[i]=new CompObj(300,70,img[i]);
        World.add(world,CompObj[i].compoundBodyA);
    }

    Matter.Body.setStatic(CompObj[0].compoundBodyA,true);

    for(let e=0; e<CompObj.length-1; e++){

        constraint[e] = Constraint.create({
            bodyA: CompObj[e].compoundBodyA,
            pointA: {x:0,y:CompObj[e].height/2},
            bodyB: CompObj[e+1].compoundBodyA,
            pointB: {x:0,y:-(CompObj[e+1].height/2)},
            stiffness: 0.01,
            damping: 0.1,
            length: 2
        }) 
        World.add(world,constraint[e]);
    }

    table = Bodies.rectangle(400,600,800,30);  
   //table2 = Bodies.rectangle(700,250,800,30); 
    Matter.Body.setStatic(table, true); 
    //Matter.Body.setStatic(table2, true);   
    //Add them all to The World  
    World.add(world,table);
    // World.add(world,table2); 

}

class CompObj{

    constructor(x,y,img){
        this.img=img;
        this.width=img.width/6;
        this.height=img.height/6;
        this.x=x
        this.y=y;
        
        this.firstOb=Bodies.rectangle(x,y,this.width,this.height);
        this.secondOb=Bodies.circle(x,y-this.height/2,5);
        this.thirdOb=Bodies.circle(x,y+this.height/2,5);
        
        this.compoundBodyA = Body.create({
            parts: [this.firstOb, this.secondOb,this.thirdOb]
            });
        
    }
   
    
    
    
    show(){
        var angle=this.compoundBodyA.angle
        var pos=this.firstOb.position;
        var posx=pos.x;
        var posy=pos.y;
        var pos2=this.secondOb.position;  
        var pos2x=pos2.x;
        var pos2y=pos2.y;
        var pos3=this.thirdOb.position;  
        var pos3x=pos3.x;
        var pos3y=pos3.y  
        push();
        rectMode(CENTER);
        translate(posx,posy);
        rotate(angle);
        //rect(0,0,this.width,this.height); 
        image(this.img, 0-this.width/2, 0-this.height/2,this.width,this.height); 
        pop();
        //circle(pos2x,pos2y,5);
        //circle(pos3x,pos3y,5); 
        
        
    }   
        
}

function draw(){
    background("red");
    for(i=0; i<CompObj.length; i++){
        CompObj[i].show();
        

    }
    for(i=0; i<CompObj.length-1; i++){
        
        line(CompObj[i].thirdOb.position.x,CompObj[i].thirdOb.position.y,CompObj[i+1].secondOb.position.x, CompObj[i+1].secondOb.position.y);

    }

    push();
    rectMode(CENTER);
    rect(400,600,800,30);
    
    pop();
    // line(CompObj1.thirdOb.position.x,CompObj1.thirdOb.position.y,CompObj2.secondOb.position.x, CompObj2.secondOb.position.y);
    // CompObj1.compoundBodyA
       
     
    
}