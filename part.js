var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint=Matter.Constraint;
  Composite=Matter.Composite;
  Body = Matter.Body;

var engine;
var world;






 
function setup() {

  createCanvas(1500, 1500); 
  engine=Engine.create();
  world=engine.world;
  Engine.run(engine);
  
  birinci=Bodies.circle(70,80,10);
  ikinci=Bodies.circle(90,80,10);
  compoundBodyA = Body.create({
    parts: [birinci, ikinci]
    });
  
  
  
  
    
  
//   World.add(world,birinci);
//   World.add(world,ikinci);  
  

  table = Bodies.rectangle(400,600,800,30);  
  Matter.Body.setStatic(table, true);  
  //Add them all to The World  
  World.add(world,table);
  World.add(world,compoundBodyA);
  

  

  
}
function draw(){
  background("red"); 
  ix=birinci.position.x;
  ye=birinci.position.y;
  ix2=ikinci.position.x;
  ye2=ikinci.position.y;

  circle(ix,ye,10);
  circle(ix2,ye2,10);
  rectMode(CENTER);
  rect(400,600,800,30);
  Matter.Body.translate(compoundBodyA,{x:1,y:1});
  Matter.Body.rotate(compoundBodyA,.1);


   
}