// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&


var bird;
var pipes = [];
var orta;

function setup() {
  createCanvas(640, 480);
  bird = new Bird();
  pipes.push(new Pipe());


  
  
}
const model = tf.sequential();
model.add(tf.layers.dense({units: 6, inputShape: [4],activation:"sigmoid"}));
model.add(tf.layers.dense({units: 1, activation:"sigmoid"}));
const learningRate = 0.1;
const optimizer = tf.train.sgd(learningRate);
model.compile({
  optimizer: optimizer,
  loss:'meanSquaredError'
});  
 

function predict(inputs){
  const xs=tf.tensor2d([inputs]);  
  const ys=model.predict(xs);
  //const outputs=ys.dataSync();
  //console.log(outputs);
  /* Dikkat sonuç tensor değil aşağıda draw altında çağırdığında
  tekrar tensor'a çevirmek gerekiyor bu da iki defa iş */
  return ys;
  //console.log(ys.dataSync());
  
  //return ys
}
// pipes'ı buraya geçirme konusunu bilmiyordum ilginçmiş
function think(pipes){
  let inputs=[];
  inputs[0]=bird.y/height;
  inputs[1]=pipes[0].top/height;
  inputs[2]=pipes[0].bottom/height;
  inputs[3]=pipes[0].x;
  //inputs[4]=orta-abs(bird.y/height)
  
  return inputs

}




function draw() {

  background(0);
  // Orta tensor olmadığı için berada çeviriyoruz.
  orta =tf.tensor1d([pipes[0].orta/height]);
  console.log(orta.toString());  
  //loss();
  //predict(think(pipes));
  //optimizer.minimize(()=>predict(think(pipes)));
  

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    
    if (pipes[i].hits(bird)) {
      //console.log("HIT");
      //console.log(i);
    }

    if (pipes[i].offscreen()) {
      //console.log(i);
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();
  /* if (predict(think(pipes))>.5) {
  if (predict(think(pipes)).dataSync()>.5) {
    bird.up();    
  } */
  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}

