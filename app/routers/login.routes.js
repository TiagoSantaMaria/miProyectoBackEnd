// IMPORTO MODULO EXPRESS
const express = require("express");
const passport = require("passport");

// GENERO EL ROUTER
const loginRouter = express.Router();

//LOGIN CON DATOS
// loginRouter.post("/", passport.authenticate('login'), async(req,res)=>{
loginRouter.post("/", passport.authenticate('login',{failureRedirect:'/faillogin'}), async(req,res)=>{
    if (!req.user){
        return res.status(400).json({ message: "unsuccess" });
    }else{
        req.session.user={
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role:req.user.role
        }
        req.logger.info("NUEVO LOGIN");
        res.status(200).json({ message: "success" });
    }
})

loginRouter.get("/faillogin",async(req,res)=>{
    res.send({error:"Fail Login"})
})

//LOGIN CON GITHUB
loginRouter.get('/github', passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{})
loginRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}),async(req,res)=>{
    req.session.user = req.user;
    console.log(req.session.user)
    res.redirect('/products');
})




// loginRouter.post("/", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const response = await userModel.findOne({email:email});
//         if (response){
//             if(!isValidPassword(password, response.password)){
//                 res.status(403).send({message: "Incorrect password"});
//             }else{
//                 req.session.user=response;
//                 if(response.email==='tiago@gmail.com'){
//                     req.session.user.admin=true;
//                 }else{
//                     req.session.user.admin=false;
//                 }
//                 res.status(200).json({ message: "success", data: response });
//             }
//         }else{
//             res.status(404).json({ message: "error", data: "User not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = {
    loginRouter,
};
