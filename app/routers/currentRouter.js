// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const currentRouter = express.Router();

// IMPORTO MIDDLEWARE
const {authProfile} = require("../routers/middlewares")

currentRouter.get("/",authProfile,async(req,res)=>{
    try{
        res.status(200).json(req.session.user);
    }catch(err){
        throw err
    }
})

module.exports = {
    currentRouter,
};
