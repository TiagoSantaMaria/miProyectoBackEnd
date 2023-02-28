// IMPORTO MODULO EXPRESS
const express = require("express");
const { userModel } = require("../data/models/users.model");

// GENERO EL ROUTER
const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await userModel.findOne({
            email: email,
            password: password,
        });
        if (response) {
            res.cookie("email", email, { maxAge: 150000, signed:true });
            res.cookie("password", password, { maxAge: 150000, signed:true });
            req.session.email=email;
            if(req.session.email==='tiago@gmail.com'){
                req.session.admin=true;
            }
            res.status(200).json({ message: "success", data: response });
        } else {
            res.status(404).json({ message: "error", data: "User not found" });
        }
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    });

module.exports = {
    loginRouter,
};
