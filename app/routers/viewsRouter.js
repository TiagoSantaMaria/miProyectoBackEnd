// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const viewsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const { ProductManagerDB } = require("../data/classes/DBManager");
const productManager = new ProductManagerDB;

//FUNCION PARA QUE UNAVEZ LOGUEADO NO PUEDAS DIRIGIRTE AL LOGIN O SIGNUP
function auth(req, res, next) {
    if (!!req.session?.email) {
        return res.status(401).send('Usted ya esta Logeado')
    }
    return next()
}
//FUNCION PARA QUE SI NO ESTAS LOGUEADO NO PUEDAS DIRIGIRTE AL PROFILE
function authProfile(req, res, next) {
    if (req.session?.email) {
        return next()
    }
    return res.status(401).send('Usted debe estar Logeado')
}

//ENDPOINTS
viewsRouter.get('/products',authProfile,async(req,res)=>{
    try {
        const {category = null} = req.query;
        const {page = 1} = req.query;
        const {limit = 10} = req.query;
        const {sort = null} = req.query;
        const response = await productManager.paginate(category,page,limit,sort);
        const response2 = (req.session);
        res.render('home', {response, response2, stylesheet: 'viewProducts'});
    } catch (err) {
        res.status(500).send(err.message);
    }
})
viewsRouter.get('/login',auth,async(req,res)=>{
    try{
        res.render('login');
    }catch(err){
        res.status(500).send(err.message);
    }
})
viewsRouter.get('/signup',auth,async(req,res)=>{
    try{
        res.render('signup');
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
});

viewsRouter.get('/profile',authProfile, async(req,res)=>{
    try{
        const response = (req.session);
        res.render('profile', {response});
    }catch(err){
        res.status(500).send(err.message);
    }
})

//Exportar modulo
module.exports = {
    viewsRouter,
};

