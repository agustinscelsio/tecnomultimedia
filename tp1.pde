// Agustín Scelsio, comisión 1
// tp1


int cuenta ; 
String pantalla ;
PImage foto1, foto2, foto3 ;
PFont tipoletra ;
int pos, tama ;
int pY ;
int pX ;


void setup () {

size (640, 480) ;
foto1 = loadImage ("USUAHIAPRIMERA.png") ;
foto2 = loadImage ("USUAHIASEGUNDA.png") ;
foto3 = loadImage ("usuahia3.png") ;
pantalla = "1" ;
tipoletra = loadFont ("calibri.vlw") ;

cuenta = 0; 
pos = 480 ;
pY = 640 ;
pX= height/2 ;
textSize (10) ;
textAlign (CENTER) ;
}


void draw () {
println (frameCount) ;
  cuenta++;
  
 textAlign (CENTER) ;
  if (pantalla.equals("1")) {    // PRIMERA PANTALLA
   image (foto1, 0, 0, width, height) ;
    textAlign (CENTER) ;
    textFont (tipoletra) ;
    textSize (20) ;
    text("Ushuaia es una ciudad turística de Argentina.\n Se ubica en el archipiélago de Tierra del Fuego,\n el extremo austral de Sudamérica,\n apodado el Fin del Mundo.", width/2, pos);
    pos = pos - 2 ;
   
    
 
  } else if (pantalla.equals("2")) {                                                 // SEGUNDA PANTALLA
  image (foto2, 0, 0, width, height) ;
    textAlign(CENTER);
    textFont (tipoletra) ;
    textSize (20) ;
    text("Esta ciudad con mucho viento,\n ubicada en una escarpada colina,\n está rodeada de los montes Martial\n y el canal Beagle", width/2, pY);
    pY = pY - 2 ;
    
    
  } else if (pantalla.equals("3")) {                                                 // TERCERA PANTALLA
   image (foto3, 0, 0, width, height) ;
   textFont (tipoletra) ;
    textAlign(CENTER);
    textSize (tama) ;
    stroke (0) ;
    text("El canal Beagle es un canal localizado\n en el extremo austral de América del Sur,\n que conecta al océano Atlántico con el océano Pacífico.  ", width/2, pX);
    
    if (tama<25) {
      tama ++ ;
    
    } 
  }else if (pantalla.equals ("4") ) {
    background (121,205,255) ;
    fill (45,126,211) ;
    rect ( 450, 380, 100, 40) ;
    textSize (15) ;
    fill (255) ;
    text ( "click aquí" , 500, 410) ;
    textSize (25) ;
    
    text ("para reinciar hacé click en el botón ", 320, 200) ;
     
  } 

 
  if (cuenta <300) {
    pantalla = "1";
  } else if (cuenta >=300 && cuenta < 700) {
    pantalla = "2";
  } else if (cuenta >=700 && cuenta < 1200) {
    pantalla = "3";
  }else if (cuenta>= 1200 && cuenta < 400000) {
    pantalla = "4" ;
    
  }
text (pantalla, 50, 400) ;
  }
  void mousePressed() { // reiniciar variables
  if (cuenta>= 1200 ) {
 if  (mouseX>450 && mouseX<550 && mouseY>100 && mouseY<400) {
  cuenta = 0 ;
  pantalla = "1" ;
  pos = 480 ; 
  pY = 640 ;
pX= 640 ;
 }
  
  } 
  }
  
