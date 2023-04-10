const express = require("express");

// GENERO EL ROUTER
const cartsRouter = express.Router();

const { showCarts, createCart,addProductToCart, saveProductsInCart, updateQuantity,deleteProductInCart,showProductsInCart,finishPurchase } = require("../controllers/carts.controllers");

//IMPORTO AUTORIZACIONES
const { authUser } = require("./middlewares");




cartsRouter.post("/",authUser, createCart);
cartsRouter.get("/", authUser, showCarts);
cartsRouter.put("/:cid", authUser, saveProductsInCart);
cartsRouter.post("/:cid/purchase",authUser, finishPurchase);
cartsRouter.post("/:cid/product/:pid", authUser, addProductToCart);
cartsRouter.put("/:cid/product/:pid", authUser, updateQuantity);
cartsRouter.delete("/:cid/product/:pid", authUser, deleteProductInCart);
cartsRouter.get("/:cid", authUser, showProductsInCart)

module.exports={
    cartsRouter
}