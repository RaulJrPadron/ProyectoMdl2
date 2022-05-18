if(localStorage.getItem('usuario') == null) {
    window.location.href = './index.html'
}

window.addEventListener('load', function() {
    datosUsuario();
})

function datosUsuario(){
    const datoUsuario = JSON.parse(localStorage.getItem('usuario'));
    const id = document.querySelector('#datosUsuarioId');
    const nombre = document.querySelector('#datosUsuarioNombre');
    const saldo = document.querySelector('#datosUsuarioSaldo');
    const imagen = document.querySelector('#datosUsuarioImagen');
    nombre.innerHTML = datoUsuario.nombre;
    // saldo.innerHTML = datosUsuario.saldo;
    imagen.src = datoUsuario.imagen
    // console.log(datosUsuario)
    // console.log(nombre)
    // console.log(saldo)
    // console.log(datosUsuario.imagen)
    escuchaEventoInput();
    escuchaEventoConsultar(datoUsuario);
    escuchaEventoIngresar(datoUsuario);
    escuchaEventoRetirar(datoUsuario);
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

const escuchaEventoIngresar = (datoUsuario) => {
    const elementoPadre = document.getElementById("ElementoPadre");
    elementoPadre.addEventListener("click", (event) => {
        // event.preventDefault(); //Se comento porque había un ERROR - Sesión Sensei Alejandro
        if(event.target.tagName === "BUTTON" && event.target.classList.contains("btn-success")){
            var InputNumber = document.getElementById('InputNumber');
            // console.log("Input",InputNumber.value)
            if(InputNumber.value == null || InputNumber.value == ''){
                alert("Debe ingresar un número para continuar");
            }else{
                // console.log(InputNumber)
                if((parseInt(datoUsuario.saldo) + parseInt(InputNumber.value)) < 991){
                    localStorage.setItem('usuario', JSON.stringify({
                        ...datoUsuario,
                        saldo: (parseInt(datoUsuario.saldo) + parseInt(InputNumber.value))
                    }));
                    datosUsuario()
                    event.preventDefault()
                    Swal.fire({
                        icon: 'success',
                        title: 'Monto ingresado correctamente. Consulte saldo',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    // alert("Monto ingresado correctamente. Consulte saldo")
                }else{
                    event.preventDefault()
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Excede el límite. Ingrese otra cantidad.'
                    });
                    // alert("Excede el límite. Ingrese otra cantidad.");
                }
            }
        };
    });
}

const escuchaEventoRetirar = (datoUsuario) => {
    const elementoPadre = document.getElementById("ElementoPadre");
    elementoPadre.addEventListener("click", (event) => {
        console.log("click")
        if(event.target.tagName === "BUTTON" && event.target.classList.contains("btn-danger")){ 
            var InputNumber = document.getElementById('InputNumber');
            if(InputNumber.value == null || InputNumber.value == ''){
                alert("Debe ingresar un número para continuar")
            }else{
                var resta = parseInt(datoUsuario.saldo) - parseInt(InputNumber.value)
                if(resta > 9)
                {
                    localStorage.setItem('usuario', JSON.stringify({
                        ...datoUsuario,
                        saldo: resta,
                    }));
                    datosUsuario()
                    event.preventDefault()
                    Swal.fire({
                        icon: 'success',
                        title: 'Retiro Existoso. Consulte saldo',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    // alert("Retiro Existoso. Consulte saldo")
                }else{
                    event.preventDefault()
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Su cuente debe tener un mínimo de $10.'
                    });
                }
            }  
        }; 
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