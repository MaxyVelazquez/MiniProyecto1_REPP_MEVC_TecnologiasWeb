//guardaremos todos los participantes del sorteo en este array, para luego guardarlo en el localStorage
let participantes = [];
let nameEvento = "";
let nombreSorteo = "";
let presupuesto = "";
let fechaSorteo = "";
let excepciones = {};


document.getElementById("btnInicio").href = "../Publi/inicio.html";
document.getElementById("btnMisSorteos").href = "../Publi/misSorteos.html";


document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../Publi/presentacion.html";
});

document.getElementById("nameUsuario").textContent = localStorage.getItem("usuario");

document.getElementById("btnAgregar").addEventListener("click", function(e) {
    e.preventDefault();
    const nombreAux = document.getElementById('input-nombre').value.trim();
    if (!nombreAux) return;

    //tarjeta esta agregando el nombre del participante
 
    const tarjeta = `
        <div class="nombreCard border-warning d-flex justify-content-between align-items-center rounded-3 p-3 mb-2 shadow-sm " draggable="true" data-nombre="${nombreAux}" >
            <p>${nombreAux}</p>
            <div style="position: relative;">
                <button class="btn btn-sm me-1 btn-excepciones" data-nombre="${nombreAux}" >...</button>
                <div class="cardNombre excepciones-dropdown" id="dropdown-${nombreAux}">
                    <p class="fw-semibold mb-2">Excepciones</p>
                    <div class="excepciones-lista"></div>
                </div>
            </div>
        </div>`;

    participantes.push(nombreAux);
    excepciones[nombreAux] = [];
    document.getElementById('participantesSorteo').insertAdjacentHTML('beforeend', tarjeta);
    document.getElementById('input-nombre').value = '';
});

//boton de el festividad del evento
document.getElementById("btnAgregarEvento").addEventListener("click", function(e) {
    e.preventDefault();
    const nombreEventoAux = document.getElementById('nuevo-evento').value.trim();
    if (!nombreEventoAux) return;

    document.querySelectorAll('#lista-eventos .list-group-item').forEach(li => {
        li.classList.remove('active');
    });


    const tarjetaEvento = `
        <li class="list-group-item list-group-item-action active">${nombreEventoAux}</li>`;

    nameEvento = nombreEventoAux;
    document.getElementById('lista-eventos').insertAdjacentHTML('beforeend', tarjetaEvento);
    document.getElementById('nuevo-evento').value = '';

});

//Eto es para el listado de los eventos, en caso de que se seleccione uno
document.getElementById('lista-eventos').addEventListener('click', function(e) {
    const item = e.target.closest('li');
    if (!item) return;

    // Quitamos la seleccion anterior
    document.querySelectorAll('#lista-eventos .list-group-item').forEach(li => {
        li.classList.remove('active');
    });

    item.classList.add('active');
    nameEvento = item.textContent;
});


//boton nombre del sorteo
document.getElementById("btnNombreSorteo").addEventListener("click", function(e) {
    e.preventDefault();
    const nombreSorteoAux = document.getElementById('NombreSorteo').value.trim();
    if (!nombreSorteoAux) return;
    nombreSorteo = nombreSorteoAux;
});

//boton para añadir un presupuesto al sorteo
document.getElementById("btnAgregarPresupuesto").addEventListener("click", function(e) {
    e.preventDefault();
    const presupuestoAux = document.getElementById('nuevo-presupuesto').value.trim();
    if (!presupuestoAux) return;

    document.querySelectorAll('#lista-presupuesto .list-group-item').forEach(li => {
        li.classList.remove('active');
    });
    
    const tarjetaEvento = `
        <li class="list-group-item list-group-item-action active" >${presupuestoAux}</li>`;
    presupuesto = presupuestoAux;
    document.getElementById('lista-presupuesto').insertAdjacentHTML('beforeend', tarjetaEvento);
    document.getElementById('nuevo-presupuesto').value = '';

});

//Seleccionar un presupuesto del listado
document.getElementById('lista-presupuesto').addEventListener('click', function(e) {
    const item = e.target.closest('li');
    if (!item) return;

    document.querySelectorAll('#lista-presupuesto .list-group-item').forEach(li => {
        li.classList.remove('active');
    });

    item.classList.add('active');
    presupuesto = item.textContent;
});

//guardamos el valor de la fecha del sorteo
flatpickr("#fechaEvento", {
            dateFormat: "d F, Y",
            locale: "es",
            minDate: "today",
            allowInput: false,
            onChange: function(selectedDates, dateStr){
                fechaSorteo = dateStr;
            }

        });

//Boton para crear el sorteo, aqui es donde se guardaria toda la informacion del sorteo en el localStorage
document.getElementById("btnGenerarSorteo").addEventListener("click", function(e) {
    e.preventDefault();

    if(!nameEvento){
        Swal.fire({
            title: '¡Algo salió mal!',
            text: 'No has seleccionado un evento para el sorteo',
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

    if(!nombreSorteo){
        Swal.fire({
            title: '¡Algo salió mal!',
            text: 'No has seleccionado un nombre para el sorteo',
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

    if(!presupuesto){
        Swal.fire({
            title: '¡Algo salió mal!',
            text: 'No has seleccionado un presupuesto para el sorteo',
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

    if(participantes.length === 0){
        Swal.fire({
            title: '¡Algo salió mal!',
            text: 'No has seleccionado participantes para el sorteo',
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

    if(!fechaSorteo){
        Swal.fire({
            title: '¡Algo salió mal!',
            text: 'No has seleccionado una fecha para el sorteo',
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


    const sorteo = {
        organizador: localStorage.getItem("usuario"),
        evento: nameEvento,
        nombre: nombreSorteo,
        presupuesto: presupuesto,
        fecha: fechaSorteo,
        participantes: participantes,
        excepciones: excepciones
    };

    // Guardamos el sorteo en el localStorage
    let sorteosGuardados = JSON.parse(localStorage.getItem("sorteos")) || [];
    sorteosGuardados.push(sorteo);
    localStorage.setItem("sorteos", JSON.stringify(sorteosGuardados));

    Swal.fire({
        title: '¡Sorteo Creado!',
        text: 'Has creado un nuevo sorteo',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        background: '#000',
        color: '#ffd700',
        iconColor: '#39ff14',
        customClass: {
            confirmButton: 'btn-swal-confirm',
            popup: 'popup-swal'
        }
    }).then(() => {
        window.location.href = "../Publi/inicio.html";
    });
});


//Aqui es donde va la logica para eliminar usuarios arrastrandolos al contenedor de eliminarUsuario
let nombreArrastrado = null;
let tarjetaArrastrada = null;

document.getElementById('participantesSorteo').addEventListener('dragstart', function(e) {
    const tarjeta = e.target.closest('[data-nombre]');
    if (!tarjeta) return;

    nombreArrastrado = tarjeta.dataset.nombre;
    tarjetaArrastrada = tarjeta;
    tarjeta.classList.add('opacity-50');
});

document.getElementById('participantesSorteo').addEventListener('dragend', function(e) {
    const tarjeta = e.target.closest('[data-nombre]');
    if (tarjeta) tarjeta.classList.remove('opacity-50');
    zonaEliminar.classList.remove('border-danger', 'text-danger', 'bg-danger-subtle');
});

const zonaEliminar = document.getElementById('eliminarUsuario');

zonaEliminar.addEventListener('dragover', function(e) {
    e.preventDefault(); 
});

zonaEliminar.addEventListener('dragenter', function() {
    zonaEliminar.classList.add('border-danger', 'text-danger', 'bg-danger-subtle');
});

zonaEliminar.addEventListener('dragleave', function() {
    if (zonaEliminar.contains(e.relatedTarget)) return;
    zonaEliminar.classList.remove('border-danger', 'text-danger', 'bg-danger-subtle');
});

zonaEliminar.addEventListener('drop', function(e) {
    e.preventDefault();
    zonaEliminar.classList.remove('border-danger', 'text-danger', 'bg-danger-subtle');

    if (!nombreArrastrado || !tarjetaArrastrada) return;

    participantes = participantes.filter(p => p !== nombreArrastrado);
    delete excepciones[nombreArrastrado];

    tarjetaArrastrada.remove();

    nombreArrastrado = null;
    tarjetaArrastrada = null;
});


//popover para las excepciones, aqui es donde se muestra el dropdown de excepciones al hacer click en los 3 puntitos de cada participante

document.getElementById('participantesSorteo').addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-excepciones');
    if (!btn) return;

    const nombre = btn.dataset.nombre;
    const dropdown = document.getElementById(`dropdown-${nombre}`);

    // Cerrar cualquier otro dropdown abierto
    document.querySelectorAll('.excepciones-dropdown.show').forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
    });

    const lista = dropdown.querySelector('.excepciones-lista');
    lista.innerHTML = '';

    participantes
        .filter(p => p !== nombre)
        .forEach(p => {
            const checked = excepciones[nombre].includes(p) ? 'checked' : '';
            lista.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input excepcion-check" type="checkbox" 
                        id="exc-${nombre}-${p}" 
                        data-owner="${nombre}" 
                        data-excepcion="${p}" 
                        ${checked}>
                    <label class="form-check-label" for="exc-${nombre}-${p}">${p}</label>
                </div>`;
        });

    dropdown.classList.toggle('show');
});

// Guardar excepción al hacer click en checkbox
document.getElementById('participantesSorteo').addEventListener('change', function(e) {
    const check = e.target.closest('.excepcion-check');
    if (!check) return;

    const owner = check.dataset.owner;
    const excepcion = check.dataset.excepcion;

    if (check.checked) {
        excepciones[owner].push(excepcion);
    } else {
        excepciones[owner] = excepciones[owner].filter(e => e !== excepcion);
    }
});

// Cerrar dropdown al click fuera
document.addEventListener('click', function(e) {
    if (!e.target.closest('.btn-excepciones') && !e.target.closest('.excepciones-dropdown')) {
        document.querySelectorAll('.excepciones-dropdown.show').forEach(d => {
            d.classList.remove('show');
        });
    }
});

//Aregar o quitar al organizador
document.getElementById('checkOrganizador').addEventListener('change', function() {
    const nombreOrganizador = localStorage.getItem("usuario");

    if (this.checked) {
        participantes.push(nombreOrganizador);
        excepciones[nombreOrganizador] = [];
    } else {
        participantes = participantes.filter(p => p !== nombreOrganizador);
        delete excepciones[nombreOrganizador];
    }
});