// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const viewsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const { ProductManagerDB } = require("../data/classes/DBManager");
const productManager = new ProductManagerDB;

ProductManagerDB
//ENDPOINTS
viewsRouter.get('/products', async(req,res)=>{
    const products = await productManager.read();
    
    res.render('home', {products, stylesheet: 'viewProducts'});
})

viewsRouter.get('/realtimeproducts', async(req,res)=>{
    const products = await productManager.read();
    res.render('realTimeProducts', {products, stylesheet: 'viewProducts'});
});

//Exportar modulo
module.exports = {
    viewsRouter,
    };