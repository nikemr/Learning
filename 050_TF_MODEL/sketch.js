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
    }

}

function setup() {
    createCanvas(400, 400);
    raider1 = new raider;

}
function keyPressed() {
   
    if (key == '4') {
        console.log('sol');
        yon='sol'
        raider1.velocity=10;       
    }
    if (key == '8') {
        console.log('yukarı');
    }
    if (key == '2') {
        console.log('aşağı');
    }
    if (key == '6') {
        console.log('sağ');
    }
    
}
function draw() {
    
    background(0);

    raider1.update(yon);
    raider1.show();
    //raider1.update();
}