// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const viewsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const { ProductManagerDB } = require("../data/classes/DBManager");
const productManager = new ProductManagerDB;


//ENDPOINTS
viewsRouter.get('/products', async(req,res)=>{
    try {
        const {category = null} = req.query;
        const {page = 1} = req.query;
        const {limit = 10} = req.query;
        const {sort = null} = req.query;
        const response = await productManager.paginate(category,page,limit,sort);
        // console.log(response)
        res.render('home', {response, stylesheet: 'viewProducts'});
    } catch (err) {
        res.status(500).send(err.message);
    }
})



viewsRouter.get('/realtimeproducts', async(req,res)=>{
    const products = await productManager.read();
    res.render('realTimeProducts', {products, stylesheet: 'viewProducts'});
});

//Exportar modulo
module.exports = {
    viewsRouter,
};

