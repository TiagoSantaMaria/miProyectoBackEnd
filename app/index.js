//IMPORTACION MODULO (MANEJO DE ARCHIVOS)
const fs = require('fs');

class ProductManager{
    products;
    static idProducts;
    constructor(path){
        this.path=path;
    }    

    async loadFileProducts(){
        try {
            this.products = JSON.parse(await fs.promises.readFile("../database/products.json", "utf-8"));
        } catch (err) {
            throw new Error(err);
        }
    }
    

    async addProduct(product){
        try{
            await this.loadFileProducts();
            const productFind = await this.products.find(prod=>prod.code == product.code);
            if (!!!productFind){
                let indexLastProduct = this.products.length - 1;
                ProductManager.idProducts = this.products[indexLastProduct].id+1;
                product.id = ProductManager.idProducts;
                if(product.hasOwnProperty('title') && product.hasOwnProperty('description') && product.hasOwnProperty('price') && product.hasOwnProperty('thumbnail') && product.hasOwnProperty('stock') && product.hasOwnProperty('code') && product.hasOwnProperty('status') && product.hasOwnProperty('category') && product.title.length!=0 && product.description.length!=0 && product.price.length!=0 && product.thumbnail.length!=0 && product.stock.length!=0 && product.code.length!=0 && product.status.length!=0 && product.category.length!=0){
                    this.products.push(product);
                    fs.promises.writeFile(this.path, JSON.stringify(this.products));
                    return true;
                }else{
                    //EL PROD NO SE AGG XQ HAY DATOS NO RELLENOS
                    return false;
                }
            }else{
                return false;
            }
        }catch(err){
            throw new Error(err);
        }
    }

    async getProduct(){
        try{
            await this.loadFileProducts();
            return this.products;
        }catch(err){
            throw new Error(err);
        }
        
    }

    async getProductById(id){
        try{
            await this.loadFileProducts();
            const productById = this.products.find(prod=>prod.id === id);
            if (productById === undefined){
                console.log("Not found");
            }else{
                return productById
            }
        }catch(err){
            throw new Error(err);
        }
    }

    async updateProduct(id,updateProduct){
        try{
            await this.loadFileProducts();
            const product = this.products.find((product)=> product.id===id);
            if (!!product){
                //ACTUALIZACION ATRIBUTOS DE OBJETO
                if (!!updateProduct.title) product.title = updateProduct.title;
                if (!!updateProduct.description) product.description = updateProduct.description;
                if (!!updateProduct.price) product.price = updateProduct.price;
                if (!!updateProduct.thumbnail) product.thumbnail = updateProduct.thumbnail;
                if (!!updateProduct.stock || updateProduct.stock === 0) product.stock = updateProduct.stock;
                if (!!updateProduct.code) product.code = updateProduct.code;
                if (!!updateProduct.status) product.status = updateProduct.status;
                if (!!updateProduct.category) product.category = updateProduct.category;
                //ACTUALIZACION ARCHIVO
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                return true;
            }else{
                return false
            }
            }catch(err){
                throw new Error(err);
            }
    }

    async deleteProduct(id){
        try{
            await this.loadFileProducts();
            const product = this.products.find((product)=> product.id===id);
            if (!!product){
                let index = this.products.indexOf(product);
                this.products.splice(index,1);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                return true;
            }else{
                return false;
            }
        }catch(err){
            throw new Error(err);
        }
    }
}
class CartManager{
    carts;
    static idCarts;
    constructor(path){
        this.path=path;
    }

    async loadFileCarts(){
        try {
            this.carts = JSON.parse(await fs.promises.readFile("../database/carts.json", "utf-8"));
        } catch (err) {
            throw new Error(err);
        }
    }

    async addCart(cart){
        try{
            await this.loadFileCarts();
            if(this.carts.length===0){
                cart.id = 1;
            }else{
                let indexLastCart = this.carts.length - 1;
                ProductManager.idCarts = this.carts[indexLastCart].id+1;
                cart.id = ProductManager.idCarts;
            }
            this.carts.push(cart);
            fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        }catch(err){
            throw new Error(err);
        }
    }

    async getCartById(id){
        try{
            await this.loadFileCarts();
            const cartById = this.carts.find(cart=>cart.id === id);
            if (cartById === undefined){
                console.log("Not found");
            }else{
                return cartById
            }
        }catch(err){
            throw new Error(err)
        }
    }

    async addProductToCart(cart,product,quantity){
        try {
            let locate = false;
            for(let i=0; i<cart.products.length; i++){
                if(cart.products[i].idProduct===product.id){
                    cart.products[i].quantity++;
                    locate = true;
                    break;
                }
            };
            if(!locate){
                const orderProduct={};
                orderProduct.idProduct=product.id;
                orderProduct.quantity=quantity;
                cart.products.push(orderProduct);
            }
            this.updateCart(cart);
        }catch(err) {
            throw new Error(err)
        }
    }
    async updateCart(cart){
        try {
            this.carts[this.carts.indexOf(cart)] = cart;
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        } catch (error) {
            
        }
    }
} 

// const test = new ProductManager("./database/products.json");
// test.addProduct(product[2]);
// test.getProduct();
// test.getProductById(1);
// test.updateProduct(1,null,"240hz",45000,"rutaImagen2",23423,8);
// test.deleteProduct(5);

module.exports = {
    ProductManager,
    CartManager
    };