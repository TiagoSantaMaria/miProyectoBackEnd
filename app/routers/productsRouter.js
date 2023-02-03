// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const productsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const {ProductManager} = require("..");
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
        res.status(200).send(newListProducts);
    }
});

//Endpoint para filtrar producto dependiento el id pasado porametro
productsRouter.get("/:id", async (req,res) => {
    const {id=null} = req.params;
    if(!!id){
        const productsById = await productManager.getProductById(Number(id));
        if(!productsById)res.status(400).send(`El producto con id:${id} no se encuentra registrado`);
        if(!!productsById)res.status(200).send(productsById);
    }
});

//Endpoint para agregar un producto nuevo
productsRouter.post("/", async (req,res) => {
    const newProduct = req.body;
    if(!!newProduct){
        if(await productManager.addProduct(newProduct)){
            req.socket.emit("newProduct", newProduct);
            res.status(200).send("Producto Agregado!");
        }else{
            res.status(400).send("El Producto No Pudo Ser Agregado!");
        }
    }else{
        res.status(400).send("Por Favor ingrese un Producto");
    }
});

//Endpoint para modificar un producto nuevo
productsRouter.put("/:id", async(req,res)=>{
    const {id=null} = req.params;
    if(!!id){
        const updateProduct = req.body;
        //El signo + sobre id es para transformarlo en number
        if(await productManager.updateProduct(+id, updateProduct)){
            res.status(200).send("Producto Actualizado!");
        }else{
            res.status(400).send("El Producto No Pudo Ser Actualizado!");
        }
        
    }
});

//Endpoint para eliminar un producto
productsRouter.delete("/:id", async (req,res)=>{
    const {id=null} = req.params;
    if(!!id){
        if(await productManager.deleteProduct(+id)){
            res.status(200).send("Producto Eliminado!");
        }else{
            res.status(400).send("El Producto No Pudo Ser Eliminado!")
        }
        
    }
});

//Exportar modulo
module.exports = {
    productsRouter,
    };
