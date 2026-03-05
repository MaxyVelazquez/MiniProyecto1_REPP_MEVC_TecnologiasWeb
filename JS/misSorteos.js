document.getElementById("btnInicio").href = "../Publi/inicio.html";
document.getElementById("btnMisSorteos").href = "../Publi/misSorteos.html";
document.getElementById("nameUsuario").textContent = localStorage.getItem("usuario");

document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../Publi/presentacion.html";
});

document.getElementById("btnCrearNuevoSorteo").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "../Publi/crear.html";
});

//recuperamos todos los sorteos del localStorage, los sorteos se guardan como un array de objetos
const sorteos = JSON.parse(localStorage.getItem("sorteos")) || [];
const contenedor = document.getElementById("cardsSorteos");


sorteos.forEach((sorteo, index) => {
    const card = `
        <div class="col-md-4 col-sm-12">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${sorteo.nombre}</h5>
                    <p class="card-text">${sorteo.fecha}</p>
                    <p class="card-text">$${sorteo.presupuesto}</p>
                    <p class="card-text">${sorteo.participantes.length} participantes</p>
                </div>
                <div class="opciones text-center m-2">
                    <button class="btn btn-card btn-detalles" data-index="${index}">Detalles</button>
                    <button class="btn btn-danger btn-eliminar-sorteo" data-index="${index}">Eliminar</button>
                </div>
            </div>
        </div>`;
    contenedor.insertAdjacentHTML('beforeend', card);
});

document.getElementById('cardsSorteos').addEventListener('click', function(e) {
    const btnDetalles = e.target.closest('.btn-detalles');
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
