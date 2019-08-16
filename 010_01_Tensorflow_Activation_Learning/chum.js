function chum() {
    this.now1 = t;
    this.pos = createVector(random(750) + 200, random(750) + 200);
    
    this.show = function () {
        this.life = t - this.now1;
        
        fill(0, 255, 0); 
        textSize(9);
        text(this.life, 15, 15)
        
        ellipse(this.pos.x, this.pos.y, foodSizer.value(), foodSizer.value());
    }
    this.life = t - this.now1;

}

function moveChum() {
    chums[0].pos.x=mouseX;
    chums[0].pos.y=mouseY;
    
}