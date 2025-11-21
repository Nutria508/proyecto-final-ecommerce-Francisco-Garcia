import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const resumen = document.getElementById("resumen-carrito");


    contenedor.innerHTML = "";
    resumen.innerHTML = "";

    let total = 0;

    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "No hay productos en el carrito";
        contenedor.appendChild(mensaje);
        return;
    } else {



        carrito.forEach((producto, indice) => {

            const tarjeta = document.createElement("article");
            tarjeta.classList.add("tarjeta-carrito-compras");

            const imageContainer = document.createElement("div")
            imageContainer.classList.add("image-container")

            const img = document.createElement("img");
            img.src = `../${producto.img}`;
            img.alt = producto.nombre;

            imageContainer.appendChild(img);

            const titulo = document.createElement("h3");
            titulo.textContent = producto.nombre;

            const precio = document.createElement("p");
            precio.textContent = `$${producto.precio}`;

            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn-eliminar-carrito");

            const imgBtn = document.createElement("img");
            imgBtn.classList.add("image");
            imgBtn.src = "../img/eliminar-producto.png";
            imgBtn.alt = "eliminar producto";
            btnEliminar.appendChild(imgBtn);
            btnEliminar.addEventListener("click", () => {
                eliminarProducto(indice);
                renderizarCarrito();
            });
            tarjeta.appendChild(imageContainer);
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(precio);
            tarjeta.appendChild(btnEliminar);
            contenedor.appendChild(tarjeta);

            total += parseFloat(producto.precio);
        });
        total = Math.round(total * 100) / 100;

        const divResumen = document.createElement("div");

        const text = document.createElement("h3");
        text.textContent = "Total";

        const totalCarrito = document.createElement("h3");
        totalCarrito.textContent = `$${total}`;

        divResumen.appendChild(text);
        divResumen.appendChild(totalCarrito);
        resumen.appendChild(divResumen);

        const imgComprar = document.createElement("img");
        imgComprar.classList.add("image");
        imgComprar.src = "../img/carrito-de-compras.png"
        imgComprar.alt = "Comprar"
        const btnComprar = document.createElement("button");
        btnComprar.classList.add("btn-comprar");
        btnComprar.appendChild(imgComprar);
        btnComprar.addEventListener("click", () => {
            window.location.href = "./compra.html";
            vaciarCarrito();
        });


        const imgVaciar = document.createElement("img");
        imgVaciar.classList.add("image");
        imgVaciar.src = "../img/carrito-de-compras-vacio.png";
        imgVaciar.alt = "vaciar carrito";
        const btnVaciar = document.createElement("button");
        btnVaciar.classList.add("btn-vaciar-carrito");
        btnVaciar.appendChild(imgVaciar);

        btnVaciar.addEventListener("click", () => {
            vaciarCarrito();
            renderizarCarrito();
        });

        resumen.appendChild(btnComprar);
        resumen.appendChild(btnVaciar);


    }

};

document.addEventListener("DOMContentLoaded", renderizarCarrito);