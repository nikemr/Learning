function setup(){
    noCanvas();
    
    


    

    const values=[]
    for (let i = 0; i < 30; i++) {
        values[i]= random(0, 100);    
    }
    const shape=[2,5,3];

    const datam10=tf.tensor3d(values,shape,'int32');
    datam10.print();
    //not possible to get result from this console it just gives promise instead of tensor
    console.log(datam10.data());
    // but this way  it is possible
    console.log(datam10.dataSync());
    // get one of them
    console.log(datam10.get(0,0,0));
    // tensors are totally immutable so only way to manipulate them is crating variable out of them
    const datam10Var=tf.variable(datam10);
    console.log(datam10Var.dataSync());

}
























