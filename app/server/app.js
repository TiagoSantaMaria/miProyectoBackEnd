// SETEAR SERVER
const express = require('express');
const app = express();

// SETEAR HANDLEBARS
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "../views");

app.use(express.static("../public"))

//SETEAR SOCKET
const {Server} = require('socket.io')

// LINEAS DE CODIGO PARA EL MANEJO DE INFORMACION (VAN SIEMPRE)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTAR MODULO PRODUCT ROUTERimage.png
const { productsRouter } = require('../routers/productsRouter');

// IMPORTAR MODULO CART ROUTERimage.png
const { cartsRouter } = require('../routers/cartsRouter');

// IMPORTAR MODULO VIEWS ROUTER
const { viewsRouter } = require('../routers/viewsRouter');

// LLAMO AL VIEWS ROUTER
app.use('/', viewsRouter);

// LLAMO AL PRODUCTS ROUTER
app.use('/api/products', productsRouter);

// LLAMO AL CART ROUTER
app.use('/api/carts', cartsRouter);

// LEVANTAR SERVER
const socketServer = new Server(app.listen(8080));

socketServer.on('connection', (socket)=>{
    console.log("Nuevo Cliente Conectado");
    socket.on('mensaje',(msj)=>{
        console.log(`Recibi un mensaje: ${msj}`);
        socket.emit('singlecast','mensaje singlecast');
        socket.broadcast.emit('broadcast','mensaje broadcast');
        socketServer.emit('multicast','mensaje multicast');
    })
})

