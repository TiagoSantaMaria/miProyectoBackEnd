const mongoose = require("mongoose");

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    age: Number,
    role: String,
    carts:{
        type:[
            {
                cart:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"carts"
                }
            }
        ]
    }
});

userSchema.pre("find", function () {
    this.populate("carts.cart");
});
userSchema.pre("findOne", function () {
    this.populate("carts.cart");
});
userSchema.pre("findById", function () {
    this.populate("carts.cart");
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports={
    userModel
};