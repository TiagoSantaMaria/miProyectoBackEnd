//PATRON REPOSITORY
const { UserRepository } = require("../repository/users.repository");
const { CartsRepository } = require("../repository/carts.repository");
const { ProductsRepository } = require("../repository/products.repository");
const { TicketRepository } = require("../repository/tickets.repository");

//IMPORTO DAO NECESARIOS

const { cartsDao } = require("../dao/mongo/classes/carts.dao");
const memoryCartsDao = new cartsDao;
const cartRepository = new CartsRepository(memoryCartsDao);

const { usersDao } = require("../dao/mongo/classes/users.dao");
const memoryUsersDao = new usersDao;
const userRepository = new UserRepository(memoryUsersDao);

const { productsDao } = require("../dao/mongo/classes/products.dao");
const memoryProductsDao = new productsDao;
const productsRepository = new ProductsRepository(memoryProductsDao);

const { ticketDao } = require("../dao/mongo/classes/tickets.dao");
const memoryTicketDao = new ticketDao;
const ticketRepository = new TicketRepository(memoryTicketDao)

const createCart = async(req,res)=>{
    try{
        const user = await userRepository.getOneById(req.session.user.email);
        const cart = await cartRepository.create(user);
        cartRepository.save(cart);
        res.status(201).send({ message: "Carrito creado", cart });
        } catch (err) {
        res.status(500).send(err.message);
    }
}
const saveProductsInCart = async (req,res)=>{
    try{
        const id = req.params;
        const productsBody = req.body;
        const newProducts = productsBody.myCart;
        const cart = await cartRepository.getOneById(id.cid);
        if(!!cart){
            cartRepository.cleanAllProductsInCart(cart);
            for(let i=0;i<newProducts.length;i++){
                const product = await productsRepository.getOneById(newProducts[i].idProduct);
                cartRepository.addProductToCart(cart,product,newProducts[i].quantity);
            }
            res.status(200).send("Carrito Actualizado con exito");
        }else{
            res.status(404).send("Carrito No encontrado");
        }
    }catch(err){
        res.status(500).send(err.message);
    }
}
const addProductToCart = async(req,res)=>{
    try{
        const id = req.params;
        if(!!id.cid && id.pid){
            //
            const cart = await cartRepository.getOneById(id.cid);
            const product = await productsRepository.getOneById(id.pid);
            if(!cart || !product){
                res.status(400).send("El Producto no pudo ser Agregado!")
            }else{
                //
                cartRepository.addProductToCart(cart,product,1);
                res.status(200).send("Producto Agregado!")
            }
        }
    }catch(err){
        res.status(500).send(err.message);
    }
}
const showCarts = async(req,res)=>{
    try{
        const carts = await cartRepository.getAll();
        res.status(200).send(carts);
    }catch(err){
        res.status(500).send(err.message);
    }
}
const finishPurchase = async(req,res)=>{
    try{
        const user = await userRepository.getOneById(req.session.user.email);
        const totalPurchase = req.body;
        console.log(totalPurchase.totalPrice)
        const ticket = await ticketRepository.create(user.email,totalPurchase.totalPrice);
        req.logger.info("NUEVA COMPRA");
        res.status(201).send({ message: "succesfull", ticket });
    }catch(err){
        res.status(500).send(err.message);
    }
}
//AUN NO IMPLEMENTADA EN UNA VIEW - EN POSTMAN ANDA BIEN
const updateQuantity = async(req,res)=>{
    try{
        const id = req.params;
        const {quantity} = req.body;
        if(!!id.cid && id.pid){
            const cart = await cartRepository.getOneById(id.cid);
            const product = await productsRepository.getOneById(id.pid);
            if(!cart || !product){
                res.status(400).send("El Producto no pudo ser Actulizado!")
            }else{
                cartRepository.updateQuantityProducts(cart,product,quantity);
                res.status(200).send("Producto Agregado!")
            }
        }
    }catch(err){
        res.status(500).send(err.message);
    }
}
//AUN NO IMPLEMENTADA EN UNA VIEW - EN POSTMAN ANDA BIEN
const deleteProductInCart = async(req,res)=>{
    try{
        const id = req.params;
        if(!!id.cid && id.pid){
            const cart = await cartRepository.getOneById(id.cid);
            const product = await productsRepository.getOneById(id.pid);
            if(!cart || !product){
                res.status(400).send("El Producto no pudo ser Eliminado!")
            }else{
                cartRepository.deleteTotalProduct(cart,product);
                res.status(200).send("Producto Eliminado!")
            }
        }
    }catch(err){
        res.status(500).send(err.message);
    }
}
//AUN NO IMPLEMENTADA EN UNA VIEW - EL JSON EN LA URL LO MUESTRA BIEN
const showProductsInCart = async(req,res)=>{
    try{
        const {cid} = req.params;
        const cart = cartRepository.getOneById(cid);
        if(!cart){
            res.status(400).send("CART NOT FOUND");
        }else{
            const productCart = [{message:"PRODUCTOS DEL CARRITO"}, ...cart.products];
            res.status(200).send(productCart);
        }
    }catch(err){
        res.status(500).send(err.message);
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
    showProductsInCart,
    finishPurchase
};

