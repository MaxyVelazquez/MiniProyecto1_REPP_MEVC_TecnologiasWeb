document.getElementById("btnInicio").href = "../pages/inicio.html";
document.getElementById("btnMisSorteos").href = "../pages/misSorteos.html";
document.getElementById("nameUsuario").textContent = localStorage.getItem("usuario");

document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../pages/presentacion.html";
});

                                
const sorteos = JSON.parse(localStorage.getItem("sorteos")) || [];
const contenedor = document.getElementById("allSorteos");

sorteos.forEach((sorteo, index) => {
    const card = `
    <div class="d-flex justify-content-between align-items-center p-3 mb-2 rounded-3" 
        data-card-index="${index}"
        style="background: #000; border: 1px solid rgba(255,215,0,0.3); border-left: 3px solid var(--neon-gold); box-shadow: 0 0 10px rgba(255,215,0,0.1);">
        <p style="color: var(--neon-gold); text-shadow: 0 0 6px var(--neon-gold); margin: 0; letter-spacing: .1em;">
            ${sorteo.nombre}
        </p>
        <button class="btn btn-sortear btn-sm me-1" data-index="${index}"
            style="background: transparent; border: 2px solid var(--neon-cyan); color: var(--neon-cyan); font-family: 'Black Ops One', cursive; text-shadow: 0 0 8px var(--neon-cyan); letter-spacing: .1em;">
            Sortear
        </button>
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
        Swal.fire({
            title: '¡Algo salió mal!',
            text: 'Algo salio mal, crea un nuevo sorteo',
            confirmButtonText: 'Aceptar',
            background: '#000',
            color: '#ffd700',
            confirmButtonColor: 'transparent',
            customClass: {
                confirmButton: 'btn-swal-confirm',
                popup: 'popup-swal'
            }
        });
        return;
    }

    sorteos[index].resultado = resultado;
    localStorage.setItem("sorteos", JSON.stringify(sorteos));


    mostrarResultados(sorteos[index]);

    
    sorteos.splice(index, 1);
    localStorage.setItem("sorteos", JSON.stringify(sorteos));

    document.querySelector(`[data-card-index="${index}"]`).remove();

    document.querySelectorAll('[data-card-index]').forEach((card, i) => {
        card.dataset.cardIndex = i;
        card.querySelector('.btn-sortear').dataset.index = i;
    });

});


function mostrarResultados(sorteo) {
    const contenedor = document.getElementById('resultado-cards');
    contenedor.innerHTML = '';

    Object.entries(sorteo.resultado).forEach(([dador, receptor]) => {
        const card = `
            <div class="col-md-6 col-sm-12">
                <div class="text-center p-3 rounded-3" style="background: #000; border: 1px solid rgba(255,215,0,0.3); border-left: 3px solid var(--neon-red); box-shadow: 0 0 15px rgba(255,45,85,0.15);">
                    <p style="font-family: 'Black Ops One', cursive; color: var(--neon-cyan); text-shadow: 0 0 8px var(--neon-cyan); letter-spacing: .1em; margin-bottom: .3rem;">
                        ${dador}
                    </p>
                    <p style="font-size: 2rem; margin: .3rem 0;">🎁</p>
                    <p style="color: rgba(255,215,0,0.6); font-size: .75rem; margin-bottom: .3rem; letter-spacing: .15em;">
                        le toca regalarle a
                    </p>
                    <h5 style="font-family: 'Black Ops One', cursive; color: var(--neon-gold); text-shadow: 0 0 12px var(--neon-gold); letter-spacing: .1em;">
                        ${receptor}
                    </h5>
                </div>
            </div>`;
        contenedor.insertAdjacentHTML('beforeend', card);
    });

    new bootstrap.Modal(document.getElementById('modalResultados')).show();
}
