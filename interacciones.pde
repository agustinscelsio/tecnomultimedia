void mouseMoved() {
  if (mouseX >= botonX1 && mouseX <= botonX1 + anchoBoton && mouseY >= botonY1 && mouseY <= botonY1 + altoBoton) {
    mouseSobreBoton1 = true;
  } else {
    mouseSobreBoton1 = false;
  }
  
  if (mouseX >= botonX2 && mouseX <= botonX2 + anchoBoton && mouseY >= botonY2 && mouseY <= botonY2 + altoBoton) {
    mouseSobreBoton2 = true;
  } else {
    mouseSobreBoton2 = false;
  }
}

void mousePressed() {
  if (minumero == 9) {
    if ((!decisionTomada1 && !decisionTomada2) || nuevaSecuencia) {
      if (mouseX >= botonX1 && mouseX <= botonX1 + anchoBoton && mouseY >= botonY1 && mouseY <= botonY1 + altoBoton) {
        reiniciar();
      }
    }
  } else if ((minumero == 12 || minumero == 16) && nuevaSecuencia) {
    if (mouseX >= botonX2 && mouseX <= botonX2 + anchoBoton && mouseY >= botonY2 && mouseY <= botonY2 + altoBoton) {
      reiniciar();
    }
  } else if (minumero == 17) {
    if (mouseX >= botonX2 && mouseX <= botonX2 + anchoBoton && mouseY >= botonY2 && mouseY <= botonY2 + altoBoton) {
      minumero = 0;
      decisionTomada1 = false;
      decisionTomada2 = false;
      decisionTomada3 = false;
      nuevaSecuencia = false;
    }
  } else {
    if (mouseX >= botonX1 && mouseX <= botonX1 + anchoBoton && mouseY >= botonY1 && mouseY <= botonY1 + altoBoton) {
      avanzar();
    } else if (minumero == 6 && !decisionTomada3) {
      if (mouseX >= botonX2 && mouseX <= botonX2 + anchoBoton && mouseY >= botonY2 && mouseY <= botonY2 + altoBoton) {
        decisionTomada3 = true;
        nuevaSecuencia = true;
        minumero = 10; // Cambiar a la pantalla 10
      }
    } else if (minumero == 0 && !decisionTomada1) {
      if (mouseX >= botonX2 && mouseX <= botonX2 + anchoBoton && mouseY >= botonY2 && mouseY <= botonY2 + altoBoton) {
        decisionTomada1 = true;
        nuevaSecuencia = true;
        minumero = 13; // Cambiar a la pantalla 13
      }
    }
  }
}
