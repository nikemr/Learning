
let img=[];

function preload(){
    for(let i=0; i<3; i++){img[i]=loadImage(`mm${i}.png`);}
    }
function setup() {
    
    createCanvas(1500, 1500);

}
    
function draw() {
imageMode(CENTER);

image(img[0],50,img[0].height/2);

}

function mouseClicked() {
    console.log(mouseX,mouseY)
  }