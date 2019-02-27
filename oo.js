var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint=Matter.Constraint;

var engine;
var world;
let boxes=[];

let img=[]; // Declare variable 'img'.

function preload(){
  for(let i=0; i<2; i++){img[i]=loadImage(`mm${i}.png`);}
  }
  
function setup() {
  createCanvas(1500, 1500);
 
  engine=Engine.create();
  world=engine.world;
  Engine.run(engine);
  /* from The Box() actually it creates a matter.js body and
  attaches on a p5.js image */
  boxes.push(new Box(500,150,50,50,img[1]));
  boxes.push(new Box(200,10,50,50,img[0]));
  var options={bodyA: boxes[0].body,
    bodyB: boxes[1].body,
    length: 70,
    stiffness: .4}
  Matter.Body.setStatic(boxes[1].body,true)
  var constraint=Constraint.create(options);
  World.add(world,constraint);
}


function draw() {
  background("orange");
  stroke(150);
   
  boxes[0].show();
  boxes[1].show();

    
}



function Box(x,y,w,h,img) {

  this.scale=.2;
  this.image=img;
  
  
  this.a=this.image.width*this.scale;
  this.b=this.image.height*this.scale;
  
  this.body=Bodies.rectangle(x, y, w,h);
  
  
  World.add(world,this.body);

  this.show=function(){
      var pos=this.body.position;
      var angle=this.body.angle;
      push();
      translate(pos.x,pos.y);
      rect(0,0,this.a,this.b);
      image(this.image, 0, 0,this.a,this.b);
      pop();
      
  }


}