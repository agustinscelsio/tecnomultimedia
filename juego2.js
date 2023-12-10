class Bala {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidad = 5;
  }

  mostrar() {
    fill(0);
    ellipse(this.x, this.y, 5, 10);
  }

  mover() {
    this.y -= this.velocidad;
  }

  colision(enemigo) {
    let d = dist(this.x, this.y, enemigo.x, enemigo.y);
    return (d < 15);
  }

  eliminar() {
    // Elimina la bala cuando colisiona con un enemigo o sale de la pantalla
    this.x = -1000;
    this.y = -1000;
  }
}
class Enemigo {
  constructor() {
    const margen = 150;
    this.x = random(margen, width - margen);
    this.y = -50;
    this.tiempoCreacion = millis();
    this.ultimoCambio = millis();
    this.cambioIntervalo = 1000; // Cambia cada segundo
    this.esMarciano = true; // para saber si el enemigo es un marciano
    this.vida = 1;
    this.puntaje = 0;
  }



  mostrar() {
    if (this.esMarciano) {
      this.dibujarMarciano();
    } else {
      this.dibujarHumano();
    }
  }

  mover() {
    this.y += 1.5; // Velocidad de movimiento del enemigo
  }

  cambiarColor() {
    if (millis() - this.ultimoCambio >= this.cambioIntervalo) {

      this.ultimoCambio = millis();
      this.esMarciano = !this.esMarciano; // Cambia la forma junto con el color // al final lo  cambie
    }
  }

  cambiarApariencia() {
    if (millis() - this.ultimoCambio >= this.cambioIntervalo) {
      this.cambiarColor();
    }
  }

  colision(jugador) {
    let d = dist(this.x, this.y, jugador.x, jugador.y);
    return (d < 25);
  }

  sumarPunto() {
    if (this.enemigoColor === color(0, 255, 0)) {
      this.puntaje++;
    } else {
      this.puntaje--;
    }
  }

  eliminar() {
    this.vida = 0;
  }

  dibujarMarciano() {
    // Dibuja la cara de un marciano
    fill(150, 255, 150); // Verde claro para la piel del marciano
    ellipse(this.x, this.y, 50, 50); // Cabeza
    fill(0); // Color negro para los ojos
    ellipse(this.x - 10, this.y - 10, 20, 20); // Ojo izquierdo
    ellipse(this.x + 10, this.y - 10, 20, 20); // Ojo derecho
  }

  dibujarHumano() {
    // Dibuja la cara de un humano
    fill(210, 180, 140); // Ocre claro para la piel
    ellipse(this.x, this.y, 50, 50); // Cabeza
    fill(0); // Color negro para los ojos
    ellipse(this.x - 5, this.y - 5, 10, 10); // Ojo izquierdo
    ellipse(this.x + 5, this.y - 5, 10, 10); // Ojo derecho
  }
}
class juego2 {
  constructor() {
    this.enemigos = [];
    this.jugador = new Personaje();
    this.balas = [];
    this.puntajeMarcianos = 0;
    this.disparosHumanos = 0;
    this.juegoTerminado = false;
    this.juegoComenzado = false;
    this.mouseSobreBoton2 = false
      this.botonX2 = 20;
    this.botonY2 = 20;
    this.anchoBoton = 100;
    this.altoBoton = 40;
  }



  dibujar() {
    background(220);


    if (this.juegoTerminado) {
      this.boton("Volver al inicio", this.botonX2, this.botonY2, this.anchoBoton, this.altoBoton, this.mouseSobreBoton2)
        fill(255, 0, 0);
      textSize(32);
      textAlign(CENTER, CENTER);
      if (this.puntajeMarcianos >= 20 && this.disparosHumanos < 3) {
        // Pantalla de "Ganaste"
        fill(0, 255, 0); // Color verde para indicar que ganaste
        text("¡Ganaste!", width / 2, height / 2);
      } else {
        // Pantalla de "Perdiste"
        text("¡Perdiste!", width / 2, height / 2);
      }
      textSize(16);
      text("Presiona ESPACIO para reiniciar", width / 2, height / 2 + 40);
    } else if (!this.juegoComenzado) {
      fill(0);
      textSize(16);
      textAlign(CENTER);
      text("¡Bienvenido a la tercera expedición!", width / 2, 100 - 20);
      text("Eres el último sobreviviente de la tercera expedición.", width / 2, 100);
      text("Deberás disparar a los marcianos y no a los humanos,", width / 2, 100 + 20);
      text("o cargarás con la culpa por el resto de tu vida.", width / 2, 100 + 40);
      text("instrucciones", width / 2, 100 + 60);
      text("Moverse a los costados con las flechas, disparar con la barra espaciadora", width / 2, 100 + 80);
      text("Si se eliminan 3 humanos se pierde el juego, si se eliminan 20 marcianos se gana", width / 2, 100 + 100);
      text("Presiona ESPACIO para comenzar", width / 2, height / 2 + 80);
    } else {
      this.jugador.mostrar();

      if (keyIsDown(LEFT_ARROW) && this.jugador.x > 0) {
        this.jugador.x -= 5;
      }
      if (keyIsDown(RIGHT_ARROW) && this.jugador.x < width) {
        this.jugador.x += 5;
      }

      if (frameCount % 60 == 0) {
        let posX = random(width);
        let enemigo = new Enemigo(posX, 0);
        this.enemigos.push(enemigo);
      }

      for (let i = this.balas.length - 1; i >= 0; i--) {
        let bala = this.balas[i];
        bala.mostrar();
        bala.mover();

        for (let j = this.enemigos.length - 1; j >= 0; j--) {
          let enemigo = this.enemigos[j];
          if (bala.colision(enemigo)) {
            bala.eliminar();
            enemigo.eliminar();
            if (enemigo.esMarciano) {
              this.puntajeMarcianos++;
            } else {
              this.disparosHumanos++;
            }
            this.enemigos.splice(j, 1);
          }
        }

        if (bala.y < 0) {
          this.balas.splice(i, 1);
        }
      }

      for (let i = this.enemigos.length - 1; i >= 0; i--) {
        let enemigo = this.enemigos[i];
        enemigo.mostrar();
        enemigo.mover();

        if (millis() - enemigo.tiempoCreacion > 1000) {
          enemigo.cambiarApariencia();
        }

        if (enemigo.colision(this.jugador)) {
          enemigo.eliminar();
          this.juegoTerminado = true; // Aquí el juego se pierde
        }

        if (enemigo.y > height || enemigo.puntaje < -1) {
          this.enemigos.splice(i, 1);
        }
      }

      fill(0);
      textSize(16);
      text("Marcianos derrotados: " + this.puntajeMarcianos, 100, 20);
      text("Disparos a humanos: " + this.disparosHumanos, 100, 40);

      if (this.puntajeMarcianos >= 20 && this.disparosHumanos < 3) {
        this.juegoTerminado = true;
      } else if (this.disparosHumanos >= 3) {
        this.juegoTerminado = true;
      }
    }
  }

  tepres(keyCode) {
    if (key === ' ' && !this.juegoComenzado) {
      this.juegoComenzado = true;
    }

    if (!this.juegoTerminado && key === ' ') {
      let bala = new Bala(this.jugador.x, this.jugador.y);
      this.balas.push(bala);
    }

    /*if (this.juegoTerminado && key === ' ') {
     this.reiniciarJuego();
     }*/
  }

  reiniciarJuego() {

    this.enemigos = [];
    this.balas = [];
    this.puntajeMarcianos = 0;
    this.disparosHumanos = 0;
    this.juegoTerminado = false;
    this.juegoComenzado = false;
    this.jugador = new Personaje();
  }
  manejarMouseMovido() {


    if (mouseX >= this.botonX2 && mouseX <= this.botonX2 + this.anchoBoton && mouseY >= this.botonY2 && mouseY <= this.botonY2 + this.altoBoton) {
      this.mouseSobreBoton2 = true;
    }
  }

  boton(etiqueta, x, y, ancho, alto, mouseSobreBoton) {
    rect(x, y, ancho, alto);

    fill(0);
    textAlign(CENTER, CENTER);
    text(etiqueta, x + ancho / 2, y + alto / 2);
  }
}
class Personaje {
  constructor() {
    this.x = width / 2;
    this.y = 380;
    this.puntaje = 0;
  }

  mostrar() {
    push()
      rectMode(CENTER);
    fill(0);
    ellipse(this.x, this.y, 20, 20);  // representa al jugador
    pop()
  }

  mover() {
    if (keyIsPressed) {
      if (key === 'a' && this.x > 0) {
        this.x -= 5;
      } else if (key === 'd' && this.x < width) {
        this.x += 5;
      }
    }
  }
}
