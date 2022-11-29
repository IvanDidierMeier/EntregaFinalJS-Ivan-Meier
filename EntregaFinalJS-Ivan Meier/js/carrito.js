let prodDelCarrito = localStorage.getItem("productos-en-carrito");
prodDelCarrito = JSON.parse(prodDelCarrito);

const contCarritoVacio = document.querySelector("#carrito-vacio");
const contCarritoProd = document.querySelector("#carrito-productos");
const contCarritoAcc = document.querySelector("#carrito-acciones");
const contCarritoCompra = document.querySelector("#carrito-comprado");
let buttonBorrar = document.querySelectorAll(".carrito-producto-eliminar");
const buttonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contTotal = document.querySelector("#total");
const buttonCompra = document.querySelector("#carrito-acciones-comprar");

document.getElementById("carrito-acciones-comprar").onclick = function(){
    window.confirm('Atencion estas a punto de comprar los productos seleccionados!');
}

function cargarProductosCarrito() {
    if (prodDelCarrito && prodDelCarrito.length > 0) {

        contCarritoVacio.classList.add("disabled");
        contCarritoProd.classList.remove("disabled");
        contCarritoAcc.classList.remove("disabled");
        contCarritoCompra.classList.add("disabled");
    
        contCarritoProd.innerHTML = "";
    
        prodDelCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contCarritoProd.append(div);
        })
    
    } else {
        contCarritoVacio.classList.remove("disabled");
        contCarritoProd.classList.add("disabled");
        contCarritoAcc.classList.add("disabled");
        contCarritoCompra.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    buttonBorrar = document.querySelectorAll(".carrito-producto-eliminar");

    buttonBorrar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = prodDelCarrito.findIndex(producto => producto.id === idBoton);
    
    prodDelCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(prodDelCarrito));

}

buttonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    prodDelCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(prodDelCarrito));
    cargarProductosCarrito();
}


function actualizarTotal() {
    const totalCalculado = prodDelCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

buttonCompra.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    prodDelCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(prodDelCarrito));
    
    contCarritoVacio.classList.add("disabled");
    contCarritoProd.classList.add("disabled");
    contCarritoAcc.classList.add("disabled");
    contCarritoCompra.classList.remove("disabled");

}