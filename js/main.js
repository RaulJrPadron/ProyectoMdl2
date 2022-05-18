window.addEventListener('DOMContentLoaded', ()=>{
    crearhtml();
    escuchaEventoIngresar();
});

const llamadaApi = () => {
    const CuentasBanco = [
        {
            id: 1,
            nombre: "Mali",
            saldo: 200,
            password: "cuenta1",
            imagen: "./images/profile_Mali.jpg"
        },
        {
            id: 2,
            nombre: "Gera",
            saldo: 290,
            password: "cuenta2",
            imagen: "./images/profile_Gera.jpg"
        },
        {
            id: 3,
            nombre: "Maui",
            saldo: 67,
            password: "cuenta3",
            imagen: "./images/profile_Maui.jpg"
        }
    ];
    return CuentasBanco;
}

const crearhtml = () => {
    const elementoPadre = document.getElementById('ElementoPadre');
    const cuentas = llamadaApi();
    cuentas.forEach((cuenta) => {
        const elementoHijo = document.createElement("div");
        elementoHijo.classList.add("col-4", "d-flex", "flex-column");
        elementoHijo.innerHTML = `<img class = "img-profile" height = 500  src="${cuenta.imagen}" data-id = "cuenta-${cuenta.id}">
        <div class="d-flex justify-content-center">
            <button id = "BotonIngresar" class = "btn btn-primary m-2" data-id = "cuenta-${cuenta.id}">Ingresar</button>
        </div>
        `;
        elementoPadre.appendChild(elementoHijo);
    });
};

const escuchaEventoIngresar = () => {
    const pass = llamadaApi();
    const ElementoPadre = document.getElementById("ElementoPadre");
    ElementoPadre.addEventListener("click", (event) => {
        // console.log(event);
        if(event.target.tagName === "BUTTON"
        
        && event.target.classList.contains("btn-primary") || event.target.tagName === "IMG" && event.target.classList.contains("img-profile")){
            const id = event.target.dataset.id.split("-")[1]
            
            // console.log(event);
            // console.log(event.target.tagName);
            // console.log(event.target.classList);
            let x = prompt("Ingrese contraseña");
            pass.forEach(item => {
                if(item.id == id){
                    if(item.password == x){
                        // alert("Iniciaste sesion")
                        event.preventDefault();
                        localStorage.setItem('usuario', JSON.stringify({
                            id: item.if,
                            nombre: item.nombre,
                            saldo: item.saldo,
                            imagen: item.imagen
                        }));
                        window.location.href = './cuenta.html'
                    }
                    else {
                        alert("Contraseña incorrecta");
                    };
                };
            });
        };
    });
};