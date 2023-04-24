const express = require("express");
const { generateProduct } = require("../utils/utils");

// const { ProductsRepository } = require("../repository/products.repository");
// const productsRepository = new ProductsRepository(memoryProductsDao);
// const { productsDao } = require("../dao/mongo/classes/products.dao");
// const memoryProductsDao = new productsDao;
const { productModel } = require("../dao/mongo/models/products.model");

// GENERO EL ROUTER
const mockingRouter = express.Router();

mockingRouter.post("/", async(req, res) => {
    let products = [];
    for (let i = 0; i < 5; i++) {
        let newRandomProduct = generateProduct();
        const newProduct = new productModel(newRandomProduct);
        await newProduct.save()
        products.push(newRandomProduct);
    }
    res.send({message:"Succesfull", products});

    // console.log(newRandomProduct);
    // await memoryProductsDao.create(newRandomProduct,newRandomProduct.code);
})

module.exports={
    mockingRouter
}