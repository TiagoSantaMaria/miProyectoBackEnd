// IMPORTO MODULO EXPRESS
const express = require("express");
const { userModel } = require("../data/models/users.model");
const { isValidPassword } = require("../utils");


// GENERO EL ROUTER
const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await userModel.findOne({email:email});
        if (response){
            if(!isValidPassword(password, response.password)){
                res.status(403).send({message: "Incorrect password"});
            }else{
                req.session.user=response;
                if(response.email==='tiago@gmail.com'){
                    req.session.user.admin=true;
                }else{
                    req.session.user.admin=false;
                }
                res.status(200).json({ message: "success", data: response });
            }
        }else{
            res.status(404).json({ message: "error", data: "User not found" });
        }
        // const response = await userModel.findOne({
        //     email: email,
        //     password: password,
        // });
        // if (response) {
        //     res.cookie("email", email, { maxAge: 150000, signed:true });
        //     res.cookie("password", password, { maxAge: 150000, signed:true });
        //     //DATOS NO SENSIBLES
        //     req.session.firstName=response.first_name;
        //     req.session.lastName=response.last_name;
        //     req.session.age=response.age;
        //     req.session.email=email;
        //     //ESPECIFICO QUIEN ES EL ADMIN
        //     if(req.session.email==='tiago@gmail.com'){
        //         req.session.admin=true;
        //     }else{
        //         req.session.admin=false;
        //     }
        //     res.status(200).json({ message: "success", data: response });
        // } else {
        //     res.status(404).json({ message: "error", data: "User not found" });
        // }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    loginRouter,
};
