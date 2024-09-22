// Array de cartas
const cartasArray = [
    { nombre: 'kaivolstron', img: 'imagenes/kaivolstron.jpg' },
    { nombre: 'droxar', img: 'imagenes/droxar.jpg' },
    { nombre: 'kruulzatakk', img: 'imagenes/kruulzatakk.jpg' },
    { nombre: 'Risskvalnor', img: 'imagenes/Risskvalnor.jpg' },
    { nombre: 'taliaaranos', img: 'imagenes/taliaaranos.jpg' },
    { nombre: 'xelphor-9-tb', img: 'imagenes/xelphor-9-tb.jpg' },
    { nombre: 'zinrathaal', img: 'imagenes/zinrathaal.jpg' },
    { nombre: 'aelaravoss', img: 'imagenes/aelaravoss.jpg' },
    { nombre: 'kaivolstron', img: 'imagenes/kaivolstron.jpg' },
    { nombre: 'droxar', img: 'imagenes/droxar.jpg' },
    { nombre: 'kruulzatakk', img: 'imagenes/kruulzatakk.jpg' },
    { nombre: 'Risskvalnor', img: 'imagenes/Risskvalnor.jpg' },
    { nombre: 'taliaaranos', img: 'imagenes/taliaaranos.jpg' },
    { nombre: 'xelphor-9-tb', img: 'imagenes/xelphor-9-tb.jpg' },
    { nombre: 'zinrathaal', img: 'imagenes/zinrathaal.jpg' },
    { nombre: 'aelaravoss', img: 'imagenes/aelaravoss.jpg' },
];

let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;

cartasArray.sort(() => 0.5 - Math.random());

const tablero = document.querySelector('.tablero');

function iniciarJuego() {
    // Ocultar la pantalla de inicio
    const pantallaInicio = document.getElementById('inicio');
    pantallaInicio.style.display = 'none';

    const tableroJuego = document.getElementById('juego');
    tableroJuego.style.display = 'grid';

    cartasArray.forEach(carta => {
        const cartaElemento = document.createElement('div');
        cartaElemento.classList.add('carta');
        cartaElemento.dataset.nombre = carta.nombre;

        const imagen = document.createElement('img');
        imagen.src = carta.img;

        cartaElemento.appendChild(imagen);
        tablero.appendChild(cartaElemento);

        cartaElemento.addEventListener('click', voltearCarta);
    });
}

function voltearCarta() {
    if (bloqueado || this === primeraCarta) return;

    this.classList.add('volteada');

    if (!primeraCarta) {
        primeraCarta = this;
    } else {
        segundaCarta = this;
        bloqueado = true;

        comprobarPareja();
    }
}

function comprobarPareja() {
    const esPareja = primeraCarta.dataset.nombre === segundaCarta.dataset.nombre;

    esPareja ? desactivarCartas() : devolverCartas();
}

function desactivarCartas() {
    primeraCarta.removeEventListener('click', voltearCarta);
    segundaCarta.removeEventListener('click', voltearCarta);

    primeraCarta.classList.add('correcta');
    segundaCarta.classList.add('correcta');

    resetearEstado();
}

function devolverCartas() {
    setTimeout(() => {
        primeraCarta.classList.remove('volteada');
        segundaCarta.classList.remove('volteada');

        resetearEstado();
    }, 1000);
}

function resetearEstado() {
    [primeraCarta, segundaCarta] = [null, null];
    bloqueado = false;
}

document.getElementById('boton-inicio').addEventListener('click', iniciarJuego);
