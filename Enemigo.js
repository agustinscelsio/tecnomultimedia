class Enemigo {
  constructor() {
    const margen = 150;
    this.x = random(margen, width - margen);
    this.y = -50;
    this.enemigoColor = color(255, 0, 0); 
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
      this.enemigoColor = (this.enemigoColor === color(255, 0, 0)) ? color(0, 255, 0) : color(255, 0, 0);
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
