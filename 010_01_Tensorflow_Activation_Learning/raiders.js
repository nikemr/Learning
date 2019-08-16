function raider(beb) {

    this.now1 = t;
    this.pos = createVector(random(700) + 100, random(700) + 100);
    this.velocity = createVector(0, 0)
    this.accel = createVector(0, 0);
    this.heading = createVector(0, 0);
    this.generation=generation;
    this.brain = new brain(beb);    
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

        fill(255, 151, 151);
        // ana kraliçe
        if (raiders.indexOf(this)===0){
            fill(255, 0, 0);
        }
        
        ellipse(this.pos.x, this.pos.y, 20, 20);

        this.yonum = p5.Vector.fromAngle(radians(this.heading), 20);
        push();
        translate(this.pos.x, this.pos.y);
        
        line(0, 0, this.yonum.x, this.yonum.y);
        
        fill(0, 102, 153);
        textSize(9);
        text(this.life, 15, 15)
        fill(255, 0, 0);
        text(this.generation, -15, -15);
        fill(0, 0, 0);
        text(raiders.indexOf(this), -15, -25)

        //text(round(this.heading), -15, -15);
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
            const [firstLayer, secondLayer,thirdLayer] = this.brain.predict(xs);
            //const output = this.brain.predict(xs).dataSync();
            const output = thirdLayer.dataSync();
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