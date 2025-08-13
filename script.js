const tablero = document.getElementById("tablero");
const reiniciarBtn = document.getElementById("reiniciar");
const puntajeElement = document.getElementById("puntos-actuales");
let sumarPuntaje = 0;



let cartas = ["🍎", "🍌", "🍒", "🍎", "🍌", "🍒"];
let primeraCarta = null;
let bloqueo = false;

function iniciarJuego() {
    tablero.innerHTML = "";
    cartas = cartas.sort(() => 0.5 - Math.random());
    
    cartas.forEach((emoji) => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.valor = emoji;
        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
    });
}

function voltearCarta() {
    if (bloqueo || this.classList.contains("volteada")) return;
    
    this.textContent = this.dataset.valor;
    this.classList.add("volteada");
    
    if (!primeraCarta) {
        primeraCarta = this;
    } else {
        if (primeraCarta.dataset.valor === this.dataset.valor) {
            primeraCarta = null;
            sumarPuntaje +=10;
            puntajeElement.textContent=sumarPuntaje;
        
        } else {
            bloqueo = true;
            sumarPuntaje -= 2;
            console.log(sumarPuntaje);
                      puntajeElement.textContent=sumarPuntaje;
            setTimeout(() => {
                primeraCarta.textContent = "";
                this.textContent = "";
                primeraCarta.classList.remove("volteada");
                this.classList.remove("volteada");
                primeraCarta = null;
                bloqueo = false;
            }, 800);
        }
    }
}
function actualizarDisplayPuntaje(nuevoPuntaje) {
        const elementoPuntaje = document.getElementById('puntos-actuales');
        if (elementoPuntaje) {
            elementoPuntaje.textContent = nuevoPuntaje;
        }
    }


reiniciarBtn.addEventListener("click", iniciarJuego);
iniciarJuego();