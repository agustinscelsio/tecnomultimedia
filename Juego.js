class Juego {
  constructor() {
    this.enemigos = [];
    this.jugador = new Personaje();
    this.balas = [];
    this.puntajeMarcianos = 0;
    this.disparosHumanos = 0;
    this.juegoTerminado = false;
    this.juegoComenzado = false;
  }

  setup() {
    createCanvas(500, 400);
    textAlign(LEFT);
    textSize(16);
  }

  draw() {
    background(220);

    if (this.juegoTerminado) {
      fill(255, 0, 0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("¡Perdiste!", width / 2, height / 2);
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

  keyPressed() {
    if (key === ' ' && !this.juegoComenzado) {
      this.juegoComenzado = true;
    }

    if (!this.juegoTerminado && key === ' ') {
      let bala = new Bala(this.jugador.x, this.jugador.y);
      this.balas.push(bala);
    }

    if (this.juegoTerminado && key === ' ') {
      this.reiniciarJuego();
    }
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
}
