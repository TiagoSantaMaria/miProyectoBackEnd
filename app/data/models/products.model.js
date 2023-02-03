const mongoose = require("mongoose");
const productCollection = "products";

const userSchema = new mongoose.Schema({
    title:String,
    despcription:String,
    code:String,
    price:Number,
    thumbnail:String,
    stock:Number,
    category:String,
    status:Boolean,
});

const productModel = mongoose.model(productCollection,userSchema);

module.exports = {
    productModel
    };