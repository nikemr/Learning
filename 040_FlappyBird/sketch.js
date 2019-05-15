var bird;
function setup(){
  createCanvas(400, 600);
  bird= new Bird();
  model=tf.sequential();
  
}

function draw() {
  background(0);
  bird.show();
  bird.update();

  

}