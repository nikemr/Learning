var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint=Matter.Constraint,
  Body = Matter.Body;
  

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
    CompObj[0]=new CompObj(img[0]);
    World.add(world,CompObj[0].firstOb);
    table = Bodies.rectangle(450,500,800,30);   
    Matter.Body.setStatic(table, true);       
    //Add them all to The World  
    World.add(world,table);
}
    
function draw() {
    
    background('#79f4ef');
    
    CompObj[0].show();
    if (CompObj[1]){
        CompObj[1].show();
        World.add(world,CompObj[1].firstOb);
    }   
    image(img[0],0,0,img[0].width/3,img[0].height/3); 
}

function mouseClicked() {
    // CompObj[1]=new CompObj();
    console.log(mouseX,mouseY);
    console.log(mouseX,mouseY)
  }
  class CompObj{

    constructor(img){
        
        this.img=img;
        this.width=img.width;
        this.height=img.height;
        //this.x=x
        //this.y=y;
        
        translate(100,100)
        this.firstOb=Matter.Bodies.fromVertices(50,50,[{ x: 100, y: 200 }, { x: 200, y:200 }, { x: 200, y: 100 }, { x: 100, y: 100 }]);
        
    }
   
    
    
    
    show(){

        var angle=this.firstOb.angle        
        beginShape();
        vertex(this.firstOb.vertices[0]['x'], this.firstOb.vertices[0]['y']);
        vertex(this.firstOb.vertices[1]['x'], this.firstOb.vertices[1]['y']);
        vertex(this.firstOb.vertices[2]['x'], this.firstOb.vertices[2]['y']);
        vertex(this.firstOb.vertices[3]['x'], this.firstOb.vertices[3]['y']);
        endShape(CLOSE);
         
        push();
        translate(this.firstOb.position.x,this.firstOb.position.y)
        rotate(angle);
        image(this.img,0-this.img.width/6,0-this.img.height/6,this.width/3,this.height/3);
        pop();      
        
    }   
        
}    