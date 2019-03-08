var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint=Matter.Constraint
  ;

var engine;
var world;
let boxes=[];
engine=Engine.create();
world=engine.world;
Engine.run(engine);

let img=[];

function preload(){
  for(let i=0; i<2; i++){img[i]=loadImage(`mm${i}.png`);}
  }

 
function setup() {
  createCanvas(1500, 1500); 
  //Create picture and attach to a Matter.JS body

  picture1=new picture(img[0],300,50);
  Matter.Body.setStatic(picture1.body, true)
  picture2=new picture(img[1],550,500);
  
  
  var options={bodyA: picture1.body,
    bodyB: picture2.body,
    length: 150,
    stiffness: .4,
    pointA: {x:0, y:50},
    pointB: {x:0, y:-50}
    }
    
  // Create Ground and make static
  table = Bodies.rectangle(400,600,800,30);  
  Matter.Body.setStatic(table, true);  
  //Add them all to The World  
  World.add(world,table);
  World.add(world,picture1.body);
  World.add(world,picture2.body);  
  let constraint=Constraint.create(options);
  World.add(world,constraint);
  
  
}
function draw(){
  background("red"); 
  /*  Change rectMode to CENTER so ground(P5.js) will match with
  Matter's ground. It also apply to showPict */
  rectMode(CENTER);
  rect(400,600,800,30);
  
  
  picture1.showPict();
  picture2.showPict();
  picture2.top();
  picture1.bot();

  
  line(picture1.botCoor.X,picture1.botCoor.Y,picture2.topCoor.X,picture2.topCoor.Y);
 
  
  

  // console.log(picture2.topx);
  // console.log(picture2.topy);

  
  
}

class picture{
  
  constructor(img,x,y){

    this.image=img;
    this.width=img.width;
    this.height=img.height;
    this.newWidth=this.width/3
    this.newHeight=this.height/3
    /*this is a  Matter.js ractangle that
     got its height and width from the image
     (scaled heighand width  )*/
    this.body=Bodies.rectangle(x, y, this.newWidth,this.newHeight);
    //this.body2=Bodies.circle(x,y-this.newHeight/2,5,10)
    
    
      
  }
  
  showPict(){
    push();
    var angle=this.body.angle
    
    var po=this.body.position
    /*this is a  P5.js ractangle that
     got its height and width from the image
     (scaled heighand width  ) and its coordinates
      from the class parameters "x" and "y"*/
    
    translate(po.x,po.y);
    rotate(angle);
    
    rectMode(CENTER);
    
    rect(0,0,this.newWidth,this.newHeight);
    
    /*this image gets its coordinates
      from the class parameters "x" and "y" and height
       and weight from itself (but scaled)*/
    image(this.image, 0-this.newWidth/2, 0-this.newHeight/2,this.newWidth,this.newHeight);
    //console.log(Matter.Bodies.circle(0,0,20));
    circle(0,0-this.newHeight/2,10);
    
    
    pop();
    
    
  }
  /*  aşağıdaki değerler yalnış hesaplanıyor çünküdönüşlersw x ve y toplanamaz.
  Toplanırsa hatalı noktalar verir, veriyor */
  bot(){

    var botx= this.body.position.x;
    var boty= this.body.position.y+this.newHeight/2;
    this.botCoor={X:botx, Y: boty};    
    return this.botCoor;    
  }
  top(){
    
    var topx= this.body.position.x;
    var topy= this.body.position.y-this.newHeight/2;
    this.topCoor={X:topx,Y: topy};  
    
    return this.topCoor;    
  }
 

}
