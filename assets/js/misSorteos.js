document.getElementById("btnInicio").href = "../pages/inicio.html";
document.getElementById("btnMisSorteos").href = "../pages/misSorteos.html";
document.getElementById("nameUsuario").textContent = localStorage.getItem("usuario");

document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../pages/presentacion.html";
});

document.getElementById("btnCrearNuevoSorteo").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "../pages/crear.html";
});

//recuperamos todos los sorteos del localStorage, los sorteos se guardan como un array de objetos
const sorteos = JSON.parse(localStorage.getItem("sorteos")) || [];
const contenedor = document.getElementById("cardsSorteos");


sorteos.forEach((sorteo, index) => {
    const card = `
    <div class="col-md-3 col-sm-6 col col-12 mb-3" data-card-index="${index}">
        <div style="background: #000; border: 1px solid rgba(255,215,0,0.3); border-left: 3px solid var(--neon-gold); border-radius: 0.5rem; box-shadow: 0 0 15px rgba(255,215,0,0.15);">
            <div class="p-3">
                <h5 style="font-family: 'Black Ops One', cursive; color: var(--neon-cyan); text-shadow: 0 0 10px var(--neon-cyan); letter-spacing: .1em;">
                    ${sorteo.nombre}
                </h5>
                <p style="color: var(--neon-gold); text-shadow: 0 0 6px var(--neon-gold); margin-bottom: .3rem;">
                    📅 ${sorteo.fecha}
                </p>
                <p style="color: var(--neon-gold); text-shadow: 0 0 6px var(--neon-gold); margin-bottom: .3rem;">
                    💰 $${sorteo.presupuesto}
                </p>
                <p style="color: var(--neon-pink); text-shadow: 0 0 6px var(--neon-pink); margin-bottom: 0;">
                    👥 ${sorteo.participantes.length} participantes
                </p>
            </div>
            <div style="border-top: 1px solid rgba(255,215,0,0.2);" class="text-center p-2 d-flex flex-wrap gap-2 justify-content-center">
                <button class="btn btn-card btnDetalles" data-index="${index}">Detalles</button>
                <button class="btn btn-eliminar-sorteo" data-index="${index}">Eliminar</button>
            </div>
        </div>
    </div>`;
    contenedor.insertAdjacentHTML('beforeend', card);
});

document.getElementById('cardsSorteos').addEventListener('click', function(e) {
    const btnDetalles = e.target.closest('.btnDetalles');
    if (btnDetalles) {
        const index = btnDetalles.dataset.index;
        const sorteo = sorteos[index];

        document.getElementById('modal-nombre').textContent = sorteo.nombre;
        document.getElementById('modal-organizador').textContent = sorteo.organizador;
        document.getElementById('modal-evento').textContent = sorteo.evento;
        document.getElementById('modal-fecha').textContent = sorteo.fecha;
        document.getElementById('modal-presupuesto').textContent = sorteo.presupuesto;

        const lista = document.getElementById('modal-participantes');
        lista.innerHTML = '';
        sorteo.participantes.forEach(p => {
            const excepcionesList = sorteo.excepciones[p]?.length > 0 
                ? ` — excepciones: ${sorteo.excepciones[p].join(', ')}` 
                : '';
            lista.innerHTML += `<li>${p}${excepcionesList}</li>`;
        });

        new bootstrap.Modal(document.getElementById('modalDetalles')).show();
    }

    const btnEliminar = e.target.closest('.btn-eliminar-sorteo');
    if (btnEliminar) {
        const index = btnEliminar.dataset.index;
        sorteos.splice(index, 1);
        localStorage.setItem("sorteos", JSON.stringify(sorteos));
        location.reload();
    }
});
