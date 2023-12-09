class juego1 {
  constructor() {
    this.cantidadenemigos=3
      this.crearpersonaje()
      this.crearenemigos()
      this.tiempo=20
      this.ganar=false
      this.perder=false
      this.juego=true

      this.mouseSobreBoton2 = false
      this.botonX2 = 20;
    this.botonY2 = 20;
    this.anchoBoton = 100;
    this.altoBoton = 40;
  }


  dibujar() {

    background(5, 150, 255)
      fill(255, 140, 0)
      rect(0, 350, 800, 500)


      if (this.perder==true) {
      this.boton("Volver al inicio", this.botonX2, this.botonY2, this.anchoBoton, this.altoBoton, this.mouseSobreBoton2)
    }
    
    if (this.ganar==true) {
      this.boton("Volver al inicio", this.botonX2, this.botonY2, this.anchoBoton, this.altoBoton, this.mouseSobreBoton2)
    }

    if (this.tiempo>15) {
      fill(0)
        textSize(15)
        text("Reglas:Tienes 20 segundos para escapar y \nesquivar a los marcianos esquivandolos con \nlas flechas del teclado", 500, 100)
    }
    if (this.personaje.vida==false) {
      this.perder=true
        this.juego=false
    }
    if (this.tiempo==0 && this.personaje.vida==true) {
      this.ganar=true
        this.juego=false
    }



    if (this.ganar== true) {
      fill(0, 255, 0)
        textSize(30)
        text("Ganaste", 400, 200)
    } else if (this.perder==true) {
      fill(255, 0, 0)
        textSize(30)
        text("PERDISTE", 400, 200)
    }



    if ( frameCount %60==0&& this.personaje.vida==true && this.tiempo>=0) {
      this.tiempo-=1
    }


    if (this.tiempo>=0) {
      fill(0)
        textSize(15)
        text(this.tiempo, 200, 100)
    }

if(this.juego==true){
    this.personaje.dibujar()

      for (let i=0; i< this.cantidadenemigos; i++) {
      this.enemigos[i].dibujar()
        this.enemigos[i].movizq()
        if (this.colision(this.personaje, this.enemigos[i])) {
        this.personaje.vida = false
      }
    }
  }
}

  boton(etiqueta, x, y, ancho, alto, mouseSobreBoton) {
    rect(x, y, ancho, alto);

    fill(0);
    textAlign(CENTER, CENTER);
    text(etiqueta, x + ancho / 2, y + alto / 2);
  }


  crearenemigos() {
    this.enemigos=[]

      for (let i=0; i< this.cantidadenemigos; i++) {
      this.enemigos[i]= new enemigo(800, 300, 50, 50)
    }
  }


  crearpersonaje() {

    this.personaje =new personaje(10, 300, 50, 50)
  }




  colision(personaje, enemigo) {
    return (personaje.posx < enemigo.posx + enemigo.ancho &&personaje.posx + personaje.ancho > enemigo.posx && personaje.posy < enemigo.posy + enemigo.alto && personaje.posy + personaje.alto > enemigo.posy)
  }





  teclapres(keyCode) {
    this.personaje.teclapres(keyCode)
  }


  reiniciarjuego() {
    this.cantidadenemigos = 3;
    this.crearpersonaje();
    this.crearenemigos();
    this.tiempo = 20;
    this.ganar = false;
    this.perder = false;
    this.juego = true;
  }
  manejarMouseMovido() {
    

    if (mouseX >= this.botonX2 && mouseX <= this.botonX2 + this.anchoBoton && mouseY >= this.botonY2 && mouseY <= this.botonY2 + this.altoBoton) {
      this.mouseSobreBoton2 = true;
    } 
  }
}


class personaje {
  constructor(posx, posy, ancho, alto) {
    this.posx=posx
      this.posy=posy
      this.ancho=ancho
      this.alto=alto
      this.vel=1
      this.grav=0.3
      this.alt=-10
      this.vida=true
      this.img=loadImage("data/penege.png")
      this.micolor=color(200)
  }

  dibujar() {
    if (this.vida==true) {

      image(this.img, this.posx, this.posy-20, 300, 120)
        this.vel+= this.grav
        this.posy+=this.vel
        if (this.posy>300) {
        this.vel =0
          this.posy=300
      }
    }
  }



  saltar() {
    if (this.posy==300) {
      this.vel +=this.alt
    }
  }


  moverder() {
    if (this.posx+this.ancho<width+100) {
      this.posx+= 50
    }
  }
  moverizq() {
    if (this.posx-this.ancho>-100) {
      this.posx-= 50
    }
  }




  teclapres(keyCode) {
    if (keyCode==UP_ARROW) {
      this.saltar()
    } else if (keyCode==RIGHT_ARROW) {
      this.moverder()
    } else if ( keyCode==LEFT_ARROW) {
      this.moverizq()
    }
  }
}

class enemigo {
  constructor(posx, posy, ancho, alto) {
    this.vel = random(2.5, 5)
      this.posx=posx;
    this.posy=posy ;
    this.ancho= ancho
      this.alto=alto
      this.vida=1
      this.micolor=color(0, 255, 0)
      this.img=loadImage("data/marcianooo.png")
  }

  dibujar() {

    image(this.img, this.posx, this.posy-20, 300, 120)
  }


  movizq() {
    this.posx-=this.vel
      if (this.posx<-150) {
      this.posx=800
    }
  }
}
