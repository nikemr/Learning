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
var imageScale=.25
function preload(){
        for(let i=0; i<2; i++){img[i]=loadImage(`mm${i}.png`);}
        }
function setup() {
    
    createCanvas(1500, 1500);
   
    CompObj1= new CompObj(300,70,60,60);
    Matter.Body.setStatic(CompObj1.compoundBodyA, true);
    CompObj2= new CompObj(450,180,60,60);


    table = Bodies.rectangle(400,600,800,30);  
    table2 = Bodies.rectangle(700,250,800,30); 
    Matter.Body.setStatic(table, true); 
    Matter.Body.setStatic(table2, true);   
    //Add them all to The World  
    World.add(world,table);
    World.add(world,table2);
    
    



    constraint = Constraint.create({
        bodyA: CompObj1.compoundBodyA,
        pointA: {x:0,y:30},
        bodyB: CompObj2.compoundBodyA,
        pointB: {x:0,y:-30},
        stiffness: 0.003,
        damping: 0.05,
        length: 55
    })
   
    World.add(world,constraint);

}

function CompObj(x,y,wi,he){
    this.y=y;
    this.wi=wi;
    this.he=he
    this.firstOb=Bodies.rectangle(x,y,wi,he);
    this.secondOb=Bodies.circle(x,y-he/2,5);
    this.thirdOb=Bodies.circle(x,y+he/2,5);
     
    this.compoundBodyA = Body.create({
        parts: [this.firstOb, this.secondOb,this.thirdOb]
        });
    World.add(world,this.compoundBodyA);
    
    
    
    this.show=function(){
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
        rect(0,0,this.wi,this.he); 
        pop();
        circle(pos2x,pos2y,5);
        circle(pos3x,pos3y,5); 
        
        
    }   
        
}

function draw(){
    background("red");
    CompObj1.show();
    CompObj2.show();
    push();
    rectMode(CENTER);
    rect(400,600,800,30);
    rect(700,250,800,30);
    pop();
    line(CompObj1.thirdOb.position.x,CompObj1.thirdOb.position.y,CompObj2.secondOb.position.x, CompObj2.secondOb.position.y);
    CompObj1.compoundBodyA
    image(img[0], 0, 0);
}