// IMPORTO MODULO EXPRESS
const express = require("express");


// GENERO EL ROUTER
const cartsRouter = express.Router();

//INICIALIZACION DE CLASE MASTERProductManager
const { CartManagerDB, ProductManagerDB } = require("../data/classes/DBManager");
const productManager = new ProductManagerDB;
const cartManager = new CartManagerDB;

//ENDPOINT

//Enpoint para crear el carrito
cartsRouter.post("/", async(req,res)=>{
    try {
        const response = await cartManager.create();
        res.status(200).send({ message: "Carrito creado", response });
        } catch (err) {
        res.status(500).send(err.message);
        }
});

// //Endpoint para rellenar el carrito
cartsRouter.post("/:cid/product/:pid", async(req,res)=>{
    const id = req.params;
    if(!!id.cid && id.pid){
        const cart = await cartManager.readOneByID(id.cid);
        const product = await productManager.readOneByID(id.pid);
        if(!cart || !product){
            res.status(400).send("El Producto no pudo ser Agregado!")
        }else{
            cartManager.addProductToCart(cart,product,1);
            res.status(200).send("Producto Agregado!")
        }
    }
})

 //Endpoint para mostrar los productos del carrito ingresado
cartsRouter.get("/:cid", async(req,res)=>{
    const {cid} = req.params;
    const cart = await cartManager.readOneByID(cid);
    if(!cart){
        res.status(400).send("Id Carrito no Encontrado");
    }else{
        const productCart = [{message:"PRODUCTOS DEL CARRITO"}];
        for(let i=0; i<cart.products.length;i++){
            let product = await productManager.readOneByID(cart.products[i].idProduct);
            const productInCart={};
            productInCart.title=product.title;
            productInCart.code=product.code
            productInCart.quantity=cart.products[i].quantity;
            productInCart.price=product.price;
            productCart.push(productInCart);
        }
        res.status(200).send(productCart);
    }
})

//Endpointpara mostror los carritos
cartsRouter.get("/",async(req,res)=>{
    try{
        const carts = await cartManager.read();
        res.status(200).send(carts);
    }catch(err){
        throw err;
    }
})

//Exportar modulo
module.exports = {
    cartsRouter,
};





    
    // //Enpoint para crear el carrito
    // cartsRouter.post("/",(req,res)=>{
    //     const newCart = req.body;
    //     if(!!newCart){
    //         cartManager.addCart(newCart);
    //         res.status(200).send(newCart);
    //     }
    // });
    
    // //Endpoint para rellenar el carrito
    // cartsRouter.post("/:cid/product/:pid", async(req,res)=>{
    //     const id = req.params;
    //     if(!!id.cid && id.pid){
    //         const cart = await cartManager.getCartById(+id.cid);
    //         const product = await productManager.getProductById(+id.pid);
    //         if(!cart || !product){
    //             res.status(400).send("El Producto no pudo ser Agregado!")
    //         }else{
    //             cartManager.addProductToCart(cart,product,1);
    //             res.status(200).send("Producto Agregado!")
    //         }
    //     }
    // })
    
    // //Endpoint para mostrar los productos del carrito
    // cartsRouter.get("/:id", async(req,res)=>{
    //     const {id} = req.params;
    //     const cart = await cartManager.getCartById(+id);
    //     if(!cart){
    //         res.status(400).send("Id Carrito no Encontrado");
    //     }else{
    //         const productCart = [];
    //         for(let i=0; i<cart.products.length;i++){
    //             let product = await productManager.getProductById(cart.products[i].idProduct);
    //             product.quantity = cart.products[i].quantity;
    //             productCart.push(product)
    //         }
    //         res.status(200).send(productCart);
    //     }
    // })