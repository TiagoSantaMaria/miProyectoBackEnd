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

//Endpoint para mostrar los productos del carrito
cartsRouter.get("/:id", async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const cart = await cartManager.getCartById(+id);
    console.log(cart)
    const productCart = [];
    for(let i=0; i<cart.products.length;i++){
        let product = await productManager.getProductById(cart.products[i].idProduct);
        productCart.push(product)
    }
    console.log(productCart);
    res.send(productCart)
})

//Exportar modulo
module.exports = {
    cartsRouter,
    };