// Create a rank-2 tensor (matrix) matrix tensor from a multidimensional array.
const a = tf.tensor([[1, 2], [3, 4]]);
console.log('shape:', a.shape);

a.print();

// Or you can create a tensor from a flat array and specify a shape.
const shape = [2, 2];
const b = tf.tensor([1, 2, 3, 4], shape);
console.log('shape:', b.shape);
b.print();

const aa = tf.tensor([[1, 2], [3, 4]]);
console.log('aa shape:', aa.shape);
aa.print();

const bb = aa.reshape([4, 1]);
console.log('bb shape:', bb.shape);
bb.print();

console.log('Asynchronous method: High Performance');
a.array().then(array => console.log('a.array:',array));
a.data().then(data => console.log('a.data:',data));

console.log('Synchronous method: easier To Use');

console.log(a.arraySync());
// Returns the flattened data that backs the tensor.
console.log(a.dataSync());

console.log(tf.getBackend());
const y = tf.tidy(() => {
    const result = a.square().log().neg();
    return result;
});
console.log('memory:',tf.memory());

  