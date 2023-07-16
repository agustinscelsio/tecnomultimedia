// Agustín Scelsio, Legajo 92832/1
// tp3
// "La tercera expedición" Crónicas Marcianas de Ray Bradbury 
// https://youtu.be/bqAu07EKgik link al video explicativo





int[] pantallas = new int[18];
PImage[] fotos = new PImage[18];
int minumero = 0;
String[] textoPantallas = new String[18];
int botonX1;
int botonY1;
int botonX2;
int botonY2;
int anchoBoton = 100;
int altoBoton = 40;
boolean decisionTomada1 = false; // Flujo 1, pantalla 1-9
boolean decisionTomada2 = false; // Flujo 2, pantalla 1-13
boolean decisionTomada3 = false; // Flujo 3, pantalla 6-10
boolean nuevaSecuencia = false;
boolean mouseSobreBoton1 = false; // Variable para detectar si el mouse está sobre el botón 1
boolean mouseSobreBoton2 = false; // Variable para detectar si el mouse está sobre el botón 2





void setup() {
  size(600, 600);

  for (int i = 0; i < pantallas.length; i++) {
    pantallas[i] = 0;
  }

  for (int i = 0; i < fotos.length; i++) {
    fotos[i] = loadImage("fondo" + (i + 1) + ".png");
  }

  textoPantallas[0] = "salen 17 hombres\n en una aventura;\n la tercera expedición\n a Marte.";
  textoPantallas[1] = "llegan a Marte pero\n hay una sorpresa,\n ven que es muy parecido \n al planeta tierra.";
  textoPantallas[2] = "los hombres miran desde\n adentro de la nave asustados, \n ¡no pueden creerlo!\n está a la vista un pueblo\n que ya es conocido para ellos";
  textoPantallas[3] = "El capitán de la nave\n ,junto a algunos pocos subordinados,\n bajan de la nave";
  textoPantallas[4] = "Se encuentran con una señora que \n les asegura que están en el planeta tierra";
  textoPantallas[5] = "Lustig se encuentra con\n sus abuelos y toman el té";
  textoPantallas[6] = "baja toda la tripulación\n de la nave y se encuentran con\n sus familiares, gozan de \n momentos lindos en las casas de sus familias";
  textoPantallas[7] = "el capitán se encuentra con su\n hermano y deja las preocupaciones\n de lado, se encuentra realmente feliz y se siente\n como un niño en casa\n se relaja y se acuesta en su cama...";
  textoPantallas[8] = "De pronto comienza a tener pensamientos\n macabros ¿y si son extraterrestres que se\n metieron en su mente y les mostraron\n lo que más quería ver? \n ahora se encontraban, él y toda su tripulación\n completamente indefensos. \n El capitán intenta escapar ";
  textoPantallas[9] = "Pero nunca llega a la puerta";
  textoPantallas[10] = "un tripulante no creía que esa era\n su familia, vió morir a sus padres con sus\n propios ojos  y desde que los vió en vida\n estaba aterrorizado. Sacó su arma\n y disparó al aire para ver como reaccionaban\n";
  textoPantallas[11] = "intentaron convencerlo diciéndole \n que eran su familia pero él no les creía de ninguna manera\n terminó disparándole a su supuesto padre.\n Pero cuando miró su mano no había un arma,\n nunca la hubo.";
  textoPantallas[12] = "funeral";
  textoPantallas[13] = "llegan a marte! ";
  textoPantallas[14] = "comienzan a explorar";
  textoPantallas[15] = "de repente el ambiente se vuelve muy pesado,\n aparece un extraterrestre que los mira\n de pies a cabeza. el extraterrestre no abrió\n la boca pero todos escucharon \n en sus mentes sus palabras";
  textoPantallas[16] = "-no los hemos atacado antes porque\n necesitábamos su nave,\n mal momento para venir, está por explotar\n el planeta,\n soy el sacrificio, debo mantenerlos aquí.\n Después de eso no escucharon más nada.";
  textoPantallas[17] = "Créditos\nProgramado por [Tu nombre]";

  botonX1 = width - anchoBoton * 2;
  botonY1 = height - altoBoton;
  botonX2 = 20;
  botonY2 = 20;
}

void draw() {
  background(0);
  imagenesytexto();
}
