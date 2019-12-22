const botones = document.querySelectorAll('.boton');
const scoreP = document.getElementById('score');
const miMano = document.getElementById('miMano');
const maquina = document.getElementById('maquina');
const divPeleas = document.getElementById('div-resultado');
const cruz = document.getElementById('cerrar');
const divReglas = document.getElementById('div-reglas');
const btnReglas = document.getElementById('btn-reglas');
const bestScore = document.getElementById('best-score');
let enemigo;
let puntaje;
let mejorPuntaje;

if (localStorage.getItem('mejoresPuntos') == null) {
    mejorPuntaje = 0
} else {
    mejorPuntaje = localStorage.getItem('mejoresPuntos');
}

if (localStorage.getItem('puntos') == null) {
    puntaje = 0
} else {
    puntaje = localStorage.getItem('puntos');
}

const imagenes = ['<img class="mano-big" id="piedra-big" src="icons/icons8-hand-rock-100.png" alt="Piedra">', '<img class="mano-big" id="papel-big" src="icons/icons8-hand-100.png" alt="Papel">', '<img class="mano-big" id="tijera-big" src="icons/icons8-hand-scissors-100.png" alt="Tijera">']
const imagenesMachine = ['<img class="mano-big-machine" id="piedra-big-machine" src="icons/icons8-hand-rock-100.png" alt="Piedra">', '<img class="mano-big-machine" id="papel-big-machine" src="icons/icons8-hand-100.png" alt="Papel">', '<img class="mano-big-machine" id="tijera-big-machine" src="icons/icons8-hand-scissors-100.png" alt="Tijera">']

bestScore.innerHTML=`Mejor puntaje: ${mejorPuntaje}`;
scoreP.innerHTML=`Puntaje: ${puntaje}`;
botones.forEach(boton => {
    boton.addEventListener('click', seleccionarOpcion);
    function seleccionarOpcion() {
        generarMano();
        pelea(this.dataset.mano);
        scoreP.innerHTML=`Puntaje: ${puntaje}`;
        miMano.innerHTML=imagenes[this.dataset.mano];
        localStorage.setItem('puntos', puntaje);
        generarMejorPuntaje();
    }
});

function generarMano() {
    enemigo = Math.floor(Math.random() * 3);
    maquina.innerHTML=imagenesMachine[enemigo];
}

function pelea(mano) {

    if (mano < enemigo) {
        if (mano == 0 && enemigo == 2) {
            verResultado('Has ganado', 'verde');
            sumarPuntaje();
        } else {
            verResultado('Has perdido', 'rojo');
            restartPuntaje();
        }
    } else if (mano > enemigo) {
        if (mano == 2 && enemigo == 0) {
            verResultado('Has perdido', 'rojo');
            restartPuntaje();
        } else {
            verResultado('Has ganado', 'verde');
            sumarPuntaje();
        }
    } else {
        verResultado('Empate', 'violeta');
    }
}

function sumarPuntaje() {
    puntaje ++;
}

function restartPuntaje() {
    puntaje = 0;
}

function verResultado (resultado, color) {
    divPeleas.innerHTML=`<p id='resultado' class='${color}'>${resultado}</p>`;
}

cruz.addEventListener('click', cerrado);
function cerrado() {
    divReglas.classList.toggle('cerrado');
}

btnReglas.addEventListener('click', abrir);
function abrir () {
    divReglas.classList.toggle('cerrado');
}

function generarMejorPuntaje() {
    if (mejorPuntaje <= puntaje) {
        mejorPuntaje = puntaje;
    } else {
        mejorPuntaje = mejorPuntaje;
    }
    localStorage.setItem('mejoresPuntos', mejorPuntaje);
    bestScore.innerHTML=`Mejor puntaje: ${mejorPuntaje}`;
}