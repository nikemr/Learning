function setup(){
    noCanvas();
    //this is how to create and see a tensor   
    //this is get tensor to console by printing 
    console.log("by print()..............");
    const datam = tf.tensor([1, 2, 3, 4]);
    datam.print();
    //if you directly console
    console.log("by direct...............");
    console.log(tf.tensor([1, 2, 3, 4]));
    //if you directly console wit some text , you'll get this
    console.log("with some text..........");
    console.log("some text /"+datam);   
    //or toString can be used
    console.log("toString..........");
    console.log(datam.toString());  


    //shape

    console.log("shape ..............");
    const datamShape00 = tf.tensor([1, 2, 3, 4],[2,2]);
    datamShape00.print();
    const datamShape10 = tf.tensor([1, 2, 3, 4,54, 5, 55, 7 ],[2,4]);
    datamShape10.print();
    const datamShape11 = tf.tensor([1, 2, 3, 4,54, 5, 55, 7 ],[2,2,2]);
    datamShape11.print();
    
    const datamShape12 = tf.tensor([1, 2, 3, 4,54, 5, 55.9999999999999999, 7 ],[2,2,2],"int32");
    datamShape12.print();

    const datamShape13 = tf.tensor3d([1, 2, 3, 4,54, 5, 55, 7 ],[2,2,2]);
    datamShape13.print();

    //some sample to create datam

    const values=[]
    for (let i = 0; i < 15; i++) {
        values[i]= random(0, 100);    
    }
    const shape=[5,3];

    const datam10=tf.tensor(values,shape);
    datam10.print();

    const num=tf.scalar(4);
    num.print();


}





























// jhgfjjgjgjghjgjgjgjgjg