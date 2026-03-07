document.getElementById("formularioNombre").addEventListener("submit", function(e) {
    e.preventDefault();

    //PRIMERO CHECAMOS QUE EL FORMULARIO NO SE QUEDE VACIO
    if (!this.checkValidity()) {
        this.classList.add("was-validated");
        return;
    }

    //VAMOS A LA PABTALLA DE INICIO
    localStorage.setItem("usuario", document.getElementById("nombre").value);
    window.location.href = "../pages/inicio.html";
});