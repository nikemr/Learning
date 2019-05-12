// Daniel Shiffman
// http://codingtra.in

// XOR Coding Challenge #106: XOR Problem with TensorFlow.js
// https://youtu.be/188B6k_F9jU

// Neural Network Library
// https://github.com/CodingTrain/Toy-Neural-Network-JS


let resolution = 25;
let cols;
let rows;
let xs
let train_xs=tf.tensor2d([
  [0,0],
  [1,0],
  [0,1],
  [1,1],
]);
let train_ys=tf.tensor2d([
  [0],
  [1],
  [1],
  [0],
]);

function setup() {
  createCanvas(400, 400);
  
  cols = width / resolution;
  rows = height / resolution;
  let inputs = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      inputs.push([x1, x2]);
      // console.log('col '+i+ ' '+ x1);
      // console.log('row '+j+' '+ x2);       
    }
    
  }
  xs=tf.tensor2d(inputs);

  
  //burada modeli oluşturuyoruz.
  model=tf.sequential();

  let hidden=tf.layers.dense({
    inputShape:[2],
    units: 4,
    activation: 'sigmoid'
  });

  let output=tf.layers.dense({    
    units: 1,
    activation: 'sigmoid'
  });
  model.add(hidden);
  model.add(output);

  
  const optimizer = tf.train.sgd(.4);
  //Compile ediyoruz.
  model.compile({optimizer: optimizer, loss: 'meanSquaredError'});
  //Belli bir aralıktan sonra çalıştırıyoruz.(100 milisec)
  setTimeout(train,100);

}
//modelimizi train etmek için kullandığımız fonksiyon.

function trainModel() {
  return model.fit(train_xs,train_ys,{

    shuffle:true,
    epochs:10 });
}

/*Fonksiyonu burada çağırıyoruz, sonucunu bekliyoruz ve loss logunu ekrana gönderiyoruz.
 Burayı videodan farklı yaptım çünkü videonu sonundaki sistemle yapınca time out yapsan da 
 o satıra gidiliyor ve timer sonuda fonksiyon tekrar çağırılıyor ve eş zamanlı çağırma yeni versiyor 
 Tensorflow da yasak ikiside index html de mevcut biri kommentli*/

async function train(){
  await trainModel().then(result =>console.log(result.history.loss[0]));
  //belki buraya direk olarak train(); bile yazılabilir çünkü bekliyor zaten
  //train();
  setTimeout(train,100);
}


function draw() {
  background(0);
  //burada trainin sonrasında çıkan ağırlıkları inputlar ile besleyip (kolun ve satırların değerleri ile (xs))
  // karşılığıda hangi değeri çıktı olarak aldığımızı görüyoruz.

  tf.tidy(() => {
  let ys= model.predict(xs)
  let y_values= ys.dataSync();
  let index=0
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      
      let br=y_values[index] * 255
      fill(br);
      rect(i * resolution, j * resolution, resolution, resolution);
      fill(255-br);
      textAlign(CENTER,CENTER);
      textSize(8);
      text(nf(y_values[index],1,2),i*resolution+resolution/2,j*resolution+resolution/2);
      index++;
    }
  } }); 
  

}