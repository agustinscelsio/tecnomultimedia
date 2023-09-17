// Agustín Scelsio, tp4, comisión 1, legajo 92832/1 
// link al video de youtube

let pantallas = ["Comenzar Juego", "Juego", "Ganar", "Perder"];
let estadoJuego = 0; // El estado de juego actual (comenzando en la pantalla "Comenzar Juego")
let balas = [];
let enemigos = [];
let enemigosGrandes = [];
let puntuacion = 0;
let enemigosDerrotados = 0;
let juegoTerminado = false;
let velocidadEnemigos = 0.4;
let velocidadEnemigosGrandes = 0.35;
let frecuenciaEnemigos = 60;
let jugadorX, jugadorY;
let velocidadMovimiento = 5;
let tiempoUltimoDisparo = 0;
let intervaloDisparo = 15;
let margenEnemigos = 30;
let dobleDisparoActivo = false;
let tiempoDobleDisparo = 0;
let duracionDobleDisparo = 10 * 60; 
let tiempoJuego = 0; // Contador de tiempo de juego
let tiempoLimiteGanar = 30 * 60; // Tiempo límite para ganar 
let pantallaGanar = false;
let pantallaPerder = false;
let tiempoRestante = 30; // Tiempo inicial en segundos

function setup() {
  createCanvas(800, 600);
  jugadorX = width / 2;
  jugadorY = height - height / 10; 
}

function draw() {
  background(0); 

  if (estadoJuego === 0) { // Pantalla "Comenzar Juego"
  
    fill(255);
    textSize(36);
    text("Presiona ENTER para jugar", width / 2 - 300, height / 2);
    textSize(15);
    text("Si los enemigos pasan el borde inferior, invadirán tu mundo. Disparales y protege tu tierra.", width / 2 - 300, 100);
    textSize(15);
    text("- Utiliza las teclas W, A, S, D para moverte.", width / 2 - 300, 180);
    text("- los enemigos más grandes necesitan de dos disparos para ser eliminados", width / 2 - 300, 200);
    text("- Si los enemigos tocan tu nave, pierdes el juego.", width / 2 - 300, 220);
    text("- para ganar deberás defender tu territorio 30 segundos", width / 2 - 300, 240);

    if (keyIsPressed && keyCode === ENTER) {
      estadoJuego = 1;         //acá comienza el juego
      reiniciarJuego();
    }
    
    // botón para pantalla de créditos
    fill(255);
    rect(width / 2 - 100, height / 2 + 50, 200, 50);
    textSize(24);
    fill(0);
    text('Ver Créditos', width / 2 - 60, height / 2 + 85);

    // Verificar si se hizo clic en el botón de créditos
    if (mouseX > width / 2 - 100 &&  mouseX < width / 2 + 100 &&  mouseY > height / 2 + 50 && mouseY < height / 2 + 100 ) {
      if (mouseIsPressed) {
        estadoJuego = 4; // Cambiar al estado de "Créditos"
      }
    }
  } else if (estadoJuego === 4) {   // Pantalla de "Créditos"
    fill(255);
    textSize(50);
    text("Créditos", width / 2 - 100 , height / 2 - 100);
    textSize(20);
    text("Agustín Scelsio", width / 2 - 100 , height / 2 );
    text("Gracias por jugar", width / 2 -  100 , height / 2 + 50);
    
    // Agregar un botón para volver a la pantalla de "Comenzar Juego"
    fill(255);
    rect(width / 2 - 100, height / 2 + 100, 200, 50);
    textSize(24);
    fill(0);
    text('Volver al Juego', width / 2 - 80, height / 2 + 135);

    // Verificar si se hizo clic en el botón de volver al juego
    if (mouseX > width / 2 - 100 &&  mouseX < width / 2 + 100 &&  mouseY > height / 2 + 100 && mouseY < height / 2 + 150) {
      if (mouseIsPressed) {
        estadoJuego = 0; // Cambiar de nuevo al estado de "Comenzar Juego"
      }
    }
    
  } else if (estadoJuego === 1) {
    // Pantalla "Juego"
    if (!juegoTerminado) {
      if (frameCount % 60 === 0 && tiempoRestante > 0) {   // Restar 1 segundo del tiempo hasta que llegue a 0
        tiempoRestante--;
      }

      // Dibujar el tiempo restante en la pantalla
      textSize(24);
      fill(255);
      text('Tiempo Restante: ' + tiempoRestante, width - 300, 30);

      if (keyIsDown(87)) {
        jugadorY -= velocidadMovimiento;
      }
      if (keyIsDown(83)) {
        jugadorY += velocidadMovimiento;
      }
      if (keyIsDown(65)) {
        jugadorX -= velocidadMovimiento;
      }
      if (keyIsDown(68)) {
        jugadorX += velocidadMovimiento;
      }

      if (jugadorX < 0) {
        jugadorX = 0;
      }
      if (jugadorX > width - 60) {
        jugadorX = width - 60;
      }
      if (jugadorY < 0) {
        jugadorY = 0;
      }
      if (jugadorY > height - 60) {
        jugadorY = height - 60;
      }

      dibujarNave(jugadorX + 30, jugadorY);

      if (frameCount - tiempoUltimoDisparo >= intervaloDisparo) {       // Disparo automático desde la parte superior de la nave

        let bala = crearBala(jugadorX + 30, jugadorY);
        balas.push(bala);
        tiempoUltimoDisparo = frameCount;
      }
    
      if (enemigosDerrotados >= 10 && !dobleDisparoActivo) {   // Activar el Doble Disparo cuando se derrotan 10 enemigos
        dobleDisparoActivo = true;
        tiempoDobleDisparo = frameCount;
      }

      // Incrementar el tiempo de juego
      tiempoJuego++;

      for (let i = balas.length - 1; i >= 0; i--) {
        let bala = balas[i];
        if (dobleDisparoActivo) {
          fill(0, 255, 0);
          ellipse(bala.x, bala.y, 15, 30); // Balas más grandes y poderosas durante el Doble Disparo . ( pueden pegarles a los enemigos más facill )
        } else {
          fill(0, 255, 0);
          ellipse(bala.x, bala.y, 10, 20);
        }

        bala.y -= 8;
     
        for (let j = enemigos.length - 1; j >= 0; j--) {     // Verificar colisión con enemigos normales
          let enemigo = enemigos[j];
          let d = dist(bala.x, bala.y, enemigo.x, enemigo.y);
          if (d < 15) {
            balas.splice(i, 1);
            if (enemigo.salud <= 1) {
              enemigos.splice(j, 1);
              puntuacion += 10;
              enemigosDerrotados++;
            } else {
              enemigo.salud--;
            }
          }
        }

        for (let k = enemigosGrandes.length - 1; k >= 0; k--) {     // Verificar colisión con enemigos grandes
          let enemigoGrande = enemigosGrandes[k];
          let d = dist(bala.x, bala.y, enemigoGrande.x, enemigoGrande.y);
          if (d < 30) {
            balas.splice(i, 1);
            if (enemigoGrande.salud <= 1) {
              enemigosGrandes.splice(k, 1);
              puntuacion += 20;                   // Mayor puntaje por derrotar enemigos grandes
              enemigosDerrotados++;
            } else {
              enemigoGrande.salud--;
            }
          }
        }

        if (bala.y < 0) {
          balas.splice(i, 1);
        }
      }

      // Crear enemigos normales
      if (frameCount % frecuenciaEnemigos === 0) {
        let posX = random(margenEnemigos, width - margenEnemigos);
        crearEnemigo(posX);
      }

      // Crear enemigos grandes
      if (frameCount % (frecuenciaEnemigos * 2) === 0) {
        let posX = random(margenEnemigos, width - margenEnemigos);
        crearEnemigoGrande(posX);
      }

      for (let i = enemigos.length - 1; i >= 0; i--) {
        let enemigo = enemigos[i];
        fill(255, 0, 0);
        ellipse(enemigo.x, enemigo.y, 20, 20);
        enemigo.y += velocidadEnemigos;

        let d = dist(jugadorX + 30, jugadorY, enemigo.x, enemigo.y);
        let radioNave = 30;
        if (d < radioNave + 10) {
          pantallaPerder = true;
          juegoTerminado = true;
        }

        // Verificar si el enemigo pasó el borde inferior de la pantalla 
        if (enemigo.y > height) {
          pantallaPerder = true;
          juegoTerminado = true;
        }

        if (enemigo.y > height) {
          enemigos.splice(i, 1);
          puntuacion += 10;
          enemigosDerrotados++;
          if (enemigosDerrotados >= 10) {
            dobleDisparoActivo = true;
            tiempoDobleDisparo = frameCount;
          }
        }
      }

      for (let i = enemigosGrandes.length - 1; i >= 0; i--) {
        let enemigoGrande = enemigosGrandes[i];
        fill(255, 0, 0);
        ellipse(enemigoGrande.x, enemigoGrande.y, 40, 40);
        enemigoGrande.y += velocidadEnemigosGrandes;

        let d = dist(jugadorX + 30, jugadorY, enemigoGrande.x, enemigoGrande.y);
        let radioNave = 30;
        if (d < radioNave + 20) {
          pantallaPerder = true;
          juegoTerminado = true;
        }

        // Verificar si el enemigo grande ha pasado el borde inferior de la pantalla
        if (enemigoGrande.y > height) {
          pantallaPerder = true;
          juegoTerminado = true;
        }

        if (enemigoGrande.y > height) {
          enemigosGrandes.splice(i, 1);
          puntuacion += 20;
          enemigosDerrotados++;
          if (enemigosDerrotados >= 10) {
            dobleDisparoActivo = true;
            tiempoDobleDisparo = frameCount;
          }
        }
      }

      if (frameCount % 300 === 0) {
        velocidadEnemigos += 0.1;
        velocidadEnemigosGrandes += 0.05;
        frecuenciaEnemigos -= 5;
      }

      // Desactivar el Doble Disparo después de su duración
      if (dobleDisparoActivo && frameCount - tiempoDobleDisparo >= duracionDobleDisparo) {
        dobleDisparoActivo = false;
      }

      // Verificar si se ganó el juego (30 segundos sin perder)
      if (tiempoRestante <= 0) {
        pantallaGanar = true;
        juegoTerminado = true;
      }
    }

    if (pantallaGanar) {
      textSize(36);
      fill(0, 255, 0);
      text('¡Ganaste!', width / 2 - 100, height / 2);
      botonreinicio(); // Agregar el botón de reinicio
    } else if (pantallaPerder) {
      textSize(36);
      fill(255, 0, 0);
      text('¡Juego Perdido!', width / 2 - 150, height / 2);
      botonreinicio(); // Agregar el botón de reinicio
    }

    textSize(24);
    fill(255);
    text('Puntuación: ' + puntuacion, 20, 30);
    text('Enemigos Derrotados: ' + enemigosDerrotados, 20, 60);
    if (dobleDisparoActivo) {
      text('Doble Disparo Activo', 20, 90);
    }
  }
}

function dibujarNave(x, y) {
  
 //cuerpo
  fill(0, 255, 0); 
  noStroke();
  rect(x - 15, y, 30, 15);

  // Ala izquierda (triángulo)
  fill(0, 100, 0); // Color verde oscuro
  triangle(x - 15, y, x - 25, y + 15, x - 5, y + 15);

  // Ala derecha (triángulo)
  triangle(x + 15, y, x + 25, y + 15, x + 5, y + 15);
  
  //cañon
  fill(100); 
  rect(x - 2, y - 15, 6, 15);
}

function crearBala(xNave, yNave) {
  let xBala = xNave; // La bala sale desde la punta superior del triángulo
  let yBala = yNave - 30; // Posición vertical de la bala
  return { x: xBala, y: yBala };
}

function crearEnemigo(x) {
  let enemigo = {
    x: x,
    y: 0,
    salud: 1
  };
  enemigos.push(enemigo);
}

function crearEnemigoGrande(x) {
  let enemigoGrande = {
    x: x,
    y: 0,
    salud: 2
  };
  enemigosGrandes.push(enemigoGrande);
}

function botonreinicio() {
  // Botón de reinicio
  fill(255);
  rect(width / 2 - 100, height / 2 + 50, 200, 50);
  textSize(24);
  fill(0);
  text('Reiniciar Juego', width / 2 - 80, height / 2 + 85);

  // Verificar si se hizo clic en el botón de reinicio
  if (mouseX > width / 2 - 100 &&  mouseX < width / 2 + 100 &&  mouseY > height / 2 + 50 && mouseY < height / 2 + 100 ) {
    if (mouseIsPressed) {
      estadoJuego = 0; // Cambia de nuevo al estado de "Comenzar Juego"
    }
  }
}

function reiniciarJuego() {
  balas = [];
  enemigos = [];
  enemigosGrandes = [];
  puntuacion = 0;
  enemigosDerrotados = 0;
  juegoTerminado = false;
  velocidadEnemigos = 0.4;
  velocidadEnemigosGrandes = 0.35;
  frecuenciaEnemigos = 60;
  jugadorX = width / 2;
  jugadorY = height - height / 10;
  tiempoUltimoDisparo = 0;
  margenEnemigos = 30;
  dobleDisparoActivo = false;
  tiempoDobleDisparo = 0;
  tiempoJuego = 0;
  tiempoRestante = 30;
  pantallaGanar = false;
  pantallaPerder = false;
}
