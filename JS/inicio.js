document.getElementById("crear-button").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../Publi/crear.html";
});

document.getElementById("ver-button").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../Publi/misSorteos.html";
});

document.getElementById("iniciar-button").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../Publi/sortear.html";
});

document.getElementById("btnInicio").href = "../Publi/inicio.html";
document.getElementById("btnMisSorteos").href = "../Publi/misSorteos.html";

document.getElementById("nameUsuario").textContent = localStorage.getItem("usuario");

document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../Publi/presentacion.html";
});
