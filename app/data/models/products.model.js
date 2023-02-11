const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const productCollection = "products";

const productSchema  = new mongoose.Schema({
    title:String,
    info:String,
    code:String,
    price:Number,
    thumbnail:String,
    stock:Number,
    category:String,
    status:Boolean,
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

module.exports = {
    productModel
    };