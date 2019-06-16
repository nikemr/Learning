function brain() {
    return tf.tidy(() => {
        const input = tf.input({ shape: [6] });
        const hidden = tf.layers.dense({
            units: 20,
            activation: 'sigmoid'
        }).apply(input);
        const output = tf.layers.dense({
            units: 2,
            activation: 'sigmoid'
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
    this.pos= createVector(height / 2, width / 2);
    // this.y = height / 2;
    // this.x = width / 2;
    
    this.velocity = createVector(0, 0)
    this.accel=createVector(0, 0);
    this.heading=createVector(0, 0);
    
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
    this.show = function (yonum) {
        

        
        
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 20, 20);
    }
    this.lifeSpan = function () {        
        return t - now1;
    }

    this.update = function (velVector) {
        
        
        this.pos.add(velVector);
        
        
        //bunun burada olması güzel olmadı çizimi this.show altında olmalı.
        this.heading=velVector.heading();
        //console.log(this.heading);
        
        
        let yonum=p5.Vector.fromAngle(radians(this.heading),20);                
        push();
        translate(this.pos.x,this.pos.y);         
        line(0, 0, yonum.x, yonum.y)
        pop();
        
        

        
        



    }
    this.think = function () {
        let inputs = [];
        let Moutput=[];
        
        inputs[0] = this.velocity.x ;
        inputs[1] = this.velocity.y 
        inputs[2] = this.pos.y / 1000;
        inputs[3] = (alt - this.pos.y) / 1000;
        inputs[4] = this.pos.x / 1000;
        inputs[5] = (sag - this.pos.x) / 1000;
        //inputs[6]=map(this.heading,-180,180,0,1)
        //console.log(inputs[6]);

        tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const output = this.brain.predict(xs).dataSync();  
            // sigmoid create values between 0 and 1, so mapped outputs: to create movement  - or + directions of x and y;        
            for (let i = 0; i < output.length; i++) { 
                Moutput[i]=map(output[i],0,1,-1,+1);

            }

            let velVector= createVector(Moutput[0],Moutput[1]);
            
            
            
            
           
            
            //console.log('iki'+velVector);
            
            //console.log(Moutput);
            
            
            this.update(velVector);
        });

    }

}
function bebis() {
    raiders.push(new raider('bebis'));
}
function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    tf.setBackend('cpu');
    raiders.push(new raider());
}
var died=[];
function die() {
    tf.tidy(() => {
        
        for (let i = raiders.length - 1; i >= 0; i--) {


            if (raiders[i].pos.x < 0 || raiders[i].pos.x > 1000 || raiders[i].pos.y < 0 || raiders[i].pos.y > 1000 || raiders[i].lifeSpan() > 3000) {
                
                //console.log(raiders[i].brain); 
                died.push(raiders[i]);
                raiders.splice(i, 1);
                 
                //console.log(i+' öldü');
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
        background(150);
        die();
        t = frameCount;
        if (raiders.length < 50) {
            bebis();
        }
        for (let i = 0; i < raiders.length; i++) {
            raiders[i].show();
            raiders[i].think();
        }
    });
}