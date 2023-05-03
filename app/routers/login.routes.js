// IMPORTO MODULO EXPRESS
const express = require("express");

const passport = require("passport");

const { findUserByEmail } = require("../controllers/login.controllers");

// GENERO EL ROUTER
const loginRouter = express.Router();

loginRouter.post("/", findUserByEmail);

//LOGIN CON GITHUB
loginRouter.get('/github', passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{})
loginRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}),async(req,res)=>{
    req.session.user = req.user;
    console.log(req.session.user)
    res.redirect('/products');
})

module.exports = {
    loginRouter,
};





// VALIDACION CON PASSPORT, TENGO PROBLEMAS CON EL CONTROL DE ERRORES, PERO LA VALIDACION ANDA

// //LOGIN CON DATOS
// // loginRouter.post("/", passport.authenticate('login'), async(req,res)=>{
// loginRouter.post("/", passport.authenticate('login',{failureRedirect:'/faillogin'}), async(req,res)=>{
//     if (!req.user){
//         return res.status(400).json({ message: "unsuccess" });
//     }else{
//         req.session.user={
//             first_name: req.user.first_name,
//             last_name: req.user.last_name,
//             age: req.user.age,
//             email: req.user.email,
//             role:req.user.role
//         }
//         req.logger.info("NUEVO LOGIN");
//         res.status(200).json({ message: "success" });
//     }
// })

// loginRouter.get("/faillogin",async(req,res)=>{
//     res.send({error:"Fail Login"})
// })
