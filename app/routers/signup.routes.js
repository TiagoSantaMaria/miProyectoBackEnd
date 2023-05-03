// IMPORTO MODULO EXPRESS
const express = require("express");
const { createUser } = require("../controllers/signup.controllers");


// GENERO EL ROUTER
const singupRouter = express.Router();

singupRouter.post("/",createUser);

module.exports = {
    singupRouter,
};


// const passport = require("passport");
// singupRouter.post("/",passport.authenticate("register",{failureRedirect:"/failregister"}),async (req,res)=>{
//     req.logger.info("NUEVO SIGNUP");
//     res.status(201).json({ message: "success" });
// })
// singupRouter.get("/failregister",async(req,res)=>{
//     res.send({ error: "Failed SignUP" });
// })