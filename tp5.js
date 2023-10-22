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
