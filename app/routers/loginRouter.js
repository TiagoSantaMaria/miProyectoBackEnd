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
