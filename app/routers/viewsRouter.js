// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const viewsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const {ProductManager} = require("..");
const productManager = new ProductManager("../database/products.json");

//ENDPOINTS
viewsRouter.get('/', async(req,res)=>{
    const products = await productManager.getProduct();
    res.render('home', {products, stylesheet: 'viewProducts'});
})

viewsRouter.get('/realtimeproducts',()=>{

});

//Exportar modulo
module.exports = {
    viewsRouter,
    };