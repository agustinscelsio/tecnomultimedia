class JuegoInteractivo {
  constructor() {
    this.objuego = new juego1 () ;
    this.objuego2 = new juego2 () ;
    this.pantallas = new Array(18);
    this.fotos = new Array(18);
    this.minumero = 0;
    this.textoPantallas = new Array(18);
    this.botonX1;
    this.botonY1;
    this.botonX2;
    this.botonY2;
    this.anchoBoton = 100;
    this.altoBoton = 40;
    this.decisionTomada1 = false; // Flujo 1, pantalla 1-9
    this.decisionTomada2 = false; // Flujo 2, pantalla 1-13
    this.decisionTomada3 = false; // Flujo 3, pantalla 6-10
    this.nuevaSecuencia = false;
    this.mouseSobreBoton1 = false; // Variable para detectar si el mouse está sobre el botón 1
    this.mouseSobreBoton2 = false; // Variable para detectar si el mouse está sobre el botón 2
    this.inicializarJuego();
  }

  inicializarJuego() {
    createCanvas(600, 600);

    for (let i = 0; i < this.pantallas.length; i++) {
      this.pantallas[i] = 0;
    }

    for (let i = 0; i < this.fotos.length; i++) {
      this.fotos[i] = loadImage("data/fondo" + (i + 1) + ".png");
    }

    this.textoPantallas[0] = "salen 17 hombres\n en una aventura\n la tercera expedición\n a Marte.";
    this.textoPantallas[1] = "llegan a Marte pero\n hay una sorpresa,\n ven que es muy parecido \n al planeta tierra.";
    this.textoPantallas[2] = "los hombres miran desde\n adentro de la nave asustados, \n ¡no pueden creerlo!\n está a la vista un pueblo\n que ya es conocido para ellos";
    this.textoPantallas[3] = "El capitán de la nave\n ,junto a algunos pocos subordinados,\n bajan de la nave";
    this.textoPantallas[4] = "Se encuentran con una señora que \n les asegura que están en el planeta tierra";
    this.textoPantallas[5] = "Lustig se encuentra con\n sus abuelos y toman el té";
    this.textoPantallas[6] = "baja toda la tripulación\n de la nave y se encuentran con\n sus familiares, gozan de \n momentos lindos en las casas de sus familias";
    this.textoPantallas[7] = "el capitán se encuentra con su\n hermano y deja las preocupaciones\n de lado, se encuentra realmente feliz y se siente\n como un niño en casa\n se relaja y se acuesta en su cama...";
    this.textoPantallas[8] = "De pronto comienza a tener pensamientos\n macabros ¿y si son extraterrestres que se\n metieron en su mente y les mostraron\n lo que más quería ver? \n ahora se encontraban, él y toda su tripulación\n completamente indefensos. \n El capitán intenta escapar ";
    this.textoPantallas[9] = "Pero nunca llega a la puerta";
    this.textoPantallas[10] = "un tripulante no creía que esa era\n su familia, vió morir a sus padres con sus\n propios ojos y desde que los vió en vida\n estaba aterrorizado. Sacó su arma\n y disparó al aire para ver como reaccionaban\n";
    this.textoPantallas[11] = "intentaron convencerlo diciéndole \n que eran su familia pero él no les creía de ninguna manera\n terminó disparándole a su supuesto padre.\n Pero cuando miró su mano no había un arma,\n nunca la hubo.";
    this.textoPantallas[12] = "funeral";
    this.textoPantallas[13] = "llegan a marte! ";
    this.textoPantallas[14] = "comienzan a explorar";
    this.textoPantallas[15] = "de repente el ambiente se vuelve muy pesado,\n aparece un extraterrestre que los mira\n de pies a cabeza. el extraterrestre no abrió\n la boca pero todos escucharon \n en sus mentes sus palabras";
    this.textoPantallas[16] = "-no los hemos atacado antes porque\n necesitábamos su nave,\n mal momento para venir, está por explotar\n el planeta,\n soy el sacrificio, debo mantenerlos aquí.\n Después de eso no escucharon más nada.";
    this.textoPantallas[17] = "Créditos\nProgramado por [Tu nombre]";

    this.botonX1 = width - this.anchoBoton * 2;
    this.botonY1 = height - this.altoBoton;
    this.botonX2 = 20;
    this.botonY2 = 20;
    this.jugar1 = false
      this.jugar2=false
  }

  dibujar() {

    background(0);
    this.imagenesytexto();

    if (this.jugar1==true) {
      createCanvas(600, 600)
        
       
        
        this.objuego.dibujar()
        
    }

    if (this.jugar2==true) {
      createCanvas(600, 400)
        this.objuego2.dibujar()
    }
  }

  imagenesytexto() {
    if (this.minumero >= 0 && this.minumero <= 16) {
      image(this.fotos[this.minumero], 0, 0, 600, 600);
      fill(137, 242, 255, 100);
      noStroke();
      rect(150, 200, 300, 200);
      fill(0);
      textSize(15);
      text(this.textoPantallas[this.minumero], 300, 300);

      if ((this.minumero == 6 || this.minumero == 0) && !this.decisionTomada1) {
        this.boton("Avanzar", this.botonX1, this.botonY1, this.anchoBoton, this.altoBoton, this.mouseSobreBoton1);
        this.boton("Otro camino", this.botonX2, this.botonY2, this.anchoBoton, this.altoBoton, this.mouseSobreBoton2);
      } else if (this.minumero == 9 && (!this.decisionTomada1 || !this.decisionTomada2) && !this.nuevaSecuencia) {
        this.boton("Reiniciar", this.botonX1, this.botonY1, this.anchoBoton, this.altoBoton, this.mouseSobreBoton1);
      } else if ((this.minumero == 12 || this.minumero == 16) && this.nuevaSecuencia) {
        this.boton("Reiniciar", this.botonX2, this.botonY2, this.anchoBoton, this.altoBoton, this.mouseSobreBoton2);
      } else {
        this.boton("Avanzar", this.botonX1, this.botonY1, this.anchoBoton, this.altoBoton, this.mouseSobreBoton1);
      }
    } else if (this.minumero == 17) {
      image(this.fotos[17], 0, 0, 600, 600);
      this.boton("Volver al inicio", this.botonX2, this.botonY2, this.anchoBoton, this.altoBoton, this.mouseSobreBoton2);
    }
  }

  boton(etiqueta, x, y, ancho, alto, mouseSobreBoton) {
    if (mouseSobreBoton) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    rect(x, y, ancho, alto);

    fill(0);
    textAlign(CENTER, CENTER);
    text(etiqueta, x + ancho / 2, y + alto / 2);
  }

  reiniciar() {
    
    this.minumero = 17;
    this.decisionTomada1 = false;
    this.decisionTomada2 = false;
    this.decisionTomada3 = false;
    this.nuevaSecuencia = false;
    this.jugar1=false
    this.jugar2=false
    this.objuego.reiniciarjuego()
    this.objuego2.reiniciarJuego()
    resizeCanvas(600,600)
  }

  avanzar() {
    this.minumero++;
    if (this.minumero==0) {
      this.jugar1=false
        this.jugar2=false
    } else if (this.minumero==12) {
      this.jugar1=true
    } else if (this.minumero==16) {
      this.jugar2=true
    }else{
    this.jugar1=false
    this.jugar2=false
    
    }
    /* if (this.minumero >= this.fotos.length) {
     this.minumero = this.fotos.length - 1;
     }*/
  }

  manejarMouseMovido() {
    if (mouseX >= this.botonX1 && mouseX <= this.botonX1 + this.anchoBoton && mouseY >= this.botonY1 && mouseY <= this.botonY1 + this.altoBoton) {
      this.mouseSobreBoton1 = true;
    } else {
      this.mouseSobreBoton1 = false;
    }

    if (mouseX >= this.botonX2 && mouseX <= this.botonX2 + this.anchoBoton && mouseY >= this.botonY2 && mouseY <= this.botonY2 + this.altoBoton) {
      this.mouseSobreBoton2 = true;
    } else {
      this.mouseSobreBoton2 = false;
    }
  }

  manejarMousePresionado() {
    if (this.minumero == 9) {
      if ((!this.decisionTomada1 && !this.decisionTomada2) || this.nuevaSecuencia) {
        if (mouseX >= this.botonX1 && mouseX <= this.botonX1 + this.anchoBoton && mouseY >= this.botonY1 && mouseY <= this.botonY1 + this.altoBoton) {
          this.reiniciar();
        }
      }
    } else if ((this.minumero == 12 || this.minumero == 16) && this.nuevaSecuencia) {
      if (mouseX >= this.botonX2 && mouseX <= this.botonX2 + this.anchoBoton && mouseY >= this.botonY2 && mouseY <= this.botonY2 + this.altoBoton) {
       this.jugar1=false
       this.jugar2=false
        this.reiniciar();
      }
    } else if (this.minumero == 17) {
      if (mouseX >= this.botonX2 && mouseX <= this.botonX2 + this.anchoBoton && mouseY >= this.botonY2 && mouseY <= this.botonY2 + this.altoBoton) {
        this.minumero = 0;
        this.decisionTomada1 = false;
        this.decisionTomada2 = false;
        this.decisionTomada3 = false;
        this.nuevaSecuencia = false;
      }
    } else {
      if (mouseX >= this.botonX1 && mouseX <= this.botonX1 + this.anchoBoton && mouseY >= this.botonY1 && mouseY <= this.botonY1 + this.altoBoton) {
        this.avanzar();
      } else if (this.minumero == 6 && !this.decisionTomada3) {
        if (mouseX >= this.botonX2 && mouseX <= this.botonX2 + this.anchoBoton && mouseY >= this.botonY2 && mouseY <= this.botonY2 + this.altoBoton) {
          this.decisionTomada3 = true;
          this.nuevaSecuencia = true;
          this.minumero = 10;
        }
      } else if (this.minumero == 0 && !this.decisionTomada1) {
        if (mouseX >= this.botonX2 && mouseX <= this.botonX2 + this.anchoBoton && mouseY >= this.botonY2 && mouseY <= this.botonY2 + this.altoBoton) {
          this.decisionTomada1 = true;
          this.nuevaSecuencia = true;
          this.minumero = 13;
        }
      }
    }
  }
}
