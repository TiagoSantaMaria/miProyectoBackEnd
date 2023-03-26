const { cartModel } = require("../data/models/carts.model");

class cartsDao{
    async read() {
        try {
            const carts = await cartModel.find().lean();
            return carts;
        } catch (err) {
            throw err;
        }
    }
    async readOneById(id) {
        try{
            const cart = await cartModel.findById(id);
            return cart;
        }catch(err){
            throw err;
        }
    }
    async saveCart(cart){
        try{
            cart.save();
        }catch(err){
            throw new err
        }
    }
}

module.exports = {
    cartsDao,
    };