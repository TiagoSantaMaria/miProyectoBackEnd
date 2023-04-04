const express = require("express");

// GENERO EL ROUTER
const cartsRouter = express.Router();

const { showCarts, createCart,addProductToCart, saveProductsInCart, updateQuantity,deleteProductInCart,showProductsInCart } = require("../controllers/carts.controllers");

cartsRouter.post("/", createCart);
cartsRouter.get("/", showCarts);
cartsRouter.put("/:cid", saveProductsInCart);
cartsRouter.post("/:cid/product/:pid", addProductToCart);
cartsRouter.put("/:cid/product/:pid", updateQuantity);
cartsRouter.delete("/:cid/product/:pid", deleteProductInCart);
cartsRouter.get("/:cid", showProductsInCart)

module.exports={
    cartsRouter
}