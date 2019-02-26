var Engine = Matter.Engine, World = Matter.World, Bodies = Matter.Bodies;

var engine;
var world;
var boxy;

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
  boxy=new Box(200,10,50,50,img[1]);
  


  // for(let i=0; i<img.length; i++){
  //   pictures[i]=new picture(img[i]);
  //   //pictures[i]
  // }
  
}


function draw() {
  background("orange");
  stroke(150);
   
  boxy.show();
    
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
      //rect(0,0,this.a,this.b);
      image(this.image, 0, 0,this.a,this.b);
      pop();
      
  }


}