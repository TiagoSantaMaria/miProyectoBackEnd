const { cartModel } = require("../models/carts.model");

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

module.exports = {
    cartsDao,
    };