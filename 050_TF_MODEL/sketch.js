function brain() {
    return tf.tidy(() => {
        const input = tf.input({ shape: [7] });
        const hidden = tf.layers.dense({
            units: 14,
            activation: 'sigmoid'
        }).apply(input);
        const output = tf.layers.dense({
            units: 4,
            activation: 'softmax'
        }).apply(hidden);
        const model = tf.model({ inputs: input, outputs: output });
        return model;
    });
}

var yon;
var ust = 5;
var alt = 1000;
var sol = 5;
var sag = 1000;
var raiders = [];
var t = 0;
var beb = ''
let x;
var randomBrain;

function raider(beb) {

    const now1 = t;
    this.y = height / 2;
    this.x = width / 2
    this.friction = .5;
    this.velocity = 0;

    this.brain = new brain(beb);
    //console.log(this.brain.name);
    if (beb == 'bebis') {
        tf.tidy(() => {
            const mutatedWeights = [];
            for (let i = 0; i < randomBrain.length; i++) {
                let tensor = randomBrain[i];
                let shape = randomBrain[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < .25) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.brain.setWeights(mutatedWeights);
        });
    }
    this.show = function () {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 20, 20);
    }
    this.lifeSpan = function () {        
        return t - now1;
    }
    this.update = function (yon) {        
        if (this.velocity > 0) {
            this.velocity = this.velocity - this.friction;            
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
        inputs[3] = this.y / 1000;
        inputs[4] = (alt - this.y) / 1000;
        inputs[5] = this.x / 1000;
        inputs[6] = (sag - this.x) / 1000;

        tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const output = this.brain.predict(xs).dataSync();            
            let maxx = Math.max.apply(null, output);            
            let maxindex = output.indexOf(maxx);
            if (maxindex == 0) {
                yon = 'sol';
            }
            if (maxindex == 1) {
                yon = 'sag';
            }
            if (maxindex == 2) {
                yon = 'aşağı';
            }
            if (maxindex == 3) {
                yon = 'yukarı';
            }            
            this.update(yon);
        });

    }

}
function bebis() {
    raiders.push(new raider('bebis'));
}
function setup() {
    createCanvas(1000, 1000);
    tf.setBackend('cpu');
    raiders.push(new raider());
}
var died=[];
function die() {
    tf.tidy(() => {
        
        for (let i = raiders.length - 1; i >= 0; i--) {


            if (raiders[i].x < 0 || raiders[i].x > 1000 || raiders[i].y < 0 || raiders[i].y > 1000 || raiders[i].lifeSpan() > 1000) {
                died.push(raiders[i]);
                raiders.splice(i, 1);                
            }
        }
    });
}
function draw() {
    if (died.length > 0) {
        died[0].brain.dispose();
        died.splice(0, 1);
    }
    tf.tidy(() => {
        x = round(random(raiders.length - 1));
        randomBrain = raiders[x].brain.getWeights();
        background(0);
        die();
        t = frameCount;
        if (raiders.length < 15) {
            bebis();
        }
        for (let i = 0; i < raiders.length; i++) {
            if (keyIsPressed === true) {
                raiders[i].velocity = 10;
            }
            //console.log( raider1.velocity);
            if (raiders[i].velocity === 0) {
                raiders[i].velocity = 10;
            }
            raiders[i].show();
            raiders[i].think();
        }
    });
}