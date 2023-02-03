const mongoose = require("mongoose");
const cartCollection = "carts";

const userSchema = new mongoose.Schema({
    products: Array,
});

const cartModel = mongoose.model(cartCollection,userSchema);

module.exports = {
    cartModel
    };
