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

function mostrarProximoElemento() {

	for (var elem=1; elem<6; elem++) {
		var id = "elem" + e;
		var escena = document.getElementById(id);
		if (escena != null) { 
			escena.style.display='none';
		}
	}
	var id = "elem" + elem_actual;
	var cartel_elemento = document.getElementById(id);
	if (cartel_elemento != null) { 
		cartel_elemento.style.display='block';
		elemento_actual++;
		if (elemento_actual > 5){ elemento_actual=1; }
	}
}

function chequearElemento() {
	
	if (elemento != item_a_identificar){
		alert("Has hecho clic en otro elemento");
	}
	
}
