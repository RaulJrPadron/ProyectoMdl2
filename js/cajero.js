if(localStorage.getItem('usuario') == null) {
    window.location.href = './index.html'
}

window.addEventListener('load', function() {
    datosUsuario();
})

function datosUsuario(){
    const datosUsuario = JSON.parse(localStorage.getItem('usuario'));
    const id = document.querySelector('#datosUsuarioId');
    const nombre = document.querySelector('#datosUsuarioNombre');
    const saldo = document.querySelector('#datosUsuarioSaldo');
    const imagen = document.querySelector('#datosUsuarioImagen');
    nombre.innerHTML = datosUsuario.nombre;
    // saldo.innerHTML = datosUsuario.saldo;
    imagen.src = datosUsuario.imagen
    // console.log(datosUsuario)
    // console.log(nombre)
    // console.log(saldo)
    // console.log(datosUsuario.imagen)
    escuchaEventoInput();
    escuchaEventoConsultar(datosUsuario);
    escuchaEventoIngresar(datosUsuario);
    escuchaEventoRetirar(datosUsuario);
}

const escuchaEventoConsultar = (datosUsuario) => {
    
    const elementoPadre = document.getElementById("ElementoPadre");
    const datosaldo = document.getElementById("datosUsuarioSaldo")
    elementoPadre.addEventListener("click", (event) => {
        if(event.target.tagName === "BUTTON" && event.target.classList.contains("btn-primary")){
            const consultaSaldo = document.getElementById("consultaSaldo");
            consultaSaldo.classList.remove("d-none");
            datosaldo.innerHTML = `$` + datosUsuario.saldo;
        };
    });
};

const escuchaEventoIngresar = (datosUsuario) => {
    // console.log(datosUsuario.saldo)
    const elementoPadre = document.getElementById("ElementoPadre");
    // var InputNumber = document.querySelector('InputNumber');
    // var res = saldo + InputNumber;
    // console.log(res)
    elementoPadre.addEventListener("click", (event) => {
        // event.preventDefault();
        console.log("click")
        if(event.target.tagName === "BUTTON" && event.target.classList.contains("btn-success")){
            
            var InputNumber = document.getElementById('InputNumber').value;
            console.log(InputNumber)
            var suma = parseInt(datosUsuario.saldo) + parseInt(InputNumber)
            localStorage.setItem('usuario', JSON.stringify({
                ...datosUsuario,
                saldo: suma,
            }));
        };
        datosUsuario();
    });
}

const escuchaEventoRetirar = (datosUsuario) => {
    // console.log(datosUsuario.saldo)
    const elementoPadre = document.getElementById("ElementoPadre");
    elementoPadre.addEventListener("click", (event) => {
        console.log("click")
        if(event.target.tagName === "BUTTON" && event.target.classList.contains("btn-danger")){
            
            var InputNumber = document.getElementById('InputNumber').value;
            console.log(InputNumber)
            var resta = parseInt(datosUsuario.saldo) - parseInt(InputNumber)
            localStorage.setItem('usuario', JSON.stringify({
                ...datosUsuario,
                saldo: resta,
            }));
        };
        datosUsuario();
    });
}

const escuchaEventoInput = () => {
    const numberInput = document.getElementById('InputNumber')
    numberInput.addEventListener("keydown", (evento) => {
        if (evento.key == "Enter") {
            // Prevenir
            evento.preventDefault();
            return false;
        }
    });
}