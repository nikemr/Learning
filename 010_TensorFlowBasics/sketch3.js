function setup(){
    noCanvas();  

    const values=[]
    for (let i = 0; i < 15; i++) {
        values[i]= random(0, 100);    
    }
    const shapeA=[5,3];
    const shapeB=[3,5];
    //matrix multiplication 
    const a=tf.tensor2d(values,shapeA,'int32');
    const b=tf.tensor2d(values,shapeB,'int32');
    const c=a.matMul(b);
    // a.print();
    // b.print();
    c.print();
    

}
























