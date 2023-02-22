const mongoose = require("mongoose");

const {cartModel} = require("../models/carts.model");
const {productModel} = require("../models/products.model");

class ProductManagerDB{
    async read(limit=null){
        try{
            if(!limit){
                const products = await productModel.find().lean();
                return products;
            }else{
                const products = await productModel.find().limit(limit);
                return products
            }
        }catch(err){
            throw err;
        }
    }
    async paginate(query,page,limit,sort){
        try{
            let response ={};
            let nextPage;
            let prevPage;
            if (query!=null){
                if(!sort){
                    response = await productModel.paginate({category:`${query}`},{page:`${page}`, limit:`${limit}`, lean:true});
                }else{
                    response = await productModel.paginate({category:`${query}`},{sort:{price:`${sort}`},page:`${page}`, limit:`${limit}`, lean:true});
                }
                nextPage = `http://localhost:8080/products?category=${query}&page=${+page+1}&limit=${limit}&sort=${sort}`;
                prevPage = `http://localhost:8080/products?category=${query}&page=${+page-1}&limit=${limit}&sort=${sort}`;
            }else{
                if(!sort){
                    response = await productModel.paginate({},{page:`${page}`, limit:`${limit}`, lean:true});
                }else{
                    response = await productModel.paginate({},{sort:{price:`${sort}`},page:`${page}`, limit:`${limit}`, lean:true});
                }
                nextPage = `http://localhost:8080/products?page=${+page+1}&limit=${limit}&sort=${sort}`;
                prevPage = `http://localhost:8080/products?page=${+page-1}&limit=${limit}&sort=${sort}`;
            }
            const responseServer = {...response}
            responseServer.status="Succes";
            if(responseServer.hasNextPage){
                responseServer.nextLink=nextPage;
            }else{responseServer.nextLink=null}
            if(responseServer.hasPrevPage){
                responseServer.prevLink=prevPage;
            }else{responseServer.prevLink=null}
            return(responseServer);
            
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
    async create(product, code) {
        try {
            const productFind = await productModel.find({code:`${code}`})
            if(!productFind.length){
                const newProduct = new productModel(product);
                await newProduct.save();
                return true;
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
async create() {
    try {
        const newCart = new cartModel();
        await newCart.save();
        return newCart;
    } catch (err) {
        throw err;
    }
}
async read() {
    try {
        const carts = await cartModel.find().lean();
        return carts;
    } catch (err) {
        throw err;
    }
}
async readOneByID(id) {
    try{
        const cart = await cartModel.findById(id);
        return cart;
    }catch(err){
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
    ProductManagerDB,
    CartManagerDB
    };