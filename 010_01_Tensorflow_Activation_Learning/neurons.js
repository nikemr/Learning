function bubbles(x,y){
	let r=10;
	ellipse(x,y,r);
}

function neural(){
	fill(0, 255, 0);
	let step=20;
	
	
	let layers=[inputLayerUnits,hiddenLayerUnits,hidden2LayerUnits,outputLayerUnits];
	let positions=[];
	for (let p=0; p<layers.length; p++) {
		let act=layers[p]
		for (let inp=0; inp<act; inp++){
			positions.push(new bubbles(step*(p+1),step*(inp+1)));
			//positions[p][inp]=[step*(p+1),step*(inp+1)];
			// ellipse(step*(p+1),30+(inp+1)*step,r);
		}
		inp=0;
		
		
    
	}
	
	//console.log(positions);
}
