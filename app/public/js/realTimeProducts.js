const socket = io();

socket.emit('mensaje', 'Hola Desde el cliente de webSocket')

socket.on('singlecast', (data)=>{
    console.info(data)
})

socket.on('broadcast', (data)=>{
    console.warn(data)
})
socket.on('multicast', (data)=>{
    console.error(data)
})