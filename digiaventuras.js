var escena_actual = 1;
var elemento_actual = 1;

class Escena {

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
}

function mostrarProximaEscena() {
	for (var e=0; e<3; e++) {
		var id = "escena-" + e;
		var escena = document.getElementById(id);
		if (escena != null) { 
			escena.style.display='none';
		}
	}

	var id = "escena-" + escena_actual;
	var escena = document.getElementById(id);
	if (escena != null) { 
		escena.style.display='block';
		escena_actual++;
		if (escena_actual > 2){ escena_actual=0; }
	}
}

function resetCarteles(){
	for (var c=1; c<6; c++) {
		var id = "cartel" + c;
		var cartel = document.getElementById(id);
		if (cartel != null) { 
			cartel.style.display='none';
		}
	}
}

function mostrarCartel(){
	var id = "cartel" + elemento_actual;
	var cartel_actual = document.getElementById(id);
	if (cartel_actual != null) { 
		cartel_actual.style.display='block';
	}
}

function mostrarProximoElemento() {
	resetCarteles();
	elemento_actual++;
	if (elemento_actual > 5){ elemento_actual=1; }
	mostrarCartel();
}

function chequearElemento(id) {
/*	alert(id);*/
	var n = id.length;
	var e = id.charAt(n-1);
	if (e != elemento_actual){
		/*alert("No es el elemento");*/
		mostrarVentana("error");
	}
	else {
		mostrarVentana("muybien");
		/*elemento_actual+=1;
		if(elemento_actual>5){elemento_actual=1;}*/
		mostrarProximoElemento();
	}
}

function mostrarVentana(id) {
	/*alert(id);*/
	var ventana = document.getElementById(id);
	ventana.style.animation = 'aparece 300ms linear';
	ventana.style.display = 'block';
}

function cerrarVentana(id) {
	/*alert(id);*/
	var ventana = document.getElementById(id);
	ventana.style.animation = 'desaparece 100ms linear';
	ventana.style.display = 'none';
}

