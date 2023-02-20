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
//Endpoint para actualizar todo los productos que queremos actualiar
cartsRouter.put("/:cid", async(req,res)=>{
    try{
        const id = req.params;
        const newProducts = req.body;
        const cart = await cartManager.readOneByID(id.cid);
        if(!!cart){
            cartManager.cleanCart(cart);
            for(let i=0;i<newProducts.length;i++){
                const product = await productManager.readOneByID(newProducts[i].idProduct)
                cartManager.addProductToCart(cart,product,newProducts[i].quantity);
            }
            res.status(200).send("Carrito Actualizado con exito");
        }else{
            res.status(400).send("Carrito No encontrado");
        }
    }catch(err){
        throw err
    }
})
//Endpoinr para actualizar la cantidad de un producto
cartsRouter.put("/:cid/product/:pid", async(req,res)=>{
    const id = req.params;
    const {quantity} = req.body;
    if(!!id.cid && id.pid){
        const cart = await cartManager.readOneByID(id.cid);
        const product = await productManager.readOneByID(id.pid);
        if(!cart || !product){
            res.status(400).send("El Producto no pudo ser Actulizado!")
        }else{
            cartManager.updateQuantityProducts(cart,product,quantity);
            res.status(200).send("Producto Agregado!")
        }
    }
})
//Endpoint para eliminar producto del Carrito
cartsRouter.delete("/:cid/product/:pid", async(req,res)=>{
    try{
        const id = req.params;
        if(!!id.cid && id.pid){
            const cart = await cartManager.readOneByID(id.cid);
            const product = await productManager.readOneByID(id.pid);
            if(!cart || !product){
                res.status(400).send("El Producto no pudo ser Eliminado!")
            }else{
                cartManager.deleteTotalProduct(cart,product);
                res.status(200).send("Producto Eliminado!")
            }
        }
    }catch(err){
        throw err
    }
})
//Endpointpara mostrar los carritos
cartsRouter.get("/",async(req,res)=>{
    try{
        const carts = await cartManager.read();
        res.status(200).send(carts);
    }catch(err){
        throw err;
    }
})

//Endpoint para mostrar los productos del carrito ingresado
cartsRouter.get("/:cid", async(req,res)=>{
    const {cid} = req.params;
    const cart = await cartManager.readOneByID(cid);
    if(!cart){
        res.status(400).send("Id Carrito no Encontrado");
    }else{
        const productCart = [{message:"PRODUCTOS DEL CARRITO"}, ...cart.products];
        res.status(200).send(productCart);
    }
})
//Exportar modulo
module.exports = {
    cartsRouter,
};
