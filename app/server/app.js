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
app.use('/products', viewsRouter);

// LLAMO AL PRODUCTS ROUTER
app.use('/api/products', productsRouter);

// LLAMO AL CART ROUTER
app.use('/api/carts', cartsRouter);

// LEVANTAR SERVER
const httpServer = app.listen(8080);
