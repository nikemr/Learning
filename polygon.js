var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint=Matter.Constraint,
  Body = Matter.Body;
  

var engine;
var world;
var vec=[];
var liste=[];
var options=[{ x: 51, y: 0 }, { x: 77, y:1 }, { x: 66, y:28 }, { x: 77, y: 29 }, { x: 132, y: 166 }, { x: 0, y: 171 }, { x: 9, y: 142 }, { x: 37, y: 33 }, { x: 29, y: 15 }, { x: 22, y: 1 }]

    
    
vec[0]=[{ x: 22, y: 0 }, { x: 35, y:27 }, { x: 49, y:15 }, { x: 52, y: 27 }, { x: 56, y: 57 }, { x: 49, y: 86 }, { x: 24, y: 93 }, { x: 1, y: 85 }, { x: 0, y: 60 }, { x: 2, y: 42 }, { x: 8, y: 32 }, { x: 16, y: 4 }]
vec[1]=[{ x: 51, y: 0 }, { x: 77, y:1 }, { x: 66, y:28 }, { x: 77, y: 29 }, { x: 132, y: 166 }, { x: 0, y: 171 }, { x: 9, y: 142 }, { x: 37, y: 33 }, { x: 29, y: 15 }, { x: 22, y: 1 }]

engine=Engine.create();
world=engine.world;
Engine.run(engine);

let img=[];

function preload(){
    for(let i=0; i<3; i++){img[i]=loadImage(`mm${i}.png`);}
    }
function setup() {
    
    createCanvas(1500, 1500);
    CompObj[0]=new CompObj(img[1],vec[1]);
    World.add(world,CompObj[0].firstOb);
    table = Bodies.rectangle(400,500,800,30);   
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
    image(img[1],0,0,img[1].width/3,img[1].height/3); 
    push();
    rectMode(CENTER);
    rect(400,500,800,30);
    pop();

}

function mouseClicked() {
    // CompObj[1]=new CompObj();
    
    console.log(mouseX,mouseY)
}
// function doubleClicked() {
//     ellipse(mouseX, mouseY, 5, 5);
//     console.log("klik")
    
// }
class CompObj{

    constructor(img,vec){
        this.sirala=vec
        this.img=img;
        this.width=img.width;
        this.height=img.height;
        //this.x=x
        //this.y=y;
        
        translate(100,100)
        //from vertices creates parts that convex that four vertices all theoretically can bee seen. check parts 
        this.firstOb=Matter.Bodies.fromVertices(150,60,vec);
        
        
        
    }
   
    
    
    
    show(){

        var angle=this.firstOb.angle        
        beginShape();

        // for(let i=0; i<this.firstOb.vertices.length; i++){
        //     vertex(this.firstOb.vertices[i]['x'], this.firstOb.vertices[i]['y']);

        // }
    
        // vertex(this.firstOb.vertices[0]['x'], this.firstOb.vertices[0]['y']);
        // vertex(this.firstOb.vertices[1]['x'], this.firstOb.vertices[1]['y']);
        // vertex(this.firstOb.vertices[2]['x'], this.firstOb.vertices[2]['y']);
        // vertex(this.firstOb.vertices[3]['x'], this.firstOb.vertices[3]['y']);
        
        endShape(CLOSE);
         
        // beginShape();
        // for(let i=0; i<this.firstOb.parts[0].vertices.length; i++){
        //     vertex(this.firstOb.parts[0].vertices[i]['x'], this.firstOb.parts[0].vertices[i]['y']);
        // }
        // endShape();
        beginShape();
        for(let i=0; i<this.firstOb.parts[1].vertices.length; i++){
            vertex(this.firstOb.parts[1].vertices[i]['x'], this.firstOb.parts[1].vertices[i]['y']);
        }
        endShape();
        beginShape();
        for(let i=0; i<this.firstOb.parts[2].vertices.length; i++){
            vertex(this.firstOb.parts[2].vertices[i]['x'], this.firstOb.parts[2].vertices[i]['y']);
        }
        endShape();
        beginShape();
        for(let i=0; i<this.firstOb.parts[3].vertices.length; i++){
            vertex(this.firstOb.parts[3].vertices[i]['x'], this.firstOb.parts[3].vertices[i]['y']);
        }
        endShape();
        beginShape();
        for(let i=0; i<this.firstOb.parts[4].vertices.length; i++){
            vertex(this.firstOb.parts[4].vertices[i]['x'], this.firstOb.parts[4].vertices[i]['y']);
        }
        endShape();

        push();
        translate(this.firstOb.position.x,this.firstOb.position.y)
        rotate(angle);
        image(this.img,-49,0-this.img.height/6,this.width/3,this.height/3);
        pop();      
        
    }   
        
}    