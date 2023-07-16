void boton(String etiqueta, int x, int y, int ancho, int alto, boolean mouseSobreBoton) {
  if (mouseSobreBoton) {
    fill(255, 255, 0); // Color amarillo si el mouse está sobre el botón
  } else {
    fill(255);
  }
  rect(x, y, ancho, alto);

  fill(0);
  textAlign(CENTER, CENTER);
  text(etiqueta, x + ancho / 2, y + alto / 2);
}

void imagenesytexto() {
  if (minumero >= 0 && minumero <= 16) {
    image(fotos[minumero], 0, 0, 600, 600);
    fill(137, 242, 255, 100);
    noStroke();
    rect(150, 200, 300, 200);
    fill(0);
    textSize(15);
    text(textoPantallas[minumero], 300, 300);

    if ((minumero == 6 || minumero == 0) && !decisionTomada1) {
      boton("Avanzar", botonX1, botonY1, anchoBoton, altoBoton, mouseSobreBoton1);
      boton("Otro camino", botonX2, botonY2, anchoBoton, altoBoton, mouseSobreBoton2);
    } else if (minumero == 9 && (!decisionTomada1 || !decisionTomada2) && !nuevaSecuencia) {
      boton("Reiniciar", botonX1, botonY1, anchoBoton, altoBoton, mouseSobreBoton1);
    } else if ((minumero == 12 || minumero == 16) && nuevaSecuencia) {
      boton("Reiniciar", botonX2, botonY2, anchoBoton, altoBoton, mouseSobreBoton2);
    } else {
      boton("Avanzar", botonX1, botonY1, anchoBoton, altoBoton, mouseSobreBoton1);
    }
  } else if (minumero == 17) {
    image(fotos[17], 0, 0, 600, 600);
    boton("Volver al inicio", botonX2, botonY2, anchoBoton, altoBoton, mouseSobreBoton2);
  }
}

void reiniciar() {
  minumero = 17;
  decisionTomada1 = false;
  decisionTomada2 = false;
  decisionTomada3 = false;
  nuevaSecuencia = false;
}

void avanzar() {
  minumero++;
  if (minumero >= fotos.length) {
    minumero = fotos.length - 1;
  }
}
