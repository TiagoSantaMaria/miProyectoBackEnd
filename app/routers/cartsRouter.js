// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const cartsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const ProductManager = require("..");
const productManager = new ProductManager("../database/carts.json");

//ENDPOINT

//Enpoint para crear el carrito
cartsRouter.post("/",(req,res)=>{
    const newCart = req.body;
    if(!!newCart){
        productManager.addCart(newCart);
        res.send(newCart)
    }

});

//Exportar modulo
module.exports = {
    cartsRouter,
    };