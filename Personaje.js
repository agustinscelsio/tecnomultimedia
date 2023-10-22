class Personaje {
  constructor() {
    this.x = width / 2;
    this.y = 380;
    this.puntaje = 0;
  }
  
  mostrar() {
    rectMode(CENTER);
    fill(0);
    ellipse(this.x, this.y, 20, 20);  // representa al jugador 
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
