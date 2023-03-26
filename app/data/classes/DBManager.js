const mongoose = require("mongoose");

const { cartModel } = require("../models/carts.model");
const { productModel } = require("../models/products.model");
const { userModel } = require("../models/users.model");

class ProductManagerDB{
    async create(product, code) {
        try {
            const productFind = await productModel.find({code:`${code}`})
            if(!productFind.length){
                const newProduct = new productModel(product);
                return newProduct;
            }else{
                return false
            }
        } catch (err) {
            throw err;
        }
    }
    async delete(productId) {
        try {
            const result = await productModel.findByIdAndDelete(productId);
            return result;
        } catch (err) {
            throw err;
        }
    }
    async updateProduct(productId, product) {
        try {
            const result = await productModel.findByIdAndUpdate(productId, product);
            return result;
        } catch (err) {
            throw err;
        }
    }  
}

class CartManagerDB{
async create(user) {
    try {
        const newCart = new cartModel();
        newCart.userId = user._id;
        return newCart;
    } catch (err) {
        throw err;
    }
}
async addProductToCart(cart,product,quantity){
    try{
        //ACTUALIZA EL CARRITO CON PRODUCTO
        let haveProduct=false
        cart.products.map(async(prod)=>{
            if(JSON.stringify(prod.product._id) === JSON.stringify(product._id)){
                prod.quantity++;
                // console.log(prod.quantity);
                haveProduct = true;
                await cartModel.findByIdAndUpdate(cart._id,cart);
            }})
        if(haveProduct===false){
            cart.products.push({product:`${product._id}`, quantity:`${quantity}`});
            await cartModel.findByIdAndUpdate(cart._id,cart);
        }
        //MUESTRA QUE EL POPULATE ANDA BIEN
        // let cartWant = await cartModel.findOne({_id:`${cart._id}`})
        // console.log(JSON.stringify(cartWant,null,'\t'));
    }catch(err){
        throw err
    }
}

async deleteTotalProduct(cart,product){
    try{
        const newProducts = cart.products.filter((prod)=>JSON.stringify(prod.product._id) !== JSON.stringify(product._id));
        cart.products = newProducts;
        await cartModel.findByIdAndUpdate(cart._id,cart);
    }catch(err){
        throw err
    }
}

async cleanCart(cart){
    const products = []
    cart.products = products;
    await cartModel.findByIdAndUpdate(cart._id,cart);
}

async updateQuantityProducts(cart,product,quantity){
    try{
        cart.products.map((prod)=>{
            if(JSON.stringify(prod.product._id)===JSON.stringify(product._id)){
                prod.quantity=quantity;
            }
        })
        await cartModel.findByIdAndUpdate(cart._id,cart);
    }catch(err){
        throw err
    }
}

}

class UserManagerDB{
async addCartToUser(email, idCart){
    try{
        const cart = await cartModel.findById(idCart)
        const user = await userModel.find({email});
        user[0].carts.push({cart:`${cart._id}`});
        await userModel.findByIdAndUpdate(user[0]._id,user[0]);
        //MUESTRA QUE EL POPULATE ANDA BIEN
        // let userWant = await userModel.findOne({_id:`${user[0]._id}`})
        // console.log(JSON.stringify(userWant,null,'\t'));
    }catch(err){
        throw err
    }
}
}

module.exports = {
    ProductManagerDB,
    CartManagerDB,
    UserManagerDB
    };