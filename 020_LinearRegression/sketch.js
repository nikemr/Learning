let x_vals = [];
let y_vals = [];
let m,b;
const learningRate = 0.1;
const optimizer = tf.train.sgd(learningRate);
function setup() {
    createCanvas(400, 400);
    background(0);
    m=tf.variable(tf.scalar(random(1)));
    b=tf.variable(tf.scalar(random(1)));

}
function predict(x) {
    //x tensora çevriliyor.
    const xs = tf.tensor1d(x);
    // y = mx + b;
    const ys = xs.mul(m).add(b);
    return ys;
}
function mousePressed(){
    /* burada noktaların koordinatlarını tensorFlow'da kullanacağımız 0 ve 1 arasına oranlı
     şekilde map'liyoruz  */
    let x =map(mouseX, 0, width, 0, 1);
    let y =map(mouseY, 0, height, 1, 0);
    x_vals.push(x);
    y_vals.push(y);  
  
    //console.log("bu b: " + b.dataSync(),"bu da m: "+m.dataSync());

    

}
//burada sadece x kullanılarak; m ve b'yi ise weight olarak kullanarak "y" tahmin ediliyor.
function loss(pred, labels) {
    return pred.sub(labels).square().mean();
}
function draw(){
    background(0);
    stroke(255);
    strokeWeight(8);
        /* burada x_vals ve y_vals değerleri ekrana eşleniyor tüm bu hikaye bizim değerlerimizin
        0 ve 1 arasında olması. halbuki noktaları koymak içim. Gerçek piksel degerleri gerekiyor.
         Ayrıca p5'ın 0,0 noktası sol üst köşede fakat örnek klasik koordinat sistemi üzerinde
         çalışmak üzere yapılmış */
    for (let i=0; i<x_vals.length; i++){
        let px= map(x_vals[i], 0, 1, 0, width);
        let py= map(y_vals[i], 0, 1,height, 0);
        point(px,py);
    }
    tf.tidy(() => {
        if (x_vals.length > 0) {
          // optimizer'ın çalışması için değişkenlerin tensor olması gerekli ilk satırda bunu yapıyoruz.  
          const ys = tf.tensor1d(y_vals);

          /*  burada ise m ve b değerlerini değiştirerek loss fonksiyonunu küçültmeye çalışıyoruz.
           m ve b açıkça görünmüyor ancak oradalar
           Coding Challenge #104: Linear Regression with TensorFlow.js videosunda yaklaşık 
           23:20 de bu konu anlatılıyor.
            "minimize (f, returnCost?, varList?) " aslında böyle olması gerekli ancak var list
            verilmezse tüm variable'lar optimize edilmeye çalışılıyor. */          
          optimizer.minimize(() => loss(predict(x_vals), ys));
        }
    });
    /* burası ayırıcı çizginin uç noktalarının x koordinatları x ler sabit olduğundan ekranın solu ve sağı için o v
    bir değerleri kullanılıyor.*/
    const lineX = [0, 1];
    /* predict ile yler yaratılıyor */
    const ys = tf.tidy(() => predict(lineX));
    /* y ler dataSync ile getiriliyor çünkü bu işlem biraz uzun sürüyor.
     */
    let lineY = ys.dataSync();
    ys.dispose();

    let x1 = map(lineX[0], 0, 1, 0, width);
    let x2 = map(lineX[1], 0, 1, 0, width);

    let y1 = map(lineY[0], 0, 1, height, 0);
    let y2 = map(lineY[1], 0, 1, height, 0);

    strokeWeight(2);
    line(x1, y1, x2, y2);
    console.log(tf.memory().numTensors);
    //noLoop();
}   