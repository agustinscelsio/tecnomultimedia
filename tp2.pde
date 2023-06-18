//Agustín Scelsio, tp2 comisión 1
// https://youtu.be/ByaDJf204wE


//INSTRUCCIONES
/* 
MANTENER PRESIONADO EL MOUSE Y MOVERLO HACIA ARRIBA O HACIA LOS COSTADOS DE LA ILUSIÓN DE LA DERECHA PARA VARIAR LA CANTIDAD DE LINEAS Y EL COLOR DEL FONDO. ( evento mouseDragged ) 
UTILIZAR LA LETRA "r" PARA REINICIAR LOS VALORES INICIALES */




int cant = 10;
PImage ilusion;
color colorfondo;
boolean lineasPares = true;

void setup() {
  size(800, 400);
  ilusion = loadImage("ILUSIONOPTICA.jpg");
  colorfondo = color(0);
}

void draw() {
  background(colorfondo);
  image(ilusion, 0, 0, 400, 400);

  // Primer ciclo for (superior izquierdo)
  for (int i = 0; i < cant / 2; i++) {
    float y = i * (height / (cant / 2)) + 5;
    float comienzoLinea = width / 2;
    float terminaLinea = width * 3 / 4;
    lineasHorizontales(comienzoLinea, terminaLinea, y, lineasPares);
  }

  // Segundo ciclo for (superior derecho)
  for (int i = 0; i < cant / 2; i++) {
    float y = i * (height / (cant / 2)) + 5;
    float comienzoLinea = width * 3 / 4;
    float terminaLinea = width;
    lineasHorizontales(comienzoLinea, terminaLinea, y, lineasPares);
  }

  // Tercer ciclo for (inferior izquierdo)
  for (int i = 0; i < cant / 2; i++) {
    float y = (i + cant / 2) * (height / (cant / 2)) + 5;
    float comienzoLinea = width / 2;
    float terminaLinea = width * 3 / 4;
    lineasHorizontales(comienzoLinea, terminaLinea, y, lineasPares);
  }

  // Cuarto ciclo for (inferior derecho)
  for (int i = 0; i < cant / 4; i++) {
    float y = (i + cant / 2) * (height / (cant / 2)) + 5;
    float comienzoLinea = width * 3 / 4;
    float terminaLinea = width;
    lineasHorizontales(comienzoLinea, terminaLinea, y, lineasPares);
  }
}

void lineasHorizontales(float comienzoLinea, float terminaLinea, float y, boolean lineasPares) {
  float distanciacentro = dist(y, width / 2, 210, height / 2 + 180);
  float alturacurva = map(distanciacentro, 0, height / 2 - 80, 15, 65);

  float comienzacurva = comienzoLinea + alturacurva / 2 + 10;
  float terminacurva = terminaLinea - alturacurva / 2 - 10;

  stroke(255);
  strokeWeight(8);

  if (y < height / 2) {
    line(comienzoLinea, y, comienzacurva, y);
    line(terminaLinea, y, terminacurva, y);
    noFill();
    stroke(lineasPares ? 255 : 0);
    float curvadelcentro = (comienzacurva + terminacurva) / 2;
    float anchocurva = terminacurva - comienzacurva;
    float empieza = PI;
    float termina = TWO_PI;
    arc(curvadelcentro, y, anchocurva, alturacurva + 25, empieza, termina);
  } else {
    line(comienzoLinea, y, comienzacurva, y);
    line(terminaLinea, y, terminacurva, y);
    noFill();
    stroke(lineasPares ? 255 : 0);
    float curvadelcentro = (comienzacurva + terminacurva) / 2;
    float anchocurva = terminacurva - comienzacurva;
    float empieza = PI;
    float termina = TWO_PI;
    arc(curvadelcentro, y, anchocurva, alturacurva + 25, empieza, termina);
  }
}

void mouseDragged() {
  if (mouseX > width / 2) {
    if (mouseY > height / 2 && cant < height / 1) {
      cant++;
    } else if (mouseY < height / 2 && cant > 1) {
      cant--;
    }

    float color1 = map(mouseX, 0, width, 0, 40);
    float color2 = map(mouseY, 0, height, 0, 240);
    colorfondo = color(color1, 100, color2);

    // Determinar si las líneas son pares o impares durante el mouseDragged
    lineasPares = (mouseY <= height / 2);
  }
}

boolean getLineasPares() {
  return lineasPares;
}

void keyPressed() {
  if (key == 'r') {
    cant = 10;
    colorfondo = color(0);
    lineasPares = true;
  }
}
