// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const profileRouter = express.Router();

profileRouter.delete("/", async(req,res)=>{
    req.session.destroy();
    res.clearCookie('email');
    res.clearCookie('password');
    res.status(201).json({ message: "success" });
})

module.exports = {
    profileRouter,
};
