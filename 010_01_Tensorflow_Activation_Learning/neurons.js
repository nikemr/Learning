function bubbles(x,y){
	let r=10;
	ellipse(x,y,r);
}

function neural(){
	fill(0, 255, 0);
	let step=20;
	
	
	let layers=[inputLayerUnits,hiddenLayerUnits,hidden2LayerUnits,outputLayerUnits];
	this.positions=[];
	for (let p=0; p<layers.length; p++) {
		let act=layers[p]
		for (let inp=0; inp<act; inp++){
			this.positions.push([step*(p+1),step*(inp+1)]);
			
		}
		inp=0;
		
		
    
	}
	
	
	//console.log(positions);
}
function bubbleShow(n){
	for (let p=0; p<n.positions.length; p++){	
	ellipse(n.positions[p][0],n.positions[p][1], 10);
}
}