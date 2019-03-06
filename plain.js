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

function setup() {
    createCanvas(1500, 1500);
    CompObj1= new CompObj(300,70,60,60);
    Matter.Body.setStatic(CompObj1.compoundBodyA, true);
    CompObj2= new CompObj(300,150,60,60);


    table = Bodies.rectangle(400,600,800,30);  
    Matter.Body.setStatic(table, true);  
    //Add them all to The World  
    World.add(world,table);
    
}

function CompObj(x,y,wi,he){
    this.x=x;
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
        var angle=this.firstOb.angle
        var pos=this.firstOb.position;
        var posx=pos.x;
        var posy=pos.y;
        var pos2=this.secondOb.position;  
        var pos2x=pos2.x;
        var pos2y=pos2.y;
        var pos3=this.thirdOb.position;  
        var pos3x=pos3.x;
        var pos3y=pos3.y  
        rectMode(CENTER);
        push();
        translate(posx,posy);
        
        rect(posx,posy,this.wi,this.he); 
                   
        circle(pos2x,pos2y,5);
        circle(pos3x,pos3y,5);
        pop();
        

        
        
        
    }   
        
}
function draw(){
    background("red");
    CompObj1.show();
    CompObj2.show();
    rect(400,600,800,30);
    Matter.Body.rotate(CompObj2.compoundBodyA,.1);
    
    
    
}