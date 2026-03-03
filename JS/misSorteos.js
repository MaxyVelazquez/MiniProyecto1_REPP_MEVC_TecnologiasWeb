document.getElementById("btnInicio").href = "../Publi/inicio.html";
document.getElementById("btnMisSorteos").href = "../Publi/misSorteos.html";
document.getElementById("nameUsuario").textContent = localStorage.getItem("usuario");

document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../Publi/presentacion.html";
});
