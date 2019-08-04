

    
    





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
//const model = tf.model({ inputs: input, outputs: output });

// https://stackoverflow.com/questions/51483285/print-all-layers-output
const model =tf.model({inputs: input, outputs: [hidden, hidden2,output]});

let inputs = [];

inputs[0] = .5
inputs[1] = .3
inputs[2] = .3
inputs[3] = .1
inputs[4] = .6
inputs[5] = .85

const xs = tf.tensor2d([inputs]);
//const outputing = model.predict(xs).dataSync();
const [firstLayer, secondLayer,thirdLayer] = model.predict(xs);
console.log(firstLayer.arraySync());
console.log(secondLayer.arraySync());
console.log(thirdLayer.arraySync());
firstLayer.print();
secondLayer.print();