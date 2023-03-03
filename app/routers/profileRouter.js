// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const profileRouter = express.Router();

profileRouter.delete("/", async(req,res)=>{
    try{
        req.session.destroy();
        res.clearCookie('email');
        res.clearCookie('password');
        res.status(201).json({ message: "success" });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

module.exports = {
    profileRouter,
};
