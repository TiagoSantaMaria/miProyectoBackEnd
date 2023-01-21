// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const viewsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const {ProductManager} = require("..");
const productManager = new ProductManager("../database/products.json");

//ENDPOINTS
viewsRouter.get('/products', async(req,res)=>{
    const products = await productManager.getProduct();
    res.render('home', {products, stylesheet: 'viewProducts'});
})

viewsRouter.get('/realtimeproducts', async(req,res)=>{
    const products = await productManager.getProduct();
    res.render('realTimeProducts', {products, stylesheet: 'viewProducts'});
});

//Exportar modulo
module.exports = {
    viewsRouter,
    };