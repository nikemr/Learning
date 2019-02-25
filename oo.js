var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxy;

let img=[]; // Declare variable 'img'.
pictures=[]
function preload(){
  for(let i=0; i<2; i++){img[i]=loadImage(`mm${i}.png`);}
  }
  
function setup() {
  createCanvas(1500, 1500);
 
  engine=Engine.create();
  world=engine.world;
  Engine.run(engine);
  /* from The Box() actually it creates a matter.js body and
  attaches on a p5.js rect */
  boxy=new Box(200,10,50,50);
  


  for(let i=0; i<img.length; i++){
    pictures[i]=new picture(img[i],boxy);
    //pictures[i]
  }
  
}


function draw() {
  background("orange");
  stroke(150);
   
  boxy.show();
  //console.log(boxy.body.position.y);
  for(let i=0; i<pictures.length; i++){
    
    pictures[i].showPict();

  }  
}


class picture{
  constructor(img,boxy){
    this.image=img;
    this.boxy=boxy;

    
    
  }
  showPict(){
  console.log(this.boxy.body.position.y);
   image(this.image, 0, 0,this.image.width/5,this.image.height/5);
  }
}

function Box(x,y,w,h) {
  this.body=Bodies.rectangle(x, y, w,h);
  this.w=w;
  this.h=h;
  World.add(world,this.body);

  this.show=function(){
      var pos=this.body.position;
      var angle=this.body.angle;
      push();
      translate(pos.x,pos.y);
      rect(0,0,this.w,this.h);
      pop();
  }


}
/* class picture{
  constructor(img){
    this.image=img;
    
  }
  showPict(){
   image(this.image, 0, 0,this.image.width/5,this.image.height/5);
  }
}

function Box(x,y,w,h) {
  this.body=Bodies.rectangle(x, y, w,h);
  this.w=w;
  this.h=h;
  World.add(world,this.body);

  this.show=function(){
      var pos=this.body.position;
      var angle=this.body.angle;
      push();
      translate(pos.x,pos.y);
      rect(0,0,this.w,this.h);
      pop();
  }


} */