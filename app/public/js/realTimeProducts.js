const socket = io();
console.log("HOLA");
socket.on("newProduct", (newProduct)=>{
    const addProduct = document.getElementById("newProduct");
    addProduct.innerHTML = `
        <div>
            <hr>
                <li>Nombre Producto: ${newProduct.title}</li>
                <li>Precio: ${newProduct.price}</li>
                <li>Stock: ${newProduct.stock}</li>
            </hr>
        </div>
    `
})




//EJEMPLOS DE UTILIZACION DE SOCKET

// socket.emit('mensaje', 'Hola Desde el cliente de webSocket')

// socket.on('singlecast', (data)=>{
//     console.info(data)
// })

// socket.on('broadcast', (data)=>{
//     console.warn(data)
// })
// socket.on('multicast', (data)=>{
//     console.error(data)
// })