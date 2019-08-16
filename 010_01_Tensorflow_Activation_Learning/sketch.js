let raiderZero;
let generation;
var yon;
var ust = 5;
var alt = 1000;
var sol = 5;
var sag = 1000;
var raiders = [];
var t = 0;
var beb = '';
let x;
var randomBrain;
let chums = [];
var died = [];
let miniPop;
let popSlider;
let foodSizer;
let hamDistance;
let learningchance;
let learningRate;
let gen;
let canvasis;
let mouseFlag=0;
let inputLayerUnits;
let hiddenLayerUnits;
let hidden2LayerUnits;
let outputLayerUnits;
let neural1;

function setup() {
    generation=1;
    miniPop=select('#miniPop');    
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

function mouseStart() {
   mouseFlag=1;
}
function mouseStop() {
    mouseFlag=0;
}
 
function draw() {
	
    hamDistance=foodSizer.value()/2+10;
    
    if (died.length > 0) {
        died[0].brain.dispose();
        died.splice(0, 1);
    }
    tf.tidy(() => {
        //esas seçim aşağıda kommentli olan fakat aslında ben sonda kalan 5 tanenin beynini kopyalamak istiyorum.o zaman
              
        //x = round(random(0, 4.49));
        x = round(random(0, miniPop.value()-0.51));
        while (raiders[x] == undefined) {
            x--;
        }
        randomBrain = raiders[x].brain.getWeights();
        background(150);
        die();
        t = frameCount;
        if (raiders.length < miniPop.value()) {
            for (let index = 0; index < popSlider.value(); index++) {
                bebis();
                ;
            }
            generation++
            // gen=generation-1 is for a correction "raiders.length < miniPop.value()) creates a problem at the first run and pushes generation ahead of true number"
            gen=generation-1
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
    
    push();
    
    fill(255,0,0);
    textSize(12);
    textStyle(BOLDITALIC);
    textFont('Helvetica');
    text("GEN: "+gen, 15, 40);
    
    pop();
    if (mouseFlag==1){

        moveChum();
    }
    raiderZero=raiders[0].brain;
    neural();
    chums[0].show();
    canvasis.mousePressed(mouseStart); 
    canvasis.mouseReleased(mouseStop);

}