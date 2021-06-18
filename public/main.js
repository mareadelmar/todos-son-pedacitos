const btnPrincipal = document.querySelector(".btn-principal");
const secPrincipal = document.querySelector(".contenedor-principal");
const secLoader = document.querySelector(".contenedor-loader");
const secPedacitos = document.querySelector(".contenedor-pedacitos");
const form = document.querySelector("#form");

const ventanaPedacito = document.querySelector(".ventana-pedacito");
const ventanaObraautor = document.querySelector(".ventana-obraautor");
const btnOtroPedacito = document.querySelector(".btn-ventana");
let pedacitos = [];

btnPrincipal.addEventListener("click", quieroPedacito);
btnOtroPedacito.addEventListener("click", sortearPedacito);
form.addEventListener("submit", mandarPedacito);

document.addEventListener("DOMContentLoaded", () => {
    fetch("pedacitos.json")
        .then((res) => res.json())
        .then((res) => {
            pedacitos = res;
            //console.log(pedacitos);
        });
});

function quieroPedacito() {
    secPrincipal.style.display = "none";
    secLoader.style.display = "block";
    loader();
}

const loader = () => {
    setTimeout(() => {
        secLoader.style.display = "none";
        secPedacitos.style.display = "block";
        sortearPedacito();
    }, 3000);
};

function sortearPedacito() {
    for (let i = 0; i < 1; i++) {
        const cantidadPedacitos = pedacitos.length - 1;
        pedacitos[i] = pedacitos[Math.round(Math.random() * cantidadPedacitos)];

        ventanaPedacito.innerHTML = `"${pedacitos[i].pedacito.replace(
            /\n/g,
            "<br />"
        )}"`;
        ventanaObraautor.innerHTML = `<strong>${pedacitos[i].obraautor}</strong>`;
    }
}

function mandarPedacito(e) {
    e.preventDefault();
    const formPedacito = document.querySelector("#form-pedac").value;
    const formAutorx = document.querySelector("#form-autorx").value;
    const formObra = document.querySelector("#form-obra").value;

    if (!formAutorx.trim()) {
        mostrarMensaje("Completá todos los campos, che :)", "error");
        return;
    }
    if (!formPedacito.trim()) {
        mostrarMensaje("Completá todos los campos, che :)", "error");
        return;
    }
    if (!formObra.trim()) {
        mostrarMensaje("Completá todos los campos, che :)", "error");
        return;
    }

    const aporte = {
        id: Date.now(),
        pedacito: formPedacito,
        obraautor: `${formObra} – ${formAutorx}`,
        fecha: new Date().toISOString(),
    };
    console.log(aporte);
    guardarFirestore(aporte);
}

function guardarFirestore(aporte) {
    try {
        const data = firebase
            .firestore()
            .collection("pedacitos-aportes")
            .add(aporte);
        mostrarMensaje("✨ Aporte recibido. ¡Gracias! ✨");
    } catch (e) {
        console.error(e);
    }
    form.reset();
}

function mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.textContent = mensaje;

    if (tipo === "error") {
        divMensaje.classList.add("errorMensaje");
    }
    const container = document.querySelector(".btn-container");
    form.insertBefore(divMensaje, container);

    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
}
