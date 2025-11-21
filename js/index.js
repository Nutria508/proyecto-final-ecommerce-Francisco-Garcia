
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

//Mostrar Carrito

const renderizarIndex = () => {
    const contenedor = document.getElementById("contenedor-tarjetas")
    const contenedorCarrito = document.getElementById("contenedor-carrito")
    const contenedorReviews = document.getElementById("contenedor-resenas")
    const totalIndex = document.getElementById("total-index")
    let carrito = obtenerCarrito()
    actualizarContador(carrito)
    


    fetch('./data/productos.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Satus: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            data.forEach((producto) => {

                const tarjeta = document.createElement("article")
                tarjeta.classList.add("tarjeta-producto");

                const img = document.createElement("img")
                img.src = producto.img
                img.alt = producto.nombre

                const titulo = document.createElement("h3")
                titulo.textContent = producto.nombre

                const seccionInferior = document.createElement("div")

                const precio = document.createElement("p")
                precio.textContent = `$${producto.precio}`

                const boton = document.createElement("button")
                boton.classList.add("btn");
                const logoBoton = document.createElement("img")
                logoBoton.classList.add("image");

                logoBoton.src = "./img/carrito-de-compras.png"
                logoBoton.alt = "Agregar al carrito"
                boton.addEventListener("click", () => {
                    agregarAlCarrito(producto)
                    hideCart = false;
                    document.getElementById("carrito-de-compras").hidden = hideCart;
                    renderizarCarrito();

                })
                boton.appendChild(logoBoton)
                seccionInferior.appendChild(precio)
                seccionInferior.appendChild(boton)
                tarjeta.appendChild(img)
                tarjeta.appendChild(titulo)
                tarjeta.appendChild(seccionInferior)


                contenedor.appendChild(tarjeta)


            })

        })
        .catch(error => {
            console.error('Error en la comunicación con al API:', error);
        });

    fetch('./data/reviews.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Satus: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            data.forEach((review) => {
                const tarjetaReview = document.createElement("article")
                tarjetaReview.classList.add("card");

                const nombre = document.createElement("h4")
                nombre.textContent = review.nombre

                let valor = parseInt(review.puntuacion);

                const estrellas = document.createElement("div")
                estrellas.classList.add("estrellas-resena");

                const srcSolidStar = "./img/estrella-solida.png"
                const srcVoidStar = "./img/estrella-vacia.png"

                const star1 = document.createElement("img")
                star1.src = "./img/estrella-solida.png"
                star1.alt = ""

                const star2 = document.createElement("img")
                star2.alt = ""

                const star3 = document.createElement("img")
                star3.alt = ""

                const star4 = document.createElement("img")
                star4.alt = ""

                const star5 = document.createElement("img")
                star5.alt = ""

                switch (valor) {
                    case 1:
                        star2.src = srcVoidStar
                        star3.src = srcVoidStar
                        star4.src = srcVoidStar
                        star5.src = srcVoidStar
                        break;
                    case 2:
                        star2.src = srcSolidStar
                        star3.src = srcVoidStar
                        star4.src = srcVoidStar
                        star5.src = srcVoidStar
                        break;
                    case 3:
                        star2.src = srcSolidStar
                        star3.src = srcSolidStar
                        star4.src = srcVoidStar
                        star5.src = srcVoidStar
                        break;
                    case 4:
                        star2.src = srcSolidStar
                        star3.src = srcSolidStar
                        star4.src = srcSolidStar
                        star5.src = srcVoidStar
                        break;
                    case 5:
                        star2.src = srcSolidStar
                        star3.src = srcSolidStar
                        star4.src = srcSolidStar
                        star5.src = srcSolidStar
                        break;
                }


                const text = document.createElement("p")
                text.textContent = review.texto


                estrellas.appendChild(star1)
                estrellas.appendChild(star2)
                estrellas.appendChild(star3)
                estrellas.appendChild(star4)
                estrellas.appendChild(star5)

                tarjetaReview.appendChild(nombre)
                tarjetaReview.appendChild(estrellas)
                tarjetaReview.appendChild(text)


                contenedorReviews.appendChild(tarjetaReview)


            })

        })
        .catch(error => {
            console.error('Error en la comunicación con al API:', error);
        });







    let hideCart = true;
    document.getElementById("carrito-de-compras").hidden = hideCart;
    const botonCarrito = document.getElementById('mostrarCarrito');

    botonCarrito.addEventListener('click', () => {
        hideCart = !hideCart;
        document.getElementById("carrito-de-compras").hidden = hideCart;
        renderizarCarrito();
    });


    const renderizarCarrito = () => {
        carrito = obtenerCarrito();
        actualizarContador(carrito);
        contenedorCarrito.innerHTML = "";
        let total = 0;
        carrito.forEach((producto) => {

            const tarjeta = document.createElement("article")
            tarjeta.classList.add("tarjeta-carrito");

            const img = document.createElement("img")
            img.src = producto.img
            img.alt = producto.nombre

            const titulo = document.createElement("h3")
            titulo.textContent = producto.nombre

            const precio = document.createElement("p")
            precio.textContent = `$${producto.precio}`

            tarjeta.appendChild(img)
            tarjeta.appendChild(titulo)
            tarjeta.appendChild(precio)

            contenedorCarrito.appendChild(tarjeta)
            total += parseFloat(producto.precio);
        });
        //const sumatoria = document.createElement("p")
        total=Math.round(total*100)/100;
        totalIndex.textContent=`$${total}`
        //sumatoria.textContent = `Total $${total}`
        //contenedorCarrito.appendChild(sumatoria)

    }


}

document.addEventListener("DOMContentLoaded", renderizarIndex);


