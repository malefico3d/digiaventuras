window.onload = function () {
  obtenerElement('jugar').onclick = comenzarJuego
  obtenerElement('send').onclick = comprobarRespuesta
  obtenerElement('pasapalabra').onclick = pasaPalabra
  obtenerElement('otra_partida').onclick = jugarOtraVez
}
var correct = 0
var positionLetter


function realizaProceso(valorCaja1, valorCaja2){
        var parametros = {
                "valorCaja1" : valorCaja1,
                "valorCaja2" : valorCaja2
        };
        $.ajax({
                data:  parametros,
                url:   'http://localhost:8000/pasapalabra.php',
                type:  'post',
                beforeSend: function () {
                        $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (response) {
                        $("#resultado").html(response);
                }
        });
}


function obtenerElement (name) {
  return document.getElementById(name)
}
function comenzarJuego () {
  this.parentNode.removeChild(this)
  obtenerElement('partida').className = ''
  seguirJugando()
}
function jugarOtraVez () {
  window.location.reload()
}
function Palabra (letter, definition, word) {
  this.letter = letter
  this.definition = definition
  this.word = word
  this.check = null
}
var palabras = [
  new Palabra('A', 'Planta que realiza la fotosíntesis.', 'Arbol'),
  new Palabra('B', 'Tablero de madera con hilos y bolas para enseñar a contar.', 'Abaco'),
  new Palabra('C', 'Es usado para cortar alimentos en la cocina.', 'Cuchillo'),
  new Palabra('D', 'Encryptar un mensaje usando una serie de reglas.', 'Codificar'),
  new Palabra('E', 'Pasar de fuera adentro.', 'Entrar'),
  new Palabra('F', 'Se puede ver en un incendio.', 'Fuego'),
  new Palabra('G', 'Dulce que se come por placer.', 'Golosina'),
  new Palabra('H', 'Fruta dulce que sale tras la breva.', 'Higo'),
  new Palabra('I', 'Último día laboral de la semana.', 'Viernes'),
  new Palabra('J', 'Insecto que fabrica la miel.', 'Abeja'),
  new Palabra('K', 'Bebida alcohólica incolora de origen ruso o polaco.', 'Vodka'),
  new Palabra('L', 'Grupo de hojas impresas o escritas encuadernadas.', 'Libro'),
  new Palabra('M', 'Profundidad grande, inmensa o sin fondo.', 'Abismo'),
  new Palabra('N', 'Hacer que alguien recupere el conocimiento.', 'Reanimar'),
  new Palabra('Ñ', 'Dar a una cosa un color distinto del que tiene.', 'Teñir'),
  new Palabra('O', 'Anticuado, ya no se suele utilizar.', 'Obsoleto'),
  new Palabra('P', 'Entrenar, ensayar una actividad o conocimiento que se quiere perfeccionar.', 'Practicar'),
  new Palabra('Q', 'Periodo de cinco años.', 'Quinquenio'),
  new Palabra('R', 'Principio hinduista según el cual el comportamiento en una vida influye en las sucesivas.', 'Karma'),
  new Palabra('S', 'Que sucede o va después de otra cosa.', 'Posterior'),
  new Palabra('T', 'Firme, constante, obstinado en el cumplimiento de un objetivo.', 'Tenaz'),
  new Palabra('U', 'Transporte público para numerosas personas y que tiene un carril con su nombre.', 'Bus'),
  new Palabra('V', 'Frutas usadas para realizar vino.', 'Uvas'),
  new Palabra('W', 'Antiguo aparato musical portátil con auriculares.', 'Walkman'),
  new Palabra('X', 'Gas noble, cuyo número atómico es el 54.', 'Xenon'),
  new Palabra('Y', 'Quinto mes del año.', 'Mayo'),
  new Palabra('Z', 'Última letra del abecedario.', 'Zeta')
]
function askWord (palabra) {
  var question = ''
  if (palabra.word.toLowerCase().indexOf(palabra.letter.toLowerCase()) === 0) {
    question = 'Empieza con '
  } else {
    question = 'Contiene la '
  }
  return question + palabra.letter + '.'
}
function checkPalabraNull (p) {
  return p.check == null
}
function seguirJugando () {
  var p = palabras.filter(checkPalabraNull)
  if (p.length !== 0) {
    showDefinition(p[0])
    positionLetter = posicionPalabra(p[0])
  } else {
    partidaTerminada()
  }
}
function showDefinition (palabra) {
  var w = obtenerElement('word')
  var l = obtenerElement('letter')
  var d = obtenerElement('definition')
  l.innerHTML = askWord(palabra)
  d.innerHTML = palabra.definition
  w.value = ''
  w.focus()
}
function posicionPalabra (palabraNull) {
  var position
  for (var i = 0; i < palabras.length; i++) {
    if (palabras[i].letter === palabraNull.letter) {
      position = i
      break
    }
  }
  return position
}



/*  En esta función chequea si la palabra es la correcta  */ 

function comprobarRespuesta () {
  var userinput = obtenerElement('word').value
  var p = palabras.splice(positionLetter, 1)[0]
  var letter = obtenerElement('letters').children
  var x = ''
  for (var i = 0; i < letter.length; i++) {
    if (letter[i].innerHTML === p.letter.toUpperCase()) {
      x = i
      break
    }
  }
  if (userinput.toLowerCase() === p.word.toLowerCase()) {
    p.check = true
    letter[x].className = 'letter-true'
    correct += 1
  } else {
    p.check = false
    letter[x].className = 'letter-false'
  }
  palabras.push(p)
  seguirJugando()
}




function pasaPalabra () {
  var p = palabras.splice(positionLetter, 1)[0]
  palabras.push(p)
  seguirJugando()
}
function partidaTerminada () {
  obtenerElement('marcador').innerHTML = correct
  obtenerElement('partida').className = 'hidden'
  obtenerElement('terminado').className = ''
}
