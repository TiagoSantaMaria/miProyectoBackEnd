const mongoose = require("mongoose");
const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: Array,
});

cartSchema.pre("find", function () {
    this.populate("products");
});
cartSchema.pre("findOne", function () {
    this.populate("products");
});


const cartModel = mongoose.model(cartCollection,cartSchema);
module.exports = {
    cartModel
    };
