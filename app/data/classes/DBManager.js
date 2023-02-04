const mongoose = require("mongoose");

const {cartModel} = require("../models/carts.model");
const {productModel} = require("../models/products.model");

class ProductManagerDB{
    async read(limit=null){
        try{
            if(!limit){
                const products = await productModel.find();
                return products;
            }else{
                const products = await productModel.find().limit(limit);
                return products
            }
        }catch(err){
            throw err;
        }
    }
    async readOneByID(id){
        try{
            const product = await productModel.findById(id);
            return product;
        }catch(err){
            throw err;
        }
    }

    async create(product) {
        try {
            const newProduct = new productModel(product);
            await newProduct.save();
            return newProduct;
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
    async update(productId, product) {
        try {
            const result = await productModel.findByIdAndUpdate(productId, product);
            return result;
        } catch (err) {
            throw err;
        }
    }      
}

module.exports = {
    ProductManagerDB
    };