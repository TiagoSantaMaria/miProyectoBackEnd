const mongoose = require("mongoose");
const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product:{
                    type : mongoose.Schema.Types.ObjectId,
                    ref:"products"
                },
                quantity:Number     
            }
        ]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});




cartSchema.pre("find", function () {
    this.populate("products.product");
});
cartSchema.pre("findOne", function () {
    this.populate("products.product");
});
cartSchema.pre("findById", function () {
    this.populate("products.product");
});

const cartModel = mongoose.model(cartCollection,cartSchema);
module.exports = {
    cartModel
    };
