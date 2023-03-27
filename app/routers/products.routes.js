const express = require("express");

// GENERO EL ROUTER
const productsRouter = express.Router();

const { showProducts, showProductById, modifyProduct, addNewProduct,deleteProduct } = require("../controllers/products.controllers")

// Endpoint para filtrar productos dependiendo el limite q se quiera mostrar 
productsRouter.get("/",showProducts);

// Endpoint para filtrar producto dependiento el id pasado porametro
productsRouter.get("/:pid",showProductById);

//  Endpoint para agregar un producto nuevo 
productsRouter.post("/", addNewProduct)

// Endpoint para agregar un producto nuevo
productsRouter.put("/:pid", modifyProduct)

//Endpoint para eliminar un producto
productsRouter.delete("/:pid", deleteProduct)

module.exports={
    productsRouter
}