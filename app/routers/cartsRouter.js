// IMPORTO MODULO EXPRESS
const express = require("express");


// GENERO EL ROUTER
const cartsRouter = express.Router();

//INICIALIZACION DE CLASE MASTERProductManager
const { CartManager, ProductManager } = require("..");
const cartManager = new CartManager("../database/carts.json");
const productManager = new ProductManager("../database/products.json");

//ENDPOINT

//Enpoint para crear el carrito
cartsRouter.post("/",(req,res)=>{
    const newCart = req.body;
    if(!!newCart){
        cartManager.addCart(newCart);
        res.send(newCart)
    }
});

//Endpoint para rellenar el carrito
cartsRouter.post("/:cid/product/:pid", async(req,res)=>{
    const id = req.params;
    if(!!id.cid && id.pid){
        const cart = await cartManager.getCartById(+id.cid);
        const product = await productManager.getProductById(+id.pid);
        cartManager.addProductToCart(cart,product,1);
    }
    res.send("HOLA")
})

//Exportar modulo
module.exports = {
    cartsRouter,
    };