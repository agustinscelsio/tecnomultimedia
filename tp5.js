//Agustín Scelsio, legajo 92832/1
// tp5 tecnología multimedial commisión 1

let juego;

function setup() {
  juego = new Juego();
 createCanvas (600,400) ;
}

function draw() {
  juego.draw();
}

function keyPressed() {
  juego.keyPressed();
}
