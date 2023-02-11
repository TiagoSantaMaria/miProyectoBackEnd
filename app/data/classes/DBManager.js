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
            const response = await productModel.paginate({category:`${query}`},{sort:{price:`${sort}`},page:`${page}`, limit:`${limit}`});
            const responseServer = {}
            responseServer.status="Succes"
            responseServer.payload= response.docs;
            responseServer.totalPages=response.totalPages;
            responseServer.prevPage=response.prevPage;
            responseServer.nextPage=response.nextPage;
            responseServer.page=response.page;
            responseServer.hasPrevPage=response.hasPrevPage;
            responseServer.hasNextPage=response.hasNextPage;
            responseServer.prevLink=response.prevLink;
            if(responseServer.hasNextPage){
                responseServer.nextLink=`http://localhost:8080/api/products?category=electronic&page=${+page+1}&limit=1&sort=1`;
            }else{responseServer.nextLink=null}
            if(responseServer.hasPrevPage){
                responseServer.prevLink=`http://localhost:8080/api/products?category=electronic&page=${+page-1}&limit=1&sort=1`;
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
            console.log(code);
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
        let locate = false;
        for(let i=0; i<cart.products.length; i++){
            if(cart.products[i].codeProduct===product.code){
                cart.products[i].quantity++;
                locate = true;
                break;
            }
        };
        if(!locate){
            const orderProduct = {};
            orderProduct.idProduct = product._id;
            orderProduct.codeProduct = product.code;
            orderProduct.quantity = quantity;
            cart.products.push(orderProduct);
        }
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