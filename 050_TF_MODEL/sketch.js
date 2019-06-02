function brain() {
    const input = tf.input({ shape: [5] });
    const hidden = tf.layers.dense({
        units: 8,
        activation: 'sigmoid'
    }).apply(input);

    const output = tf.layers.dense({
        units: 2,
        activation: 'softmax'
    }).apply(hidden);
    ttt = output;
    const model = tf.model({ inputs: input, outputs: output });
}
var yon;
var top;
var bottom;
var left;
var right;

function raider(params) {
    this.y = height / 2;
    this.x = 50
    this.friction = 1;
    this.velocity = 0;

    this.show = function () {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 20, 20);
    }

    this.update = function (yon) {

        if (this.velocity > 0) {
            this.velocity = this.velocity - this.friction;
            console.log(this.velocity);
        }

        if (yon == 'sol') {
            this.x -= this.velocity;
           
        }
        if (yon == 'sag') {
            this.x += this.velocity;
           
        }
        if (yon == 'yukarı') {
            this.y -= this.velocity;
           
        }
        if (yon == 'aşağı') {
            this.y += this.velocity;
           
        }
    }
    this.think = function () {
        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = this.x / height;
        inputs[2] = this.velocity / 10;
        inputs[3] = top;
        inputs[4] = bottom;
        inputs[5] = left;
        inputs[5] = right;
        
        let output = this.brain.predict(inputs);
        //if (output[0] > output[1] && this.velocity >= 0) {
        if (output[0] > output[1]) {
            this.up();
        }

    }

}

function setup() {
    createCanvas(1000, 1000);
    raider1 = new raider;

}
function keyPressed() {
   
    if (key == '4') {
        console.log('sol');
        yon='sol'
              
    }
    if (key == '8') {
        console.log('yukarı');
        yon='yukarı'
    }
    if (key == '2') {
        console.log('aşağı');
        yon='aşağı'
    }
    if (key == '6') {
        console.log('sağ');
        yon='sag'
    }
    
}
function draw() {

    background(0);
    if (keyIsPressed === true) {
        raider1.velocity=10; 
    }
    console.log( raider1.velocity);
    if (raider1.velocity==0) {
        yon=null; 
    }
    raider1.update(yon);
    raider1.show();
    //raider1.update();
}