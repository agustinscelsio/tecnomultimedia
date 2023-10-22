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
