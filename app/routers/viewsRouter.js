// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const viewsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const { ProductManagerDB } = require("../data/classes/DBManager");
const productManager = new ProductManagerDB;

//IMPORTO E INICIO DAO
const { productsDao } = require("../dao/products.dao");
const memoryProductsDao = new productsDao;


// IMPORTO AUTHORIZACIONES
const {auth, authProfile} = require("../routers/middlewares")

//ENDPOINTS
viewsRouter.get('/products',authProfile,async(req,res)=>{
    try {
        const {category = null} = req.query;
        const {page = 1} = req.query;
        const {limit = 10} = req.query;
        const {sort = null} = req.query;
        const response = await memoryProductsDao.paginate(category,page,limit,sort);
        const response2 = (req.session.user);
        res.render('home', {response, response2, stylesheet: 'viewProducts'});
    } catch (err) {
        res.status(500).send(err.message);
    }
})
viewsRouter.get('/login',auth,async(req,res)=>{
    try{
        res.render('login', {stylesheet: 'viewProducts'});
    }catch(err){
        res.status(500).send(err.message);
    }
})
viewsRouter.get('/signup',auth,async(req,res)=>{
    try{
        res.render('signup',{stylesheet: 'viewProducts'});
    }catch(err){
        res.status(500).send(err.message);
    }
})
viewsRouter.get('/realtimeproducts', async(req,res)=>{
    try{
        const products = await productManager.read();
        res.render('realTimeProducts', {products, stylesheet: 'viewProducts'});
    }catch(err){
        res.status(500).send(err.message);
    }
})
viewsRouter.get('/profile',authProfile, async(req,res)=>{
    try{
        const response = (req.session.user);
        res.render('profile', {response, stylesheet: 'viewProducts'});
    }catch(err){
        res.status(500).send(err.message);
    }
})

//Exportar modulo
module.exports = {
    viewsRouter,
};

