//IMPORTO DAO NECESARIOS
const { cartsDao } = require("../dao/carts.dao");
const memoryCartsDao = new cartsDao;

const { usersDao } = require("../dao/users.dao");
const memoryUsersDao = new usersDao;

const { productsDao } = require("../dao/products.dao");
const memoryProductsDao = new productsDao;

//IMPORTO CLASE
const { CartManagerDB } = require("../data/classes/DBManager");
const cartManager = new CartManagerDB;


const createCart = async(req,res)=>{
    try{
        const user = await memoryUsersDao.readById(req.session.user.email);
        const cart = await cartManager.create(user);
        console.log(user)
        console.log(cart)
        memoryCartsDao.saveCart(cart);
        res.status(200).send({ message: "Carrito creado", cart });
        } catch (err) {
        res.status(500).send(err.message);
    }
}
const saveProductsInCart = async (req,res)=>{
    try{
        const id = req.params;
        const productsBody = req.body;
        const newProducts = productsBody.myCart;
        const cart = await memoryCartsDao.readOneById(id.cid);
        if(!!cart){
            cartManager.cleanCart(cart);
            for(let i=0;i<newProducts.length;i++){
                const product = await memoryProductsDao.readOneById(newProducts[i].idProduct)
                cartManager.addProductToCart(cart,product,newProducts[i].quantity);
            }

            res.status(200).send("Carrito Actualizado con exito");
        }else{
            res.status(400).send("Carrito No encontrado");
        }
    }catch(err){
        throw err
    }
}
const addProductToCart = async(req,res)=>{
    try{
        const id = req.params;
        if(!!id.cid && id.pid){
            const cart = await memoryCartsDao.readOneById(id.cid);
            const product = await memoryProductsDao.readOneById(id.pid);
            if(!cart || !product){
                res.status(400).send("El Producto no pudo ser Agregado!")
            }else{
                cartManager.addProductToCart(cart,product,1);
                res.status(200).send("Producto Agregado!")
            }
        }
    }catch(err){
        throw err
    }
}
const showCarts = async(req,res)=>{
    try{
        const carts = await memoryCartsDao.read();
        res.status(200).send(carts);
    }catch(err){
        throw err;
    }
}
const updateQuantity = async(req,res)=>{
    try{
        const id = req.params;
        const {quantity} = req.body;
        if(!!id.cid && id.pid){
            const cart = await memoryCartsDao.readOneById(id.cid);
            const product = await memoryProductsDao.readOneById(id.pid);
            if(!cart || !product){
                res.status(400).send("El Producto no pudo ser Actulizado!")
            }else{
                cartManager.updateQuantityProducts(cart,product,quantity);
                res.status(200).send("Producto Agregado!")
            }
        }
    }catch(err){
        throw err
    }
}
const deleteProductInCart = async(req,res)=>{
    try{
        const id = req.params;
        if(!!id.cid && id.pid){
            const cart = await memoryCartsDao.readOneById(id.cid);
            const product = await memoryProductsDao.readOneById(id.pid);
            if(!cart || !product){
                res.status(400).send("El Producto no pudo ser Eliminado!")
            }else{
                cartManager.deleteTotalProduct(cart,product);
                res.status(200).send("Producto Eliminado!")
            }
        }
    }catch(err){
        throw err
    }
}

const showProductsInCart = async(req,res)=>{
    const {cid} = req.params;
    const cart = await memoryCartsDao.readOneById(cid);
    if(!cart){
        res.status(400).send("Id Carrito no Encontrado");
    }else{
        const productCart = [{message:"PRODUCTOS DEL CARRITO"}, ...cart.products];
        res.status(200).send(productCart);
    }
}

//Exportar modulo
module.exports = {
    createCart,
    addProductToCart,
    showCarts,
    saveProductsInCart,
    updateQuantity,
    deleteProductInCart,
    showProductsInCart
};

