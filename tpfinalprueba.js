
let juego;

function setup() {
  juego = new JuegoInteractivo();
}

function draw() {
  juego.dibujar();
}

function mouseMoved() {
  juego.manejarMouseMovido();
}

function mousePressed() {
  juego.manejarMousePresionado();
}
