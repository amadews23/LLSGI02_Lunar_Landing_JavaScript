# LLSGI02_Lunar_Landing_JavaScript
## Segunda parte del desarrollo de la aplicación "Lunar Landing". 

### El proyecto se compone de:
* Tres archivos .html. 
* Una carpeta css/ con dos archivos .css.
* Una carpeta js/ con un arcivo .js. 
* Una carpeta img/ que contiene diez imágenes en png.

La versión de móbil se diferencia:
  * Tiene el menú lateral derecho que está escondido, para mostrarlo hay que pulsar el botón verde de la derecha. El menú del móbil no tiene texto, son unos iconos.
    
  * Los marcadores de velocidad, altura y combustible están encima de la pantalla, y no tienen texto del título del marcador, sólo los iconos.

### Las imágenes
Las imágenes no diseñadas por mí proceden de http://openclipart.com y son modificadas con Inkscape para cambiar los colores y quitar elementos del dibujo. Estaban en formato vectorial (.svg).

La nave procede de un dibujo vectorial que tengo hecho por mi desde hace tiempo. Lo dibujé con Inkscape y adapté y modifiqué con Gimp. 

Para crear los sprites he usado Gimp. 

La imagen del fondo procede de https://www.pexels.com/photo/astronomy-dark-evening-glowing-176851/. 

Todas las imágenes han sido optimizadas con http://tinypng.com.  

 
#### Página de Configuración:
* Está  en la misma página index.html. Los valores modificados son enviados mediante un formulario GET. Los valores son leidos con javascript mediante una función que usa expresiones regulares.
* Se puede modificar  el tamaño del deposito y nivel de dificultad. La dificultad va definida por la velocidad máxima en que puede aterrizar la nave.
* Se puede cambiar el tamaño del deposito.
##### Objetivo:
* Aterrizar a 72 metros desde el opunto de partida y a una velocidad inferior a la velocidad umbral.
* Si la nave supera los 100 metros hacia arriba del punto de partida:la nave se escapará de la órbita lunar.
* Si la nave se queda sin combustible no responderá a las ordenes que le demos y se precipitará.
##### Características del Juego  
Cuando la nave aterricé con exito saldrá la imagen animada de un astronauta con una bandera.
Si la nave no aterriza a la velocidad adecuada mostrará una animación de la nave rompiendose.
Las animaciones de la nave, explosión o llegada exitosa están hechas con sprites. Están contenidas en un canvas y programadas con javascript.

### Enlaces:
Estos son los enlaces para ver los resultados:
  
  https://rawgit.com/amadews23/LLSGI02_Lunar_Landing_JavaScript/master/index.html



