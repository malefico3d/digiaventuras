var escena_actual = 1;
var ultimaEscena = 3;
var elemento_actual = 1;

/*class Escena {

  constructor(inicial = 1, total = 1) {
    this.actual = inicial;
    this.total = total;
  }

  siguiente() {
    this.actual++;
    if (this.actual >= this.total) {
      this.actual = this.total;
    }
    return this.actual;
  }
  previa() {
    this.actual--;
    if (this.actual <= 1) {
      this.actual = 1;
    }
    return this.actual;
  }
}*/

function resetEscenas(){
	for (var e=0; e<3; e++) {
		var id = "escena-" + e;
		var escena = document.getElementById(id);
		if (escena != null) { 
			escena.style.display='none';
		}
	}
}

function mostrarEscena(e) {
	resetEscenas();
	var id = "escena-" + e;
	var escena = document.getElementById(id);
	if (escena != null) { 
		escena.style.display='block';
	}
}


function resetCarteles(){
	for (var c=1; c<8; c++) {
		var id = "cartel" + c;
		var cartel = document.getElementById(id);
		if (cartel != null) { 
			cartel.style.display='none';
		}
	}
}

function mostrarCartel(){
	resetCarteles();
	var id = "cartel" + elemento_actual;
	var cartel_actual = document.getElementById(id);
	if (cartel_actual != null) { 
		cartel_actual.style.display='block';
	}
}

function mostrarProximaEscena(){
		resetEscenas();
		escena_actual++;
		if(escena_actual>ultimaEscena){
			escena_actual=0;
		}
		mostrarEscena(escena_actual);
		console.log(escena_actual);
}

function mostrarProximoElemento() {
	resetCarteles();
	elemento_actual++;
	if (elemento_actual == 6 || elemento_actual==8){ 
		mostrarProximaEscena();
		/*escena_actual+=1;
		if(escena_actual>ultimaEscena){
			escena_actual=0;
		}*/
		
	}
	mostrarCartel();
}

function chequearElemento(id) {
/*	alert(id);*/
	var n = id.length;
	var e = id.charAt(n-1);
	if (e != elemento_actual){
		mostrarVentana("error");
	}
	else {
		mostrarVentana("muybien");
		mostrarProximoElemento();
	}
}

function mostrarVentana(id) {
	var ventana = document.getElementById(id);
	ventana.style.animation = 'aparece 300ms linear';
	ventana.style.display = 'block';
}

function cerrarVentana(id) {
	var ventana = document.getElementById(id);
	ventana.style.animation = 'desaparece 100ms linear';
	ventana.style.display = 'none';
}

