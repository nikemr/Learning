function brain() {
    return tf.tidy(() => {
        const input = tf.input({ shape: [6] });
        const hidden = tf.layers.dense({
            units: 52,
            activation: 'sigmoid'
        }).apply(input);
        const hidden2 = tf.layers.dense({
            units: 28,
            activation: 'sigmoid'
        }).apply(hidden);
        const output = tf.layers.dense({
            units: 2,
            activation: 'tanh'
        }).apply(hidden2);
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
let chums = [];
var died = [];
let popSlider;
let foodSizer;
let hamDistance;
let learningchance;
let learningRate;

function chum() {
    this.now1 = t;
    this.pos = createVector(random(600) + 200, random(600) + 200);
    
    this.show = function () {
        this.life = t - this.now1;
        
        fill(0, 255, 0); 
        textSize(9);
        text(this.life, 15, 15)
        
        ellipse(this.pos.x, this.pos.y, foodSizer.value(), foodSizer.value());
    }
    this.life = t - this.now1;

}
function raider(beb) {

    this.now1 = t;
    this.pos = createVector(random(700) + 100, random(700) + 100);
    // this.y = height / 2;
    // this.x = width / 2;

    this.velocity = createVector(0, 0)
    this.accel = createVector(0, 0);
    this.heading = createVector(0, 0);

    this.brain = new brain(beb);
    //console.log(this.brain.name);
    if (beb == 'bebis') {
        tf.tidy(() => {
            // this mutation part is mostly from Daniel Shiffman
            const mutatedWeights = [];
            for (let i = 0; i < randomBrain.length; i++) {
                let tensor = randomBrain[i];
                let shape = randomBrain[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < learningchance.value()) {
                        let w = values[j];
                        
                        values[j] = w + randomGaussian(0,learningRate.value());
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
        ellipse(this.pos.x, this.pos.y, 20, 20);

        this.yonum = p5.Vector.fromAngle(radians(this.heading), 20);
        push();
        translate(this.pos.x, this.pos.y);
        
        line(0, 0, this.yonum.x, this.yonum.y);
        
        fill(0, 102, 153);
        textSize(9);
        text(this.life, 15, 15)
        fill(255, 102, 153);
        text(round(this.heading), -15, -15);
        pop();

    }

    this.lifeSpan = function () {
        // this is only for showing life
        this.life = t - this.now1;
        this.normalizedLife = map(this.life, -1000, 400, -.7, .7);

        // this is only for showing life
        return t - this.now1;
    }
    
    this.update = function (velVector) {

        
        this.pos.add(velVector);
        //bunun burada olması güzel olmadı çizimi this.show altında olmalı.
        this.heading = velVector.heading();

        //console.log(this.heading); 
    }
    this.think = function () {
        let inputs = [];
        let Moutput = [];

        inputs[0] = chums[0].pos.x / 1000;
        inputs[1] = chums[0].pos.y / 1000;
        inputs[2] = this.xD1 / 1000;
        inputs[3] = this.yD1 / 1000;
        inputs[4] = this.pos.x / 1000;
        inputs[5] = this.pos.y / 1000;
        //inputs[6] = this.normalizedLife;





        tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const output = this.brain.predict(xs).dataSync();
            // sigmoid create values between 0 and 1, so mapped outputs: to create movement  - or + directions of x and y;        
            for (let i = 0; i < output.length; i++) {
                Moutput[i] = map(output[i], -1, 1, -3, 3);

            }

            let velVector = createVector(Moutput[0], Moutput[1]);
            this.update(velVector);
        });

    }

}
function bebis() {
    raiders.push(new raider('bebis'));
}
let cowbell;
let canvasis;
function setup() {
    
    
    popSlider = select('#popSlider');
    foodSizer= select('#foodSizer');
    learningchance=select('#learningchance');
    learningRate=select('#learningRate');
    bestBefore=select('#bestBefore');
    canvasis=createCanvas(1000, 1000);
    canvasis.parent('canvasid');
    
    
    angleMode(DEGREES);
    tf.setBackend('cpu');
    
    

    raiders.push(new raider());
    for (let index = 0; index < 1; index++) {
        chums.push(new chum());

    }
    




}


function die() {
    tf.tidy(() => {

        for (let i = raiders.length - 1; i >= 0; i--) {


            if (raiders[i].pos.x < 0 || raiders[i].pos.x > 1000 || raiders[i].pos.y < 0 || raiders[i].pos.y > 1000 || raiders[i].lifeSpan() > 400) {


                died.push(raiders[i]);
                raiders.splice(i, 1);


            }
        }
    });
}


function moveChum() {
    chums[0].pos.x=mouseX;
    chums[0].pos.y=mouseY;
    
}


let mouseFlag;
mouseFlag=0;
function mouseStart() {
   mouseFlag=1;
    
    
}
function mouseStop() {
    mouseFlag=0;
     
     
 }

    





function draw() {
    
    hamDistance=foodSizer.value()/2+10

    if (died.length > 0) {
        died[0].brain.dispose();
        died.splice(0, 1);
    }
    tf.tidy(() => {
        //esas seçim aşağıda kommentli olan fakat aslında ben sonda kalan 5 tanenin beynini kopyalamak istiyorum.o zaman
        //x yerine 5 yazıyorum 
        //x = round(random(raiders.length - 1));
        x = round(random(0, 4.49));
        while (raiders[x] == undefined) {
            x--;

        }
        randomBrain = raiders[x].brain.getWeights();
        background(150);
        die();
        t = frameCount;
        if (raiders.length < 5) {
            for (let index = 0; index < popSlider.value(); index++) {
                bebis();
            }
        }

        for (let i = 0; i < raiders.length; i++) {
            raiders[i].show();
            raiders[i].think();

            raiders[i].xD1 = raiders[i].pos.x - chums[0].pos.x;
            raiders[i].yD1 = raiders[i].pos.y - chums[0].pos.y;




            for (let index = 0; index < chums.length; index++) {

                if (t - chums[index].now1 > bestBefore.value()) {
                    chums.splice(i, 1);
                    chums.push(new chum());

                }


                if (p5.Vector.dist(raiders[i].pos, chums[index].pos) < hamDistance) {
                    raiders[i].now1 = t + 1000;

                    if (index == 0) {
                        /* chums[index].pos = createVector(random(800)+100,random(800)+100);
                        chums[index].now1 = t ; */
                    }



                }

            }






        }
    });
    if (mouseFlag==1){

        moveChum();
    }
    chums[0].show();
    canvasis.mousePressed(mouseStart); 
    canvasis.mouseReleased(mouseStop);
    
    
        
    
    






}