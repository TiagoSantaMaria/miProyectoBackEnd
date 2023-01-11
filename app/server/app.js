// SETEAR SERVER
const express = require('express');
const app = express();

// LINEAS DE CODIGO PARA EL MANEJO DE INFORMACION (VAN SIEMPRE)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTAR MODULO PRODUCT ROUTER
const { productsRouter } = require('../routers/productsRouter');
// LLAMO AL PRODUCTS ROUTER
app.use('/api/products', productsRouter);

// LEVANTAR SERVER
app.listen(8080);