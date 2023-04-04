// IMPORTO MODULO EXPRESS
const express = require("express");
const passport = require("passport");

// GENERO EL ROUTER
const singupRouter = express.Router();

singupRouter.post("/",passport.authenticate("register",{failureRedirect:"/failregister"}),async (req,res)=>{
    res.status(201).json({ message: "success" });
})

singupRouter.get("/failregister",async(req,res)=>{
    res.send({ error: "Failed SignUP" });
})

// singupRouter.post("/", async (req, res) => {
//     const { first_name, last_name, email, password, age } = req.body;
//     try {
//         if(!first_name || !last_name || !email || !password || !age){
//             res.status(400).send({message: "unsuccess"})
//         }
//         let user ={
//             first_name,
//             last_name,
//             email,
//             password:createHash(password),
//             age,
//         };
//         userModel.create(user);
//         res.status(201).json({ message: "success", data: user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//         }
// });

module.exports = {
    singupRouter,
};

