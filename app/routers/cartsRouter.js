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
        res.status(200).send(newCart);
    }
});

//Endpoint para rellenar el carrito
cartsRouter.post("/:cid/product/:pid", async(req,res)=>{
    const id = req.params;
    if(!!id.cid && id.pid){
        const cart = await cartManager.getCartById(+id.cid);
        const product = await productManager.getProductById(+id.pid);
        if(!cart || !product){
            res.status(400).send("El Producto no pudo ser Agregado!")
        }else{
            cartManager.addProductToCart(cart,product,1);
            res.status(200).send("Producto Agregado!")
        }
    }
})

//Endpoint para mostrar los productos del carrito
cartsRouter.get("/:id", async(req,res)=>{
    const {id} = req.params;
    const cart = await cartManager.getCartById(+id);
    if(!cart){
        res.status(400).send("Id Carrito no Encontrado");
    }else{
        const productCart = [];
        for(let i=0; i<cart.products.length;i++){
            let product = await productManager.getProductById(cart.products[i].idProduct);
            product.quantity = cart.products[i].quantity;
            productCart.push(product)
        }
        res.status(200).send(productCart);
    }
})

//Exportar modulo
module.exports = {
    cartsRouter,
    };