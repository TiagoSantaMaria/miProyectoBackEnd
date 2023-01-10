// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const productsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const ProductManager = require("..");
const productManager = new ProductManager("../database/products.json");

//ENDPOINTS
//Endpoint para filtrar productos dependiendo el limite q se quiera mostrar 
productsRouter.get("/products", async (req,res)=>{
    const {limit = null} = req.query;
    const products = await productManager.getProduct();
    if (!limit) res.send(products);
    if (!!limit){
        const newListProducts = [];
        for(let i=0; i<limit;i++){
            newListProducts[i] = products[i];
        }
        res.send(newListProducts);
    }
});

// Endpoint para filtrar producto dependiento el id pasado porametro
productsRouter.get("/products/:id", async (req,res) => {
    const {id=null} = req.params;
    if(!!id){
        const productsById = await productManager.getProductById(Number(id));
        if(!productsById)res.send(`El producto con id:${id} no se encuentra registrado`);
        if(!!productsById)res.send(productsById);
    }
});

module.exports = {
    productsRouter,
  };