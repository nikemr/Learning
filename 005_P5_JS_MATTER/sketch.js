
let img; // Declare variable 'img'.

function setup() {
  createCanvas(1000, 1000);
  background("red");
  img = loadImage('mmk.png'); // Load the image
  
}


function draw() {
  stroke(150);
  
  image(img, 0, 0);
  
  
  ellipse(390, 39, 39,39);

}
