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

  boxy=new Box(200,10,50,50);


  for(let i=0; i<img.length; i++){
    pictures[i]=new picture(img[i]);
    //pictures[i]
  }
  
}


function draw() {
  background("red");
  stroke(150);
   
  boxy.show();
  for(let i=0; i<pictures.length; i++){
    
    pictures[i].showPict();
  } 
}

class picture{
  constructor(img){
    this.image=img;
    
  }
  showPict(){
   image(this.image, 0, 0,this.image.width/5,this.image.height/5);
  }
}