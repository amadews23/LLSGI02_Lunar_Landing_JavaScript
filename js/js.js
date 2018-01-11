//ENTORNO
var g = 1.622;
//var g = 18;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
//variables anyadidas por mi
var nave = null;        
var pausado = null;
var menu_mostrado = null;
var raton_click = null;
var velocidad_umbral = 5;

window.onload = function(){

	document.getElementById("ventana_contenido").style.visibility = "hidden";
	document.getElementById("ventana_titulo").style.visibility = "hidden";
	velocidad = document.getElementById("velocidad_text");
	altura = document.getElementById("altura_text");
	combustible = document.getElementById("fuel_text");
	nave = document.getElementById("nave");
	nave.width=240;
	nave.height=160;
	//obtengo la direccion de la pagina
	if (get_parametros("deposito") != "") {
 		c=get_parametros("deposito");
		document.getElementById("fuel_text").innerHTML=c;
	}
	if (get_parametros("dificultat") != "") {
		velocidad_umbral = get_parametros("dificultat");
	}
	//definición de eventos
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
		//si está pausado/parado el juego: no gaste combustible
		if (pausado==null){
			if (a==g && c > 0){
		  		motorOn();  
				raton_click = 1;	

 			} else {
  				motorOff();
				raton_click = null;
 			}
		}
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//funcion para crear la animacion en  la nave
//los valores coherentes que se le pueden pasar son 0 100 200 300 400 o 500 -- 600 para borrar canvas
function animar_nave (estado) {

	var ctx = nave.getContext("2d");
	if (estado == 600) {
		ctx.clearRect(0, 0, 240, 240);
	} else {
		ctx.clearRect(0, 0, 240, 160);
		ctx.drawImage(document.getElementById("source"),
	        	        estado, 0, 100, 160, 47, 0, 100, 160);
	}
}
//funcion para crear la animacion  del final fin=0 explosion fin=1 cumplida
function animar_fin (estado,fin) {
	animar_nave(600);
	nave.width=200;
	nave.height=200;
	var ctx = nave.getContext("2d");
	if (fin==0) {
		nave.style.top = "65%";
		//En source esta la imagen del sprite
		source.src ="img/explosion.png";
		//ctx.clearRect(0, 0, 100, 160);
		ctx.drawImage(document.getElementById("source"),
	 	               estado, 0, 200, 200, 0, 0, 200,200);
	}
	if (fin==1) {
		nave.style.top = "71%";
		source.src ="img/mision-cumplida.png";
		//ctx.clearRect(0, 0, 100, 160);
		ctx.drawImage(document.getElementById("source"),
		               estado, 0, 280, 280, -30, -20, 280,280);
	}
}
//Definición de funciones
function start(){

	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){

	clearInterval(timer);
	animar_nave (0)
	motorOff()
}

function moverNave(){

	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	if (v < 0) {
		if ((v < -1 ) && (document.onkeydown == true || (raton_click != null))) {
			animar_nave(200);	
		}	
		if ((v < -2 ) && (document.onkeydown == true || (raton_click != null))) {
			animar_nave(300);
		}
		if ((v < -4 ) && (document.onkeydown == true || (raton_click != null))) {
			animar_nave(500);
		}
	} else {
		if (document.onkeydown == true || (raton_click != null)) {
			animar_nave(100);
		} else {
			animar_nave(0);
		}
	}
	//actualizar marcadores
	//Truncamos a solo tres decimales--
	velocidad.innerHTML=v.toFixed(3);
	altura.innerHTML=y.toFixed(3);
	//mover hasta que top sea un 70% de la pantalla
	if (y<-100) {
		//alert("¡La nave se salió de la órbita lunar!\n y se perdió en el espacio.");
		document.getElementById("ventana_titulo").style.visibility = "visible";
		//alert("La nave explotó");
		document.getElementById("ventana_titulo").innerHTML = "<b>¡La nave se salió de la órbita lunar!<br>  se perdió en el espacio.</b>";
		stop();
		document.onkeydown = motorOff;
		pausado=1;
	}
	//canvio 70 por 73
	if (y<73){ 
		nave.style.top = y+"%"; 
	} else { 
		stop();
		//con estas lineas la nave no sigue gastando combustible
		document.onkeydown = motorOff;
		pausado=1;
		function finalizar(i,fin) {

			setTimeout(function(){ animar_fin(i*200,fin); }, i*250);
		}
		//si al aterrizar supera la velocidad umbral
		if(v > velocidad_umbral) {
			document.onkeydown = null;
			document.onkeyup = null;
			document.getElementById("ventana_titulo").style.visibility = "visible";
			//alert("La nave explotó");
			document.getElementById("ventana_titulo").innerHTML = '<b>La nave explotó</b><br><br><img src="img/fracaso.png">';
			for (var i=1;i<=12;i++) {
				finalizar(i,0);
			}
		}
		else {
			document.onkeydown = null;
			document.onkeyup = null;
			document.getElementById("ventana_titulo").style.visibility = "visible";
			//alert("Misión cumplida");
			document.getElementById("ventana_titulo").innerHTML = '<b>Misión cumplida</b><br><br><img src="img/exito.png">';
			for (var i=1;i<=11;i++) {
				finalizar(i,1);
			}
		}
	}
}
function motorOn(){

	//el motor da aceleración a la nave
	//Si hay combustible funcionara
	if (c > 0) {
		//cuando el motor este en On: animacion
		for (var i=1; i<6; i++) {
			animar_nave (i*100);
	}	
	a=-g;
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null)
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
		
	} else {
		motorOff();
  		raton_click = null;
	}	
}
function motorOff(){

	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	animar_nave (0);
}
function actualizarFuel(){

	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(3);
	if (c == 0) {

		motorOff();
		raton_click = null;

	}	
}

//funcion para obtener el valor de la url pasado por el metodo GET
function get_parametros(parametro) {

    parametro = parametro.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + parametro + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function menu(opcion) {

	if (opcion=="configuracion") {
		//Aqui paramos el gasto de combustible y el movimiento de la nave
		pausado=1;	
		stop();
		//cuando apretemos no gastará más combustible
		document.onkeydown = motorOff;
 		//escondemos la nave
		nave.style.visibility = "hidden";
		//creamos la ventana del menu
		document.getElementById("ventana_titulo").style.visibility = "visible";
		document.getElementById("ventana_contenido").style.visibility = "visible";
		document.getElementById("ventana_titulo").innerHTML = "<b>Configuración</b>";
		document.getElementById("dificultad").style.visibility = "visible";
		document.getElementById("contenido_ventana").style.visibility = "visible";
	}else {
		if (opcion=="ayuda") {
			if ( confirm("Vas a salir del juego ¿Deseas continuar?") == true ) {
				location.href ="how_to_play.html";
			} else {
				location.href ="#";
			}
		}
		if (opcion=="about") {
			if ( confirm("Vas a salir del juego ¿Deseas continuar?") == true ) {
				location.href ="about.html";
			} else {
				location.href ="#";
			}
		}
	}
}

function mostrar_menu() {

	if (menu_mostrado == null) {
 		document.getElementById("derecha").style.visibility = "visible";
 		menu_mostrado = 1;
	} else {
		document.getElementById("derecha").style.visibility = "hidden";
 		menu_mostrado = null;
	}
}
