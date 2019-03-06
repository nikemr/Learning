var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint=Matter.Constraint;
  Composite=Matter.Composite;

var engine;
var world;
var comp;




function daire(x,y,r){
  // this.x=x;
  // this.y=y;
  // this.y=r;
    
  this.body=Bodies.circle(x,y,r)
}
 
function setup() {

  createCanvas(1500, 1500); 
  engine=Engine.create();
  world=engine.world;
  Engine.run(engine);
  
  birinci=new daire(70,80,10);
  ikinci=new daire(80,80,10);
  
  
  
  var options={
    bodyA: birinci.body,
    bodyB: ikinci.body,
    length: 100,
    stiffness: 0.5,
    // pointA: {x:birinci.body.position.x, y:birinci.body.position.y},
    // pointB: {x:ikinci.body.position.x, y:ikinci.body.position.y}
        
  }
    
  Matter.Body.setStatic(birinci.body, true);
  World.add(world,birinci.body);
  World.add(world,ikinci.body);  
  let constraint=Constraint.create(options);
  World.add(world,constraint);

  table = Bodies.rectangle(400,600,800,30);  
  Matter.Body.setStatic(table, true);  
  //Add them all to The World  
  World.add(world,table);
  komposto=Matter.Composite.create();
  Composite.add(komposto,birinci.body);
  Composite.add(komposto,ikinci.body);
  Composite.add(komposto,constraint);

  

  
}
function draw(){
  background("red"); 
  ix=birinci.body.position.x;
  ye=birinci.body.position.y;
  ix2=ikinci.body.position.x;
  ye2=ikinci.body.position.y;

  circle(ix,ye,10);
  circle(ix2,ye2,10);
  rectMode(CENTER);
  rect(400,600,800,30);
  //console.log(birinci.body.position)
  Matter.Composite.translate(komposto, {x:1,y:1}, true)

   
}