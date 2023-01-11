// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const productsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const ProductManager = require("..");
const productManager = new ProductManager("../database/products.json");

//ENDPOINTS

//Endpoint para filtrar productos dependiendo el limite q se quiera mostrar 
productsRouter.get("/", async (req,res)=>{
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

//Endpoint para filtrar producto dependiento el id pasado porametro
productsRouter.get("/:id", async (req,res) => {
    const {id=null} = req.params;
    if(!!id){
        const productsById = await productManager.getProductById(Number(id));
        if(!productsById)res.send(`El producto con id:${id} no se encuentra registrado`);
        if(!!productsById)res.send(productsById);
    }
});


//Endpoint para agregar un producto nuevo
productsRouter.post("/", (req,res) => {
    const newProduct = req.body;
    if(!!newProduct){
        productManager.addProduct(newProduct);
        res.send("Producto Agregado!");
    }
});

//Endpoint para modificar un producto nuevo
productsRouter.put("/:id",(req,res)=>{
    const {id=null} = req.params;
    if(!!id){
        const updateProduct = req.body;
        //El signo + sobre id es para transformarlo en number
        productManager.updateProduct(+id, updateProduct);
        res.send("Producto Actualizado!");
    }
});

//Endpoint para eliminar un producto
productsRouter.delete("/:id", (req,res)=>{
    const {id=null} = req.params;
    if(!!id){
        productManager.deleteProduct(+id);
        res.send("Producto Eliminado!")
    }
});

//Exportar modulo
module.exports = {
    productsRouter,
    };