document.getElementById("btnInicio").href = "../Publi/inicio.html";
document.getElementById("btnMisSorteos").href = "../Publi/misSorteos.html";
document.getElementById("nameUsuario").textContent = localStorage.getItem("usuario");

document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../Publi/presentacion.html";
});

                                
const sorteos = JSON.parse(localStorage.getItem("sorteos")) || [];
const contenedor = document.getElementById("allSorteos");

sorteos.forEach((sorteo, index) => {
    const card = `
        <div class="d-flex justify-content-between align-items-center bg-light rounded-3 p-3 mb-2 shadow-sm" data-card-index="${index}">
            <p>${sorteo.nombre}</p>
            <div>
                <button class="btn btn-sm btn-sortear me-1" data-index="${index}">Sortear</button>
            </div>
        </div>`;
    contenedor.insertAdjacentHTML('beforeend', card);
});

//Aqui es donde inician todos los problemas, se necesita que ningun bobo haya creado el sorteo
function sortear(sorteo) {
    const { participantes, excepciones } = sorteo;
    let intentos = 0;
    const maxIntentos = 100;

    while (intentos < maxIntentos) {
        const barajado = [...participantes].sort(() => Math.random() - 0.5);

        const resultado = {};
        let valido = true;

        for (let i = 0; i < participantes.length; i++) {
            const dador = participantes[i];
            const receptor = barajado[i];

            if (dador === receptor || excepciones[dador]?.includes(receptor)) {
                valido = false;
                break;
            }

            resultado[dador] = receptor;
        }

        if (valido) return resultado;
        intentos++;
    }

    return null;
}

document.getElementById('allSorteos').addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-sortear');
    if (!btn) return;

    const index = btn.dataset.index;
    const sorteo = sorteos[index];
    const resultado = sortear(sorteo);

    if (!resultado) {
        alert("Algo salio mal, crea un nuevo sorteo");
        return;
    }

    sorteos[index].resultado = resultado;
    localStorage.setItem("sorteos", JSON.stringify(sorteos));

    const overlay = document.getElementById('ruletaSortech');

    overlay.classList.remove('d-none');

    setTimeout(() => {
        overlay.classList.add('d-none');
        mostrarResultados(sorteos[index]);
    }, 5000); 
    
    sorteos.splice(index, 1);
    localStorage.setItem("sorteos", JSON.stringify(sorteos));

    document.querySelector(`[data-card-index="${index}"]`).remove();

    document.querySelectorAll('[data-card-index]').forEach((card, i) => {
        card.dataset.cardIndex = i;
    card.querySelector('.btn-sortear').dataset.index = i;
});

});


function mostrarResultados(sorteo) {
    document.getElementById('modal-resultado-nombre').textContent = sorteo.nombre;

    const contenedor = document.getElementById('resultado-cards');
    contenedor.innerHTML = '';

    Object.entries(sorteo.resultado).forEach(([dador, receptor]) => {
        const card = `
            <div class="col-md-6 col-sm-12">
                <div class="card text-center p-3 shadow-sm">
                    <p class="fw-semibold mb-1">${dador}</p>
                    <p class="display-6">🎁</p>
                    <p class="text-muted mb-0">le toca regalarle a</p>
                    <h5 class="mt-1 fw-bold">${receptor}</h5>
                </div>
            </div>`;
        contenedor.insertAdjacentHTML('beforeend', card);
    });

    new bootstrap.Modal(document.getElementById('modalResultados')).show();
}
