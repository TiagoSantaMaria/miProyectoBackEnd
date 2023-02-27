// IMPORTO MODULO EXPRESS
const express = require("express");
const { userModel } = require("../data/models/users.model");

// GENERO EL ROUTER
const singupRouter = express.Router();

singupRouter.post("/", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    try {
        const user = await userModel.create({
            first_name,
            last_name,
            email,
            password,
            age,
        });
        res.status(201).json({ message: "success", data: user });
         //res.redirect("/login");
    } catch (error) {
        res.status(500).json({ error: error.message });
        }
});

module.exports = {
    singupRouter,
};
