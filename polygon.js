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

function preload(){
    for(let i=0; i<3; i++){img[i]=loadImage(`mm${i}.png`);}
    }
function setup() {
    
    createCanvas(1500, 1500);
    CompObj[0]=new CompObj(300,70,img[0]);
    table = Bodies.rectangle(400,600,800,30);   
    Matter.Body.setStatic(table, true);       
    //Add them all to The World  
    World.add(world,table);
}
    
function draw() {
imageMode(CENTER);
CompObj[0].show();
image(img[0],img[0].width/2,img[0].height/2);




}

function mouseClicked() {
    console.log(mouseX,mouseY)
  }
  class CompObj{

    constructor(x,y,img){
        this.img=img;
        this.width=img.width;
        this.height=img.height;
        this.x=x
        this.y=y;
        
        //this.firstOb=Bodies.fromVertices(0,0,)
    }
   
    
    
    
    show(){
        // var angle=this.compoundBodyA.angle
        // var pos=this.firstOb.position;
        // var posx=pos.x;
        // var posy=pos.y;
         
        push();
        rectMode(CENTER);
        // translate(posx,posy);
        
        beginShape();
        
        vertex(20, 20);
        vertex(0, 20);
        vertex(0, 40);
        vertex(20, 40);
        
        endShape(CLOSE);
         
        image(this.img, 0-this.width/2, 0-this.height/2,this.width,this.height); 
        pop();
        
        
        
    }   
        
}    