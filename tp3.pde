// Agustín Scelsio
// tp3
// "La tercera expedición" Crónicas Marcianas de Ray Bradbury 
// link al video de yotube: https://youtu.be/bqAu07EKgik
// en el video y antes de entregar tenía el código dividido en 3 pestañas pero a la hora de entregar lo junté todo porque me dificultaba la entrega en github. 




int[] pantallas = new int[18];
PImage[] fotos = new PImage[18];
int minumero = 0;
String[] textoPantallas = new String[18];
int botonX1;
int botonY1;
int botonX2;
int botonY2;
int anchoBoton = 100;
int altoBoton = 40;
boolean decisionTomada1 = false; // Flujo 1, pantalla 1-9
boolean decisionTomada2 = false; // Flujo 2, pantalla 1-13
boolean decisionTomada3 = false; // Flujo 3, pantalla 6-10
boolean nuevaSecuencia = false;
boolean mouseSobreBoton1 = false; // Variable para detectar si el mouse está sobre el botón 1
boolean mouseSobreBoton2 = false; // Variable para detectar si el mouse está sobre el botón 2





void setup() {
  size(600, 600);

  for (int i = 0; i < pantallas.length; i++) {
    pantallas[i] = 0;
  }
 
  for (int i = 0; i < fotos.length; i++) {                // todas las imágenes
    fotos[i] = loadImage("fondo" + (i + 1) + ".png");
  }

  textoPantallas[0] = "salen 17 hombres\n en una aventura;\n la tercera expedición\n a Marte.";
  textoPantallas[1] = "llegan a Marte pero\n hay una sorpresa,\n ven que es muy parecido \n al planeta tierra.";
  textoPantallas[2] = "los hombres miran desde\n adentro de la nave asustados, \n ¡no pueden creerlo!\n está a la vista un pueblo\n que ya es conocido para ellos";
  textoPantallas[3] = "El capitán de la nave\n ,junto a algunos pocos subordinados,\n bajan de la nave";
  textoPantallas[4] = "Se encuentran con una señora que \n les asegura que están en el planeta tierra";
  textoPantallas[5] = "Lustig se encuentra con\n sus abuelos y toman el té";
  textoPantallas[6] = "baja toda la tripulación\n de la nave y se encuentran con\n sus familiares, gozan de \n momentos lindos en las casas de sus familias";
  textoPantallas[7] = "el capitán se encuentra con su\n hermano y deja las preocupaciones\n de lado, se encuentra realmente feliz y se siente\n como un niño en casa\n se relaja y se acuesta en su cama...";
  textoPantallas[8] = "De pronto comienza a tener pensamientos\n macabros ¿y si son extraterrestres que se\n metieron en su mente y les mostraron\n lo que más quería ver? \n ahora se encontraban, él y toda su tripulación\n completamente indefensos. \n El capitán intenta escapar ";
  textoPantallas[9] = "Pero nunca llega a la puerta";
  textoPantallas[10] = "un tripulante no creía que\n esa era su familia, vió morir a sus padres con sus propios ojos \n y desde que los vió estaba aterrorizado\n sacó su arma y disparó al aire para ver como reaccionaban\n";
  textoPantallas[11] = "intentaron convencerlo diciéndole \n que eran su familia pero él no les creía de ninguna manera\n terminó disparándole a su supuesto padre.\n Pero cuando miró su mano no había un arma,\n nunca la hubo.";
  textoPantallas[12] = "funeral";
  textoPantallas[13] = "llegan a marte! ";
  textoPantallas[14] = "comienzan a explorar";
  textoPantallas[15] = "de repente el ambiente se vuelve muy pesado,\n aparece un extraterrestre que los mira\n de pies a cabeza. el extraterrestre no abrió\n la boca pero todos escucharon \n en sus mentes sus palabras";
  textoPantallas[16] = "-no los hemos atacado antes porque\n necesitábamos su nave,\n mal momento para venir, está por explotar\n el planeta,\n soy el sacrificio, debo mantenerlos aquí.\n Después de eso no escucharon más nada.";
  textoPantallas[17] = "Créditos\nProgramado por [Tu nombre]";

  botonX1 = width - anchoBoton * 2;
  botonY1 = height - altoBoton;
  botonX2 = 20;
  botonY2 = 20;
}

void draw() {
  background(0);
  imagenesytexto();
}

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
