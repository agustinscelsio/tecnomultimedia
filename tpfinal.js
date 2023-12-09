// tp final tecno comisión 1
//Agustín Scelsio legajo 92832/1
// Tomás Vivanco



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

function keyPressed() {
  juego.objuego.teclapres(keyCode)
  juego.objuego2.tepres(keyCode)
}
