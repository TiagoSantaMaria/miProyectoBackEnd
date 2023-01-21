//IMPORTS

// IMPORTAR MODULO PRODUCT ROUTERimage.png
const { productsRouter } = require('../routers/productsRouter');
// IMPORTAR MODULO CART ROUTERimage.png
const { cartsRouter } = require('../routers/cartsRouter');
// IMPORTAR MODULO VIEWS ROUTER
const { viewsRouter } = require('../routers/viewsRouter');
//IMPORTO MIDDLEWARE
const { injectSocketMiddleWare } = require('../routers/middlewares');

//CONTS/VARS

// SETEAR SERVER
const express = require('express');
const app = express();
//SETEAR SOCKET
const {Server} = require('socket.io');
// LEVANTAR SERVER
const socketServer = new Server(app.listen(8080));
// SETEAR HANDLEBARS
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "../views");

//CONFIGURACIONES SERVER

// DECLARO ESTATICA LA CARPETA PUBLIC
app.use(express.static("../public"));
// LINEAS DE CODIGO PARA EL MANEJO DE INFORMACION (VAN SIEMPRE)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MIDDLEWARES

// AGREGO SOCKET A REQ
app.use((req, res, next)=>{
    req.socket = socketServer;
    next();
});

//ROUTERS

// LLAMO AL VIEWS ROUTER
app.use('/', viewsRouter);
// LLAMO AL PRODUCTS ROUTER
app.use('/api/products', productsRouter);
// LLAMO AL CART ROUTER
app.use('/api/carts', cartsRouter);

//LEVANTO SERVER
socketServer.on('connection', (socket) =>{
    console.log("Cliente Conectado");
})



//EJEMPLOS DE UTILIZACION DE SOCKET
    // socket.on('mensaje',(msj)=>{
    //     console.log(`Recibi un mensaje: ${msj}`);
    //     socket.emit('singlecast','mensaje singlecast');
    //     socket.broadcast.emit('broadcast','mensaje broadcast');
    //     socketServer.emit('multicast','mensaje multicast');
    // })