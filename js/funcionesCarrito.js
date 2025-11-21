import { guardarCarrito,obtenerCarrito,vaciarCarritoStorage } from "./storage.js"
import { actualizarContador, mostrarMensaje } from "./ui.js"


export const agregarAlCarrito =(producto) => {
    const carrito = obtenerCarrito()   //obtiene el la informacion del carrito
    carrito.push(producto)             //agrego el producto al carrito

    guardarCarrito(carrito)            //lo guarda en el local storage
    actualizarContador(carrito)
    //mostrarMensaje("Producto agregado al carrito")
}

export const eliminarProducto = (indice) => {
    const carrito = obtenerCarrito()
    carrito.splice(indice,1)

    guardarCarrito(carrito)
    actualizarContador(carrito)
    //mostrarMensaje("Producto eliminado")
}

export const vaciarCarrito =() =>{
    vaciarCarritoStorage()
    actualizarContador([])
}