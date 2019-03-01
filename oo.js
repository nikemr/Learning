var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint=Matter.Constraint;

var engine;
var world;
let boxes=[];
engine=Engine.create();
world=engine.world;
Engine.run(engine);

let img=[]; // Declare variable 'img'.

function preload(){
  for(let i=0; i<2; i++){img[i]=loadImage(`mm${i}.png`);}
  }
  
function setup() {
  createCanvas(1500, 1500);
 
  
  /* from The Box() actually it creates a matter.js body and
  attaches on a p5.js image */
  for(let i=0; i<img.length; i++){
    boxes.push(new Box(500-(i),170,50,50,img[i]));}
  

    

    
  var options={bodyA: boxes[0].body,
    bodyB: boxes[1].body,
    length: 90,
    stiffness: .4,
    // pointA: {x: p1.x, y:p1.y+img[0].height/10},
    // pointB: {x: p2.x, y:p2.y-img[1].height/10}
    }
    
  Matter.Body.setStatic(boxes[0].body,true)
  
  var constraint=Constraint.create(options);
  World.add(world,constraint);
}


function draw() {
  background("white");
  stroke(150);

  //for showing each image 
  for(let i=0; i<boxes.length; i++){
    boxes[i].show();
  }
  
  

  let tos0=boxes[0].body.position;
  let tos1=boxes[1].body.position; 
  line(tos0.x,tos0.y+img[0].height/10,tos1.x,tos1.y-img[0].height/5);

  

    
}



function Box(x,y,w,h,img) {

  this.scale=.2;
  this.image=img;
  this.x=x;
  this.y=y;
  
  this.a=this.image.width*this.scale;
  this.b=this.image.height*this.scale;
  
  this.body=Bodies.rectangle(x, y, this.a,this.b);
  
  
  
  World.add(world,this.body);

  this.show=function(){
      var pos=this.body.position;
      // this (push()) is for moving x,y coordinates of img to Matter's ractangle
      push();
      translate(pos.x,pos.y);
      //this is for checking if rect and image were matched
      //rectMode(CENTER);
      //rect(0,0,this.a,this.b);
      image(this.image, (-0.5)*(this.a), (-0.5)*(this.b),this.a,this.b);
      pop();
      
  }


}