//IMPORTACION MODULO (MANEJO DE ARCHIVOS)
const fs = require('fs');

class ProductManager{
    products;
    static idProducts;
    constructor(path){
        this.path = path;
    }    

    async loadFile(){
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } catch (err) {
            throw new Error(err);
        }
    }

    async addProduct(product){
        try{
            await this.loadFile();
            const productFind = await this.products.find(prod=>prod.code == product.code);
            if (!!!productFind){
                let indexLastProduct = this.products.length - 1;
                ProductManager.idProducts = this.products[indexLastProduct].id+1;
                product.id = ProductManager.idProducts;
                if(product.hasOwnProperty('title') && product.hasOwnProperty('description') && product.hasOwnProperty('price') && product.hasOwnProperty('thumbnail') && product.hasOwnProperty('stock') && product.hasOwnProperty('code') && product.hasOwnProperty('status') && product.hasOwnProperty('category')){
                    this.products.push(product);
                    fs.promises.writeFile(this.path, JSON.stringify(this.products));
                }else{
                    console.log("El producto no pudo ser registrado ya que no estan todos los campos rellenos");
                }
            }else{
                console.log("PRODUCTO YA INCLUIDO");
            }
        }catch(err){
            throw new Error(err);
        }
    }

    async getProduct(){
        try{
            await this.loadFile();
            return this.products;
        }catch(err){
            throw new Error(err);
        }
        
    }

    async getProductById(id){
        try{
            await this.loadFile();
            const productById = this.products.find(prod=>prod.id === id);
            if (productById === undefined){
                console.log("Not found");
            }else{
                console.log(productById);
                return productById
            }
        }catch(err){
            throw new Error(err);
        }
    }

    async updateProduct(id,newTitle,newDescription,newPrice,newThumbnail,newCode,newStock){
        try{
            await this.loadFile();
            const product = this.products.find((product)=> product.id===id);
            if (!!product){
                //ACTUALIZACION ATRIBUTOS DE OBJETO
                if (!!newTitle) product.title = newTitle;
                if (!!newDescription) product.description = newDescription;
                if (!!newPrice) product.price = newPrice;
                if (!!newThumbnail) product.thumbnail = newThumbnail;
                if (!!newCode) product.code = newCode;
                if (!!newStock || newStock === 0) product.stock = newStock;
                //ACTUALIZACION ARCHIVO
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("SE ACTUALIZO");
            }else{
                console.log(`Product with id:${id} not found`);
            }
            }catch(err){
                throw new Error(err);
            }
    }

    async deleteProduct(id){
        try{
            await this.loadFile();
            const product = this.products.find((product)=> product.id===id);
            if (!!product){
                let index = this.products.indexOf(product);
                this.products.splice(index,1);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            }else{
                console.log(`Product with id:${id} not found`);
            }
        }catch(err){
            throw new Error(err);
        }
    }

}

// const test = new ProductManager("./database/products.json");
// test.addProduct(product[2]);
// test.getProduct();
// test.getProductById(1);
// test.updateProduct(1,null,"240hz",45000,"rutaImagen2",23423,8);
// test.deleteProduct(5);

module.exports = ProductManager;