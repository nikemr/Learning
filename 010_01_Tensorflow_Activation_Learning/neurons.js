
function neural(){
	fill(0, 255, 0);
	let stepY=18;
	let stepX=25;
	
	// this must be automaticaly but for now it is manual (coming from brain())
	let layers=[inputLayerUnits,hiddenLayerUnits,hidden2LayerUnits,outputLayerUnits];
	this.positions=[];
	

	
	//Positions of the neurons for each layer, starting point changes at the beginning of each layer

	for (let p=0; p<layers.length; p++) {
		let act=layers[p];
		var startPoint;
		for (let inp=0; inp<act; inp++){
			startPoint=(height-stepY*act)/2;
			this.positions.push([stepX*(p+1),(stepY*(inp+1)+startPoint)]);
			
		}
						
		inp=0;
		
		
    
	}	
}
function bubbleShow(n) {

	//fittest raiders outputs

	let daireR = [raiders[0].firstLayerInputs, raiders[0].hidden2Activations, raiders[0].hidden1Activations, raiders[0].outputLayerActivations];
	var daireFlat = []
	for (let p = 0; p < daireR.length; p++) {
		for (let t = 0; t < daireR[p].length; t++) {

			daireFlat.push((daireR[p][t]) * 20);
			// n.positions[s].push(daireR[p][t]);


		}



	}
	//console.log(daireFlat);

	push();
	fill(3, 123, 255)
	for (let p = 0; p < n.positions.length; p++) {
		
		ellipse(n.positions[p][0], n.positions[p][1], daireFlat[p]);
		
	}
	pop();
}
