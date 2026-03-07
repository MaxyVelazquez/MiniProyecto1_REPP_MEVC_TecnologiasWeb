document.getElementById("crear-button").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../pages/crear.html";
});

document.getElementById("ver-button").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../pages/misSorteos.html";
});

document.getElementById("iniciar-button").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../pages/sortear.html";
});

document.getElementById("btnInicio").href = "../pages/inicio.html";
document.getElementById("btnMisSorteos").href = "../pages/misSorteos.html";
document.getElementById("nameUsuario").textContent = localStorage.getItem("usuario");

document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../pages/presentacion.html";
});
